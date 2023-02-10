import { getParentElement } from "./rendering.js";

const sliderBlock = document.querySelector('.micflag__slider');
const slider = sliderBlock.querySelector('.slider');
const sliders = sliderBlock.querySelectorAll('.slide');
let sliderCount = slider.children.length;
let counter = 0;

function isCountEqual(count, counter) {
    return count === counter + 1;
}


window.setInterval(function () {
    if (isCountEqual(sliderCount, counter)) {
        slider.style.transform = 'translateX(0%)';
        counter = 0;
    } else {
        counter++;
        slider.style.transitionDuration = '400ms';
        slider.style.transitionProperty = 'transform';
        slider.style.transform = `translateX(-${counter * 100}%)`;
    }

}, 3000)

const buttonsList = document.querySelector('.buttons-list');
const buttonPrevios = buttonsList.children[0],
    buttonNext = buttonsList.children[buttonsList.children.length - 1];



function setPagination() {
    let paginationList = document.createElement('div');
    paginationList.classList.add('buttons-list__wrapper')
    for (let i = 0; i < sliderCount; i++) {
        let paginationItem = document.createElement('button');
        paginationItem.classList.add('buttons-list__item')
        if (i === 0) {
            paginationItem.classList.add('buttons-list__item--current')
        }
        paginationList.appendChild(paginationItem);
    }
    return paginationList;
}

function setCurrentPagination(){
let buttons = document.querySelectorAll('buttons-list__item')
console.log(buttons);
}


buttonPrevios.after(setPagination());
setCurrentPagination()

export { sliderBlock };