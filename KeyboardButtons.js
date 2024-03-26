javascript:(function() {
document.addEventListener('keydown', e => {
    if (event.isComposing ||e.keyCode == 49) {
        document.querySelector('[data-functional-selector="answer-0"]').click();
    }
    if (event.isComposing ||e.keyCode == 50) {
        document.querySelector('[data-functional-selector="answer-1"]').click();
    }
    if (event.isComposing ||e.keyCode == 51) {
        document.querySelector('[data-functional-selector="answer-2"]').click();
    }
    if (event.isComposing ||e.keyCode == 52) {
        document.querySelector('[data-functional-selector="answer-3"]').click();
    }
});
})();
