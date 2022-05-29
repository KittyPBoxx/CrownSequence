let targets = [];
let actions = new Map();

function init() {
    let el =  document.getElementById("tabs");
    M.Tabs.init(el, {"swipeable": true, "onShow": e => updateTarget()});

    document.querySelectorAll("input[type=checkbox]").forEach(e => e.onclick = ce => onCheckboxClick(ce.target));
    populateAlchemistData();
    populateSorcererData();
    updateTarget();

    disintegrate.init();
    disintegrate.init();
}

function onCheckboxClick(cb) {
    triToggleCheckbox(cb);
    updateTarget();
    updateTargetText();
}

function triToggleCheckbox(cb) {
    cb.readOnly ? cb.checked=cb.readOnly=false : (!cb.checked) ? cb.readOnly=cb.indeterminate=true : false;
}

function updateTarget() {
    let activeCharacter = document.querySelector(".carousel-item.active").id;
    let newGemCount = document.querySelectorAll("#" + activeCharacter + " " + "input[type=checkbox]:checked").length;
    let countElmnt = document.getElementById("count");

    let currentGemCount = countElmnt.getAttribute("data-gemCount");
    if (currentGemCount != newGemCount) {
        countElmnt.setAttribute("data-gemCount", newGemCount);
        countElmnt.classList.remove("changing");
        countElmnt.classList.add("changing")
        setTimeout(function(){ countElmnt.innerHTML = newGemCount + "/80"; }, 400);
        setTimeout(function(){ countElmnt.classList.remove("changing");}, 1200);
    }
}

function setInputData(elmnt, index, character, gemName, gemRequirement) {

    let targetMarker = document.createElement("p");
    targetMarker.classList.add("arrow-box");
    elmnt.parentElement.parentElement.parentElement.prepend(targetMarker);

    elmnt.setAttribute("data-gem-name", gemName);
    elmnt.setAttribute("data-gem-req", gemRequirement);
    elmnt.id = character + gemName + index;
    elmnt.addEventListener('contextmenu', e => toggleTargetAndRefresh(e));
}

function toggleTargetAndRefresh(e) {
    e.preventDefault();
    let elmntId = e.target.id
    let index = targets.indexOf(elmntId);
    if (index === -1) {
        targets.push(elmntId);
    } else {
        targets.splice(index, 1);
        document.getElementById(elmntId).parentElement.parentElement.parentElement.querySelector(".arrow-box").removeAttribute("data-priority");
    }
    targets.forEach((id, index) => document.getElementById(id).parentElement.parentElement.parentElement.querySelector(".arrow-box").setAttribute("data-priority", index+1));
    updateTargetText();
}

let lastId;
function updateTargetText() {
    let target = Array.prototype.slice.call(document.querySelectorAll("[data-priority]"),0)
                                      .sort((a,b) => parseInt(a.getAttribute("data-priority")) > parseInt(b.getAttribute("data-priority")) ? 1 : -1)
                                      .map(el => el.parentElement.querySelector("input[type='checkbox']"))
                                      .filter(e => !e.checked && !e.readOnly)[0];

    let targetTextTitle = document.querySelector(".target-text-title");
    let targetTextDesc = document.querySelector(".target-text-desc");

    
    
    if (target) {
        let infoHolder = target.parentElement.querySelector("[data-gem-name");

        if (lastId !== infoHolder.id) {
            disintegrate.createSimultaneousParticles(disintegrate.getDisObj(document.querySelector(".target-text")));
            lastId = infoHolder.id;
        }

        targetTextTitle.innerHTML = "Next: " + infoHolder.getAttribute("data-gem-name");
        targetTextDesc.innerHTML = infoHolder.getAttribute("data-gem-req");
    } else {
        if (lastId) {
            disintegrate.createSimultaneousParticles(disintegrate.getDisObj(document.querySelector(".target-text")));
            lastId = null;
        }
        targetTextTitle.innerHTML = "Next: -";
        targetTextDesc.innerHTML = "";
    }
}

/*

Map stores and id and the state (checked / missed / empty)
It goes through the map and updates all the checkbox states to match the map

*/


function populateAlchemistData() {

    /* FLASH */
    document.querySelector("#alchemist .flash tr td:nth-child(1)" ).setAttribute("data-gem", "F");
    document.querySelector("#alchemist .flash tr td:nth-child(2)" ).setAttribute("data-gem", "I");
    document.querySelector("#alchemist .flash tr td:nth-child(3)" ).setAttribute("data-gem", "S");
    document.querySelector("#alchemist .flash tr td:nth-child(4)" ).setAttribute("data-gem", "L");
    document.querySelector("#alchemist .flash tr td:nth-child(5)" ).setAttribute("data-gem", "G");
    document.querySelector("#alchemist .flash tr td:nth-child(6)" ).setAttribute("data-gem", "D");
    document.querySelector("#alchemist .flash tr td:nth-child(7)" ).setAttribute("data-gem", "V");
    document.querySelector("#alchemist .flash tr td:nth-child(8)" ).setAttribute("data-gem", "O");
    document.querySelector("#alchemist .flash tr td:nth-child(9)" ).setAttribute("data-gem", "R");
    document.querySelector("#alchemist .flash tr td:nth-child(10)").setAttribute("data-gem", "?");

    document.querySelectorAll("#alchemist .flash tr td:nth-child(1) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "FREEZE"   , "Flash Columns - Stage 5" ,));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(2) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "INVISIBLE", "Flash Columns - Stage 10",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(3) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "SPEED"    , "Flash Columns - Stage 15",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(4) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "LAZER"    , "Flash Columns - Stage 20",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(5) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "GRAY"     , "Flash Columns - Stage 25",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(6) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "DELETE"   , "Flash Columns - Stage 30",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(7) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "VACUUME"  , "Flash Columns - Stage 35",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(8) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "ONE MORE" , "Flash Columns - Stage 40",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(9) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "a", "REVERSE"  , "Flash Columns - Stage 45",));
    document.querySelectorAll("#alchemist .flash tr td:nth-child(10) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "???"      , "Flash Columns - Stage 50",));

    /* VS */
    document.querySelector("#alchemist .vs tr td:nth-child(1)").setAttribute("data-gem", "U");
    document.querySelector("#alchemist .vs tr td:nth-child(2)").setAttribute("data-gem", "W");
    document.querySelector("#alchemist .vs tr td:nth-child(3)").setAttribute("data-gem", "J");
    document.querySelector("#alchemist .vs tr td:nth-child(4)").setAttribute("data-gem", "C");
    document.querySelector("#alchemist .vs tr td:nth-child(5)").setAttribute("data-gem", "E");
    document.querySelector("#alchemist .vs tr td:nth-child(6)").setAttribute("data-gem", "Z");

    document.querySelectorAll("#alchemist .vs tr td:nth-child(1) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "UP"      , "VS Mode - Defeat Robo"                ));
    document.querySelectorAll("#alchemist .vs tr td:nth-child(2) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "WALL"    , "VS Mode - Defeat Baron"               ));
    document.querySelectorAll("#alchemist .vs tr td:nth-child(3) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "JINX"    , "VS Mode - Defeat Jinx"                ));
    document.querySelectorAll("#alchemist .vs tr td:nth-child(4) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "COPY"    , "VS Mode - Defeat Pinch"               ));
    document.querySelectorAll("#alchemist .vs tr td:nth-child(5) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "EXCHANGE", "VS Mode - Defeat Pinch (after losing)"));
    document.querySelectorAll("#alchemist .vs tr td:nth-child(6) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "ZZZ"     , "Link Battle - 5 Wins"                 ));

    /* SURVIVAL */
    document.querySelector("#alchemist .survival tr td:nth-child(1)").setAttribute("data-gem", "X");
    document.querySelector("#alchemist .survival tr td:nth-child(2)").setAttribute("data-gem", "Y");
    document.querySelector("#alchemist .survival tr td:nth-child(3)").setAttribute("data-gem", "P");
    document.querySelector("#alchemist .survival tr td:nth-child(4)").setAttribute("data-gem", "B");
    document.querySelector("#alchemist .survival tr td:nth-child(5)").setAttribute("data-gem", "Q");
    document.querySelector("#alchemist .survival tr td:nth-child(6)").setAttribute("data-gem", "T");
    document.querySelector("#alchemist .survival tr td:nth-child(7)").setAttribute("data-gem", "M");
    document.querySelector("#alchemist .survival tr td:nth-child(8)").setAttribute("data-gem", "N");
    document.querySelector("#alchemist .survival tr td:nth-child(9)").setAttribute("data-gem", "A");

    document.querySelectorAll("#alchemist .survival tr td:nth-child(1) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "X2"      , "Survival - Clear field"        ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(2) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "YELLOW"  , "Survival - 5+ Chain Burst"     ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(3) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "PARALYZE", "Survival - Pause for 3 minuets"));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(4) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "BARRIER" , "Survival - Rank C+"            ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(5) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "QUAKE"   , "Survival - Rank B"             ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(6) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "TRIPLE"  , "Survival - Rank A-"            ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(7) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "METEOR"  , "Survival - Rank A+"            ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(8) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "NOVA"    , "Survival - Master"             ));
    document.querySelectorAll("#alchemist .survival tr td:nth-child(9) span").forEach((elmnt, index) => setInputData(elmnt, index, "a", "ACE"     , "Survival - Master (>80 Gems)"  ));

    /* STARTING GEMS */
    document.getElementById("aFREEZE0").parentElement.querySelector("input").checked = true;
    document.getElementById("aFREEZE1").parentElement.querySelector("input").checked = true;
    document.getElementById("aFREEZE2").parentElement.querySelector("input").checked = true;

    document.getElementById("aWALL0").parentElement.querySelector("input").checked = true;
    document.getElementById("aWALL1").parentElement.querySelector("input").checked = true;
    document.getElementById("aWALL2").parentElement.querySelector("input").checked = true;
}

function populateSorcererData() {

    /* FLASH */
    document.querySelector("#sorcerer .flash tr td:nth-child(1)" ).setAttribute("data-gem", "U");
    document.querySelector("#sorcerer .flash tr td:nth-child(2)" ).setAttribute("data-gem", "Q");
    document.querySelector("#sorcerer .flash tr td:nth-child(3)" ).setAttribute("data-gem", "D");
    document.querySelector("#sorcerer .flash tr td:nth-child(4)" ).setAttribute("data-gem", "W");
    document.querySelector("#sorcerer .flash tr td:nth-child(5)" ).setAttribute("data-gem", "E");
    document.querySelector("#sorcerer .flash tr td:nth-child(6)" ).setAttribute("data-gem", "F");
    document.querySelector("#sorcerer .flash tr td:nth-child(7)" ).setAttribute("data-gem", "V");
    document.querySelector("#sorcerer .flash tr td:nth-child(8)" ).setAttribute("data-gem", "S");
    document.querySelector("#sorcerer .flash tr td:nth-child(9)" ).setAttribute("data-gem", "C");
    document.querySelector("#sorcerer .flash tr td:nth-child(10)").setAttribute("data-gem", "M");

    document.querySelectorAll("#sorcerer .flash tr td:nth-child(1) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "UP"      , "Flash Columns - Stage 5" ));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(2) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "QUAKE"   , "Flash Columns - Stage 10"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(3) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "DELETE"  , "Flash Columns - Stage 15"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(4) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "WALL"    , "Flash Columns - Stage 20"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(5) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "EXCHANGE", "Flash Columns - Stage 25"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(6) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "FREEZE"  , "Flash Columns - Stage 30"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(7) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "VACUUME" , "Flash Columns - Stage 35"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(8) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "SPEED"   , "Flash Columns - Stage 40"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(9) span" ).forEach((elmnt, index) => setInputData(elmnt, index, "s", "COPY"    , "Flash Columns - Stage 45"));
    document.querySelectorAll("#sorcerer .flash tr td:nth-child(10) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "METEOR"  , "Flash Columns - Stage 50"));

    /* VS */
    document.querySelector("#sorcerer .vs tr td:nth-child(1)").setAttribute("data-gem", "T");
    document.querySelector("#sorcerer .vs tr td:nth-child(2)").setAttribute("data-gem", "Y");
    document.querySelector("#sorcerer .vs tr td:nth-child(3)").setAttribute("data-gem", "J");
    document.querySelector("#sorcerer .vs tr td:nth-child(4)").setAttribute("data-gem", "?");
    document.querySelector("#sorcerer .vs tr td:nth-child(5)").setAttribute("data-gem", "B");
    document.querySelector("#sorcerer .vs tr td:nth-child(6)").setAttribute("data-gem", "O");

    document.querySelectorAll("#sorcerer .vs tr td:nth-child(1) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "TRIPLE"  , "VS Mode - Defeat Robo"                ));
    document.querySelectorAll("#sorcerer .vs tr td:nth-child(2) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "YELLOW"  , "VS Mode - Defeat Baron"               ));
    document.querySelectorAll("#sorcerer .vs tr td:nth-child(3) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "JINX"    , "VS Mode - Defeat Jinx"                ));
    document.querySelectorAll("#sorcerer .vs tr td:nth-child(4) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "???"     , "VS Mode - Defeat Pinch"               ));
    document.querySelectorAll("#sorcerer .vs tr td:nth-child(5) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "BARRIER" , "VS Mode - Defeat Pinch (after losing)"));
    document.querySelectorAll("#sorcerer .vs tr td:nth-child(6) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "ONE MORE", "Link Battle - 5 Wins"                 ));

    /* SURVIVAL */
    document.querySelector("#sorcerer .survival tr td:nth-child(1)").setAttribute("data-gem", "X");
    document.querySelector("#sorcerer .survival tr td:nth-child(2)").setAttribute("data-gem", "I");
    document.querySelector("#sorcerer .survival tr td:nth-child(3)").setAttribute("data-gem", "P");
    document.querySelector("#sorcerer .survival tr td:nth-child(4)").setAttribute("data-gem", "L");
    document.querySelector("#sorcerer .survival tr td:nth-child(5)").setAttribute("data-gem", "R");
    document.querySelector("#sorcerer .survival tr td:nth-child(6)").setAttribute("data-gem", "Z");
    document.querySelector("#sorcerer .survival tr td:nth-child(7)").setAttribute("data-gem", "G");
    document.querySelector("#sorcerer .survival tr td:nth-child(8)").setAttribute("data-gem", "N");
    document.querySelector("#sorcerer .survival tr td:nth-child(9)").setAttribute("data-gem", "A");

    document.querySelectorAll("#sorcerer .survival tr td:nth-child(1) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "X2"       , "Survival - Clear field"        ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(2) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "INVISIBLE", "Survival - 5+ Chain Burst"     ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(3) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "PARALYZE" , "Survival - Pause for 3 minuets"));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(4) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "LAZER"    , "Survival - Rank C+"            ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(5) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "REVERSE"  , "Survival - Rank B"             ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(6) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "ZZZ"      , "Survival - Rank A-"            ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(7) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "GRAY"     , "Survival - Rank A+"            ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(8) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "NOVA"     , "Survival - Master"             ));
    document.querySelectorAll("#sorcerer .survival tr td:nth-child(9) span").forEach((elmnt, index) => setInputData(elmnt, index, "s", "ACE"      , "Survival - Master (>80 Gems)"  ));

    /* STARTING GEMS */
    document.getElementById("sSPEED0").parentElement.querySelector("input").checked = true;
    document.getElementById("sSPEED1").parentElement.querySelector("input").checked = true;
    document.getElementById("sSPEED2").parentElement.querySelector("input").checked = true;

    document.getElementById("sUP0").parentElement.querySelector("input").checked = true;
    document.getElementById("sUP1").parentElement.querySelector("input").checked = true;
    document.getElementById("sUP2").parentElement.querySelector("input").checked = true;
}