import { switchImage } from './portfolio.js';
import { getParentElement } from "./rendering.js";
// window.oncontextmenu = function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     return false;
// }



function defineCoordinates(e) {
    let parent = getParentElement(e.target, 'pop-up__image-block')
    if (parent) {
        let margin = (window.innerWidth - parent.offsetWidth) / 2;
        if (margin + parent.offsetWidth / 4 > e.touches[0].clientX) {
            return 'left';
        } else if (e.touches[0].clientX > margin + parent.offsetWidth / 4 * 3 && e.touches[0].clientX < margin + parent.offsetWidth) {
            return 'right';
        }
        return 'past';
    }

}


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
   
    let direction = defineCoordinates(e) 
    if(direction !== 'past'){
        switchImage(direction === 'right', popUpImg)
    } 
       
}
function touchMove(e) {
}

// function touchEnd(e) {
//     isDragging = false;
//     dragEnd = e.changedTouches[0].clientX
//     if (dragStart - dragEnd !== 0) {
//         switchImage(dragStart - dragEnd > 0 && dragStart - dragEnd !== 0, popUpImg)
//     }
// }





function startSwipe(referance) {
    ref = referance;
    if (!popUpImg) {
        popUpImg = ref.getPopUp().querySelector('.pop-up__image-block');
    }
    popUpImg.addEventListener('touchstart', touchStart)
    // popUpImg.addEventListener('touchend', touchEnd)
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
    // popUpImg.removeEventListener('touchend', touchEnd)
    resetBase();
}

export { startSwipe, endSwipe }