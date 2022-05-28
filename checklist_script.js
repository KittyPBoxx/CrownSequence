function init() {
    let el =  document.getElementById("tabs");
    M.Tabs.init(el, {"swipeable": true, "onShow": e => updateTarget()});

    document.querySelectorAll("input[type=checkbox]").forEach(e => e.onclick = ce => onCheckboxClick(ce.target));
    populateAlchemistData();
    populateSorcererData();
}

function onCheckboxClick(cb) {
    triToggleCheckbox(cb);
    updateTarget();
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
        setTimeout(function(){ countElmnt.innerHTML = newGemCount + "/80"; }, 200);
        setTimeout(function(){ countElmnt.classList.remove("changing");}, 1000);
    }
}

function populateAlchemistData() {
    document.querySelector("#alchemist .flash tr td:nth-child(1)").setAttribute("data-gem" , "F");
    document.querySelector("#alchemist .flash tr td:nth-child(2)").setAttribute("data-gem" , "I");
    document.querySelector("#alchemist .flash tr td:nth-child(3)").setAttribute("data-gem" , "S");
    document.querySelector("#alchemist .flash tr td:nth-child(4)").setAttribute("data-gem" , "L");
    document.querySelector("#alchemist .flash tr td:nth-child(5)").setAttribute("data-gem" , "G");
    document.querySelector("#alchemist .flash tr td:nth-child(6)").setAttribute("data-gem" , "D");
    document.querySelector("#alchemist .flash tr td:nth-child(7)").setAttribute("data-gem" , "V");
    document.querySelector("#alchemist .flash tr td:nth-child(8)").setAttribute("data-gem" , "O");
    document.querySelector("#alchemist .flash tr td:nth-child(9)").setAttribute("data-gem" , "R");
    document.querySelector("#alchemist .flash tr td:nth-child(10)").setAttribute("data-gem", "?");

    document.querySelector("#alchemist .vs tr td:nth-child(1)").setAttribute("data-gem" , "U");
    document.querySelector("#alchemist .vs tr td:nth-child(2)").setAttribute("data-gem" , "W");
    document.querySelector("#alchemist .vs tr td:nth-child(3)").setAttribute("data-gem" , "J");
    document.querySelector("#alchemist .vs tr td:nth-child(4)").setAttribute("data-gem" , "C");
    document.querySelector("#alchemist .vs tr td:nth-child(5)").setAttribute("data-gem" , "E");
    document.querySelector("#alchemist .vs tr td:nth-child(6)").setAttribute("data-gem" , "Z");

    document.querySelector("#alchemist .survival tr td:nth-child(1)").setAttribute("data-gem" , "X");
    document.querySelector("#alchemist .survival tr td:nth-child(2)").setAttribute("data-gem" , "Y");
    document.querySelector("#alchemist .survival tr td:nth-child(3)").setAttribute("data-gem" , "P");
    document.querySelector("#alchemist .survival tr td:nth-child(4)").setAttribute("data-gem" , "B");
    document.querySelector("#alchemist .survival tr td:nth-child(5)").setAttribute("data-gem" , "Q");
    document.querySelector("#alchemist .survival tr td:nth-child(6)").setAttribute("data-gem" , "T");
    document.querySelector("#alchemist .survival tr td:nth-child(7)").setAttribute("data-gem" , "M");
    document.querySelector("#alchemist .survival tr td:nth-child(8)").setAttribute("data-gem" , "N");
    document.querySelector("#alchemist .survival tr td:nth-child(9)").setAttribute("data-gem" , "A");
}
function populateSorcererData() {
    document.querySelector("#sorcerer .flash tr td:nth-child(1)").setAttribute("data-gem" , "U");
    document.querySelector("#sorcerer .flash tr td:nth-child(2)").setAttribute("data-gem" , "Q");
    document.querySelector("#sorcerer .flash tr td:nth-child(3)").setAttribute("data-gem" , "D");
    document.querySelector("#sorcerer .flash tr td:nth-child(4)").setAttribute("data-gem" , "W");
    document.querySelector("#sorcerer .flash tr td:nth-child(5)").setAttribute("data-gem" , "E");
    document.querySelector("#sorcerer .flash tr td:nth-child(6)").setAttribute("data-gem" , "F");
    document.querySelector("#sorcerer .flash tr td:nth-child(7)").setAttribute("data-gem" , "V");
    document.querySelector("#sorcerer .flash tr td:nth-child(8)").setAttribute("data-gem" , "S");
    document.querySelector("#sorcerer .flash tr td:nth-child(9)").setAttribute("data-gem" , "C");
    document.querySelector("#sorcerer .flash tr td:nth-child(10)").setAttribute("data-gem", "M");

    document.querySelector("#sorcerer .vs tr td:nth-child(1)").setAttribute("data-gem" , "T");
    document.querySelector("#sorcerer .vs tr td:nth-child(2)").setAttribute("data-gem" , "Y");
    document.querySelector("#sorcerer .vs tr td:nth-child(3)").setAttribute("data-gem" , "J");
    document.querySelector("#sorcerer .vs tr td:nth-child(4)").setAttribute("data-gem" , "?");
    document.querySelector("#sorcerer .vs tr td:nth-child(5)").setAttribute("data-gem" , "B");
    document.querySelector("#sorcerer .vs tr td:nth-child(6)").setAttribute("data-gem" , "O");

    document.querySelector("#sorcerer .survival tr td:nth-child(1)").setAttribute("data-gem" , "X");
    document.querySelector("#sorcerer .survival tr td:nth-child(2)").setAttribute("data-gem" , "I");
    document.querySelector("#sorcerer .survival tr td:nth-child(3)").setAttribute("data-gem" , "P");
    document.querySelector("#sorcerer .survival tr td:nth-child(4)").setAttribute("data-gem" , "L");
    document.querySelector("#sorcerer .survival tr td:nth-child(5)").setAttribute("data-gem" , "R");
    document.querySelector("#sorcerer .survival tr td:nth-child(6)").setAttribute("data-gem" , "Z");
    document.querySelector("#sorcerer .survival tr td:nth-child(7)").setAttribute("data-gem" , "G");
    document.querySelector("#sorcerer .survival tr td:nth-child(8)").setAttribute("data-gem" , "N");
    document.querySelector("#sorcerer .survival tr td:nth-child(9)").setAttribute("data-gem" , "A");
}