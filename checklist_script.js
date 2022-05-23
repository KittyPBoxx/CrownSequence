function init() {
    let el =  document.getElementById("tabs");
    M.Tabs.init(el, {"swipeable": true, "onShow": e => updateTarget()});

    document.querySelectorAll("input[type=checkbox]").forEach(e => e.onclick = ce => onCheckboxClick(ce.target));
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