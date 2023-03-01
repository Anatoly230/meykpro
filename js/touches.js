import { switchToPrevios, switchToNext, fillImageData, switchImage } from './portfolio.js';
// window.oncontextmenu = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     return false;
// }

let isDragging = false,
    dragStart = 0,
    dragEnd = 0,
    popUpImg = null,
    ref = null,
    current = null;


function touchStart(e) {
    isDragging = true;
    dragStart = e.touches[0].clientX;
    current = ref.getCurrent();
}
function touchMove(e) {
}

function touchEnd(e) {
    // console.log('touchEnd')
    isDragging = false;
    dragEnd = e.changedTouches[0].clientX
    if (dragStart - dragEnd !== 0) {
        switchImage(dragStart - dragEnd > 0 && dragStart - dragEnd !== 0, popUpImg)
    }

    // if (dragStart - dragEnd > 0) {
    //     e.preventDefault();
    //     switchToNext()

    // } else if (dragStart - dragEnd < 0) {
    //     e.preventDefault()
    //     switchToPrevios()
    // }

}




function startSwipe(referance) {
    ref = referance;
    if (!popUpImg) {
        popUpImg = ref.getPopUp().querySelector('.pop-up__image-block');
    }
    popUpImg.addEventListener('touchstart', touchStart)
    popUpImg.addEventListener('touchend', touchEnd)
}

function resetBase() {
    isDragging = false,
        dragStart = 0,
        dragEnd = 0,
        popUpImg = null,
        ref = null,
        current = null;
}

function endSwipe() {
    popUpImg.removeEventListener('touchstart', touchStart)
    popUpImg.removeEventListener('touchend', touchEnd)
    resetBase();
}

export { startSwipe, endSwipe }