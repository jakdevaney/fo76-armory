'use strict';

const SLOTS = [ 'Chest', 'Left Arm', 'Left Leg', 'Right Arm', 'Right Leg' ];
const EFFECTS = {
"version" : "0.1",
"armorEffects": [
    {
        "id": 1,
        "star": 1,
        "name": "Aristocrat's",
        "description": "Grants up to +20 Energy Resistance and Damage Resistance, the higher your caps"
    },
    {
        "id": 2,
        "star": 1,
        "name": "Assassin's",
        "description": "-15% damage from Humans"
    },
    {
        "id": 3,
        "star": 1,
        "name": "Auto Stim",
        "description": "Automatically use a Stimpak when hit while health is 25% or less, once every 60 seconds"
    },
    {
        "id": 4,
        "star": 1,
        "name": "Bolstering",
        "description": "Grants up to 35 Damage and Energy Resistance, the lower your health"
    },
    {
        "id": 5,
        "star": 1,
        "name": "Chameleon",
        "description": "Blend with the environment while sneaking and not moving"
    },
    {
        "id": 6,
        "star": 1,
        "name": "Cloaking",
        "description": "Being hit in melee generates a Stealth Field once per 30 seconds"
    },
    {
        "id": 7,
        "star": 1,
        "name": "Exterminator's",
        "description": "-15% damage from Mirelurks and bugs"
    },
    {
        "id": 8,
        "star": 1,
        "name": "Ghoul Slayer's",
        "description": "-15% damage from ghouls"
    },
    {
        "id": 9,
        "star": 1,
        "name": "Hunter's",
        "description": "-15% damage from animals"
    },
    {
        "id": 10,
        "star": 1,
        "name": "Life Saving",
        "description": "While incapacitated, gain 50% chance to revive yourself with a Stimpak, once every 60 seconds"
    },
    {
        "id": 11,
        "star": 1,
        "name": "Mutant Slayer's",
        "description": "-15% damage from Super Mutants"
    },
    {
        "id": 12,
        "star": 1,
        "name": "Mutant's",
        "description": "+10 Damage and Energy Resist if you are mutated"
    },
    {
        "id": 13,
        "star": 1,
        "name": "Nocturnal",
        "description": "+40 Damage and Energy Resistance increase at night"
    },
    {
        "id": 14,
        "star": 1,
        "name": "Overeater's",
        "description": "Increases Damage Reduction up to 6% as you fill your hunger and thirst meters"
    },
    {
        "id": 15,
        "star": 1,
        "name": "Regenerating",
        "description": "+0.05% health recovery while not in combat"
    },
    {
        "id": 16,
        "star": 1,
        "name": "Troubleshooter's",
        "description": "-15% damage from robots"
    },
    {
        "id": 17,
        "star": 1,
        "name": "Unyielding",
        "description": "Gain +3 to all stats (except END) when low on health"
    },
    {
        "id": 18,
        "star": 1,
        "name": "Vanguard's",
        "description": "Grants up to 35 Damage and Energy Resistance, the higher your health"
    },
    {
        "id": 19,
        "star": 1,
        "name": "Weightless",
        "description": "Weighs 90% less and does not count as armor for the Chameleon mutation"
    },
    {
        "id": 20,
        "star": 1,
        "name": "Zealot's",
        "description": "-15% damage from scorched"
    },
    {
        "id": 21,
        "star": 2,
        "name": "1 Star Legendary",
        "description": "N/A"
    },
    {
        "id": 22,
        "star": 2,
        "name": "Agility",
        "description": "+1 Agility"
    },
    {
        "id": 23,
        "star": 2,
        "name": "Charisma",
        "description": "+1 Charisma"
    },
    {
        "id": 24,
        "star": 2,
        "name": "Endurance",
        "description": "+1 Endurance"
    },
    {
        "id": 25,
        "star": 2,
        "name": "Intelligence",
        "description": "+1 Intelligence"
    },
    {
        "id": 26,
        "star": 2,
        "name": "Luck",
        "description": "+1 Luck"
    },
    {
        "id": 27,
        "star": 2,
        "name": "Perception",
        "description": "+1 Perception"
    },
    {
        "id": 28,
        "star": 2,
        "name": "Strength",
        "description": "+1 Strength"
    },
    {
        "id": 29,
        "star": 2,
        "name": "Warming",
        "description": "+25 Cryo Resistance"
    },
    {
        "id": 30,
        "star": 2,
        "name": "Fireproof",
        "description": "+25 Fire Resistance"
    },
    {
        "id": 31,
        "star": 2,
        "name": "Poisoner's",
        "description": "+25 Poison Resistance"
    },
    {
        "id": 32,
        "star": 2,
        "name": "HazMat",
        "description": "+25 Radiation Resistance"
    },
    {
        "id": 33,
        "star": 2,
        "name": "Antiseptic",
        "description": "+25% reduced disease chance from Environmental Hazards"
    },
    {
        "id": 34,
        "star": 2,
        "name": "Powered",
        "description": "+5% Action Point refresh speed"
    },
    {
        "id": 35,
        "star": 2,
        "name": "Glutton",
        "description": "Hunger and Thirst grow 10% slower"
    },
    {
        "id": 36,
        "star": 2,
        "name": "Hardy",
        "description": "Receive 7% less explosion damage"
    },
    {
        "id": 37,
        "star": 3,
        "name": "2 Star Legendary",
        "description": "N/A"
    },
    {
        "id": 38,
        "star": 3,
        "name": "Dissipating",
        "description": "+0.25% radiation damage recovery"
    },
    {
        "id": 39,
        "star": 3,
        "name": "Electrified",
        "description": "5% chance to deal 100 Energy Damage over 4 seconds to melee attackers"
    },
    {
        "id": 40,
        "star": 3,
        "name": "Burning",
        "description": "5% chance to deal 100 Fire Damage over 4 seconds to melee attackers"
    },
    {
        "id": 41,
        "star": 3,
        "name": "Frozen",
        "description": "5% chance to deal 100 Cryo Damage over 4 seconds to melee attackers"
    },
    {
        "id": 42,
        "star": 3,
        "name": "Toxic",
        "description": "5% chance to deal 100 Poison Damage over 4 seconds to melee attackers"
    },
    {
        "id": 43,
        "star": 3,
        "name": "Blocking",
        "description": "-15% damage taken while blocking"
    },
    {
        "id": 44,
        "star": 3,
        "name": "Sentinel's",
        "description": "75% chance to reduce damage by 15% while not moving"
    },
    {
        "id": 45,
        "star": 3,
        "name": "Cavalier's",
        "description": "75% chance to reduce damage by 15% while sprinting"
    },
    {
        "id": 46,
        "star": 3,
        "name": "Reduced Ammo Weight",
        "description": "Ammo weight reduced by 20%"
    },
    {
        "id": 47,
        "star": 3,
        "name": "Improved sneaking",
        "description": "+25% less noise while sneaking +25% reduce detection chance"
    },
    {
        "id": 48,
        "star": 3,
        "name": "Durable",
        "description": "Breaks 50% slower"
    },
    {
        "id": 49,
        "star": 3,
        "name": "Acrobat's",
        "description": "-50% Fall Damage"
    },
    {
        "id": 50,
        "star": 3,
        "name": "Reduced food/drink/chem weight",
        "description": "Food, drink and chem weights reduced by 20%"
    },
    {
        "id": 51,
        "star": 3,
        "name": "Diver's",
        "description": "Grants the ability to breathe underwater"
    },
    {
        "id": 52,
        "star": 3,
        "name": "Safecracker's",
        "description": "Increases size of sweet-spot while picking locks by 2"
    },
    {
        "id": 53,
        "star": 3,
        "name": "Reduced junk weight",
        "description": "Junk item weights reduced by 20%"
    },
    {
        "id": 54,
        "star": 3,
        "name": "Reduced limb damage",
        "description": "Receive 15% less limb damage"
    },
    {
        "id": 55,
        "star": 3,
        "name": "Doctor's",
        "description": "+5% effecticeness from Stimpaks, RadAway, and Rad-X"
    },
    {
        "id": 56,
        "star": 3,
        "name": "Reduced weapon weight",
        "description": "Weapon weights reduced by 20%"
    }
]
};

let armors = [];
let desiredEffects = [];
let combinations = [];
let currentCombo = 0;

$(document).ready( function() {

    loadSlots();
    loadEffects();

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

function loadEffects() {
    $.getJSON('legendary_effects.json', function(effects) {
        EFFECTS = effects;
    });
    EFFECTS.armorEffects.forEach( function(effect, i) {
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
    return EFFECTS.armorEffects.find( ({ name, description }) => name === effectString || description === effectString);
}

function getEffectId(effectString) {
    const effect = getEffectByString(effectString);
    return effect.id;
}

function getEffectStringById(effectId) {
    const effect = EFFECTS.armorEffects.find( ({ id }) => id === effectId );
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