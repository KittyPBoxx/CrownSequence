let gemData = JSON.parse(sequence).sequence;
let sb;
let sequenceValue;
let currentIndex = 0;

function onNext() {
    currentIndex++;
    redraw();
}

function onPrev() {
    currentIndex--;
    redraw();
}

function onSequenceChange() {
    currentIndex == 0;
    redraw();
}

function redraw() {
    const newSequence = document.getElementById('sequence').value;
    drawGems(newSequence);
    updateScroll();
    let activeElement = document.querySelector("[data-active]");
    sb.scrollTo({x:activeElement ? activeElement.offsetLeft - 6 : 0, y:0})
    sequenceValue = newSequence;
}

function drawGems(sequenceString) {
    document.getElementById("content").innerHTML = '';
    let seq = [...gemData].reverse();
    let offset = getOffset(seq, sequenceString);
    if (offset !== -1) offset += sequenceString.length;
    updateSequenceNumbers(seq.length - offset, offset);
    const gemsToRemove = offset % 3;
    seq.splice(0, gemsToRemove);
    if (offset % 3 !== 0) seq.splice(seq.length - 2, 3 - (offset % 3));
    offset-=gemsToRemove;
    for (i = 0; i < seq.length; i++) appendGem(seq[i], offset - 1 == i);
}

function updateScroll() {
    if (sb == undefined) {
        sb = new ScrollBooster({
            viewport: document.querySelector('body'),
            content: document.getElementById("content"),
            scrollMode: 'transform',
            direction: 'horizontal',
            emulateScroll: false,
        });
    } else {
        sb.updateMetrics();
    }
}

function appendGem(gemColour, active) {
    let gem = document.createElement("div");
    gem.setAttribute('data-colour', gemColour);
    if (active) gem.setAttribute('data-active', true);
    document.getElementById("content").appendChild(gem);
}

function updateSequenceNumbers(sequenceNumber, offset) {
    if (offset === -1) {
        document.getElementById('errorText').removeAttribute('hidden');
        document.getElementById('sequenceNo').value = 'N/A';
        document.getElementById('hexValue').value = 'N/A';
        document.getElementById('menuTime').value = 'N/A';
    } else {
        document.getElementById('errorText').setAttribute('hidden', '');
        document.getElementById('sequenceNo').value = sequenceNumber;
        document.getElementById('hexValue').value = (sequenceNumber%256).toString(16) + ":" + Math.trunc(sequenceNumber/256).toString(16);

        let time = new Date((sequenceNumber - 65) * 15); // ms estimate
        document.getElementById('menuTime').value = time.getMinutes() + ":" + time.getSeconds() + "." + time.getMilliseconds() + " (FIXME PLZ)"; 
    }
}

function getOffset(fullSequence, searchSequence) {
    let fullSequenceString = fullSequence.join('');
    let searchSequenceString = [...searchSequence.toLowerCase()].reverse().join('');
    let totalOccurences = fullSequenceString.split(searchSequenceString).length - 1;
    if (totalOccurences == 0) return -1;
    if (currentIndex === -1) {
        currentIndex = totalOccurences;
    } else if (currentIndex > totalOccurences) {
        currentIndex = 0;
    }
    return nthIndex(fullSequenceString, searchSequenceString, (totalOccurences - currentIndex));
}

function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

function debounce(func, wait, immediate) {
    var timeout;
  
    return function executedFunction() {
      var context = this;
      var args = arguments;
          
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
  
      var callNow = immediate && !timeout;
      
      clearTimeout(timeout);
  
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
};

