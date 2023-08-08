'use strict';

const SLOTS = [ 'Chest', 'Left Arm', 'Left Leg', 'Right Arm', 'Right Leg' ];

let effects = {};
let armors = [];
let desiredEffects = [];
let combinations = [];
let currentCombo = 0;

$(document).ready( function() {

    loadSlots();
    fetchEffects();

    $('#addButton').on('click', addArmorFromSelects);
    $('#armorTable tbody').on('click', '.deleteButton', deleteArmor);
    $('#loadButton').on('click', loadTable);
    $('#saveButton').on('click', saveTable);
    $('.effectTables').on('change', '.desiredInput', function(){changeInputLimits($(this))});
    $('#calculateButton').on('click', calculateCombinations);
    $('#firstButton').on('click', firstCombo);
    $('#nextButton').on('click', nextCombo);
    $('#prevButton').on('click', prevCombo);
    $('#lastButton').on('click', lastCombo);

    // Prevent manual typing in desired effects inputs
    $('input[type="number"]').on('keydown', false);

    // Sort table on header click
    $('th:not(:contains("#"))').on('click', function() {
        const th = $(this);
        const table = th.closest('table');
        const tbody = table.find('tbody');
        const rows = tbody.find('tr');
        Array.from(rows)
            .sort(getRowSorter(th.index(), this.asc = !this.asc))
            .forEach(tr => tbody.append(tr));
    });
});

function loadSlots() {
    for( let i = 0; i < SLOTS.length; i++ ) {
        const slot = SLOTS[i];
        $('#slotSelect').append($('<option/>').attr('value', i).text(slot));
    }
}

function fetchEffects() {
    $.getJSON('./legendary_effects.json', function(data) {
        effects = data
    }).done(loadEffects)
}

function loadEffects() {
    effects.armorEffects.forEach( function(effect, i) {
        const star = effect.star;
        const id = effect.id;
        const text = star > 1 ? effect.description : effect.name;
        $(`#star${star}Select`).append($('<option/>').attr('value', i).text(text));
        if( text !== "N/A" ) {
            let effectRow = `<tr class="desiredEffectRow" id="desiredEffectRowStarId${id}"><td>${text}</td>`;
            effectRow    += `<td><input type="number" class="desiredInput desired${star}StarInput"`;
            effectRow    += ` min="0" max="5" step="1" value="0" data-last-value="0"></td></tr>`;
            $(`#${star}StarEffectTable tbody`).append(effectRow);
        }
    });
}

function addArmor(slot, star1, star2, star3) {
    const star1Id = getEffectId(star1);
    const star2Id = getEffectId(star2);
    const star3Id = getEffectId(star3);
    const armor = { "slot": slot, "star1": star1, "star1Id": star1Id, "star2": star2, "star2Id": star2Id, "star3": star3, "star3Id": star3Id };
    armors.push(armor);
    return armor;
}

function getEffectByString(effectString) {
    return effects.armorEffects.find( ({ name, description }) => name === effectString || description === effectString);
}

function getEffectId(effectString) {
    const effect = getEffectByString(effectString);
    return effect.id;
}

function getEffectStringById(effectId) {
    const effect = effects.armorEffects.find( ({ id }) => id === effectId );
    return effect.star === 1 ? effect.name : effect.description;
}

function addArmorFromSelects() {
    const slot = $('#slotSelect option:selected').text();
    const star1 = $('#star1Select option:selected').text();
    const star2 = $('#star2Select option:selected').text();
    const star3 = $('#star3Select option:selected').text();
    const armor = addArmor(slot, star1, star2, star3);
    addArmorToTable(armor);
}

function addArmorToTable(armor) {
    armor.star1 = getEffectStringById(armor.star1Id);
    armor.star2 = getEffectStringById(armor.star2Id);
    armor.star3 = getEffectStringById(armor.star3Id);
    const newRow = createArmorRowHTML(armor, true);
    $('#armorTable tbody').append(newRow);
    showDesiredEffects( [ armor.star1Id, armor.star2Id, armor.star3Id ] );
}

function createArmorRowHTML(armor, includeDelete = false) {
    const armorIndex = armors.indexOf(armor);
    let row = `<tr class="armorRow" data-armor-index="${armorIndex}">`;
    row += `<td>${armor.slot}</td><td>${armor.star1}</td><td>${armor.star2}</td><td>${armor.star3}</td>`;
    row += includeDelete ? '<td class="borderlessCell"><button class="deleteButton">-</button></td></tr>' : '</tr>';
    return row;
}

function buildArmorTable() {
    $('#armorTable tbody tr').remove();
    armors.forEach(addArmorToTable);
}

function deleteArmor() {
    const row = $(this).closest('tr');
    const index = row.data('armorIndex');
    const armor = armors[index];
    armors.splice(index, 1);
    for( const r of row.siblings() ) {
        if( r.dataset['armorIndex'] > index ) {
            r.dataset['armorIndex']--;
        }
    }
    row.remove();
    hideDesiredEffects( [ armor.star1Id, armor.star2Id, armor.star3Id ] );
}

function showDesiredEffects(starIds) {
    for( const starId of starIds) {
        $(`#desiredEffectRowStarId${starId}`).css('visibility', 'visible');
    }
}

function hideDesiredEffects(starIds) {
    for(const starId of starIds ) {
        if( !armors.some( a => a.star1Id === starId || a.star2Id === starId || a.star3Id === starId) ) {
            const desiredEffectRow = $(`#desiredEffectRowStarId${starId}`);
            desiredEffectRow.css('visibility', 'collapse');
            const removedInput = desiredEffectRow.find('td input');
            removedInput.val(0);
            changeInputLimits(removedInput);
        }
    }
}

function changeInputLimits(changedInput) {
    let change = changedInput.val() - changedInput.data('lastValue');
    let effectString = changedInput.closest('td').prev('td').text();
    let effect = getEffectByString(effectString);
    let changedInputStar = `desired${effect.star}StarInput`;
    $(`.${changedInputStar}`).each( function() {
        if( !$(this).is(changedInput) ) {
            const max = $(this).prop('max');
            $(this).prop('max', max - change);
        }
    })
    changedInput.data('lastValue', changedInput.val());
    for(; change !== 0; change < 0 ? change++ : change--) {
        change > 0 ? desiredEffects.push(effect.id) : desiredEffects.splice(desiredEffects.lastIndexOf(effect.id), 1);
    }
}

function findMatchingArmorSets() {
    const result = [];

    function hasAllDesiredEffects(set) {
        const armorEffectIds = [];
        set.forEach((armor) => {
            armorEffectIds.push(armor.star1Id);
            armorEffectIds.push(armor.star2Id);
            armorEffectIds.push(armor.star3Id);
        })
        for(const effectId of desiredEffects) {
            const armorEffectIdIndex = armorEffectIds.indexOf(effectId);
            if( armorEffectIdIndex < 0 ) {
                return false;
            }
            armorEffectIds.splice(armorEffectIdIndex, 1);
        }
        return true;
    }

    function hasDesiredEffects(armor) {
        const armorEffectIds = [ armor.star1Id, armor.star2Id, armor.star3Id ];
        for(const effectId of desiredEffects) {
            if( armorEffectIds.indexOf(effectId) >= 0 ) {
                return true;
            }
        }
        return false;
    }

    function generateArmorSets(startIdx, slots, currentSet) {
        if( hasAllDesiredEffects(currentSet) ) {
            result.push(currentSet.slice());
            return;
        }
        for(let i = startIdx; i < armors.length; i++) {
            const armor = armors[i];
            const slot = armor.slot;
            if (!slots.has(slot)) {
                if( hasDesiredEffects(armor) ) {
                    slots.add(slot);
                    currentSet.push(armor);
                    generateArmorSets(i + 1, slots, currentSet);
                    currentSet.pop();
                    slots.delete(slot);
                }
            }
        }
    }

    generateArmorSets(0, new Set(), []);

    for (let i = 0; i < result.length; i++) {
        const set = result[i];
        for (let j = 0; j < set.length; j++) {
            const subset = Array.from(set);
            subset.splice(j, 1);
            if( hasAllDesiredEffects(subset) ) {
                if( isObjectInArray(result, subset)) {
                    result.splice(i--, 1);
                    break;
                }
            }
        }
    }
    return result;
}

function isObjectInArray(array, obj) {
    for(let i = 0; i < array.length; i++) {
        if(JSON.stringify(array[i], Object.keys(array[i]).sort()) === JSON.stringify(obj, Object.keys(obj).sort())) return true;
    }
    return false;
}

function getCellValue(tr, i) {
    const cell = tr.children[i];
    return cell.innerText === 'N/A' ? '' : cell.innerText;
}

function getRowSorter(i, asc) {
    return (a, b) => getCellValue(asc ? a : b, i).localeCompare(getCellValue(asc ? b : a, i));
}

function calculateCombinations() {
    combinations = findMatchingArmorSets();
    currentCombo = 0;
    updateCombinationTable();
}

function firstCombo() {
    currentCombo = 0;
    updateCombinationTable();
}

function nextCombo() {
    if( currentCombo + 1 < combinations.length ) {
        currentCombo++;
        updateCombinationTable();
    }
}

function prevCombo() {
    if( currentCombo - 1 >= 0 ) { 
        currentCombo--;
        updateCombinationTable();
    }
}

function lastCombo() {
    currentCombo = combinations.length - 1;
    updateCombinationTable();
}

function updateCombinationTable() {
    $('#combinationTable tbody tr').remove();
    let currentComboLabelText = '0 / 0';
    if( combinations.length > 0 && combinations[0].length > 0 ) {
        currentComboLabelText = `${currentCombo + 1} / ${combinations.length}`;
        const combo = combinations[currentCombo];
        for( const armor of combo ) {
            const comboRow = createArmorRowHTML(armor);
            $('#combinationTable tbody').append(comboRow);
        }
    }
    $('#currentComboLabel').text(currentComboLabelText);
}

function loadTable() {
    const div = document.createElement('div');
    div.innerHTML = '<input type="file">';
    const fileInput = div.firstChild;
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            const json = JSON.parse(reader.result);
            armors = json.armors;
            buildArmorTable();
        };
        reader.readAsText(file);
    });
    fileInput.click();
}

function saveTable() {
    const json = JSON.stringify({ "armors": armors })
    const bytes = new TextEncoder().encode(json);
    const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
    const anchor = document.createElement('a');
    anchor.download = 'armory.json';
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
    anchor.click();
}