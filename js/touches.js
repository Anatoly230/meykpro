import { fillImageData } from './portfolio.js';
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
    // console.log('Движение', isDragging)
}

function touchEnd(e) {
    isDragging = false;
    dragEnd = e.changedTouches[0].clientX
    if (dragStart - dragEnd > 0) {
        e.preventDefault();
        current = current.previousElementSibling ?
            current.previousElementSibling :
            current.parentElement.lastElementChild;
        ref.setCurrent(current)
        fillImageData(current.querySelector('.portfolio__item-pic-contaner'), popUpImg)

    } else if (dragStart - dragEnd < 0) {
        console.log(dragStart - dragEnd)
        current = current.nextElementSibling ?
            current.nextElementSibling :
            current.parentElement.firstElementChild;
        ref.setCurrent(current)
        fillImageData(current.querySelector('.portfolio__item-pic-contaner'), popUpImg)
    }

}

console.log(window.oncontextmenu)



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

console.log(window.oncontextmenu)

export { startSwipe, endSwipe}