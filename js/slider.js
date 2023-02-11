import { getParentElement } from "./rendering.js";

const sliderBlock = document.querySelector('.micflag__slider');
const slider = sliderBlock.querySelector('.slider');
const sliders = sliderBlock.querySelectorAll('.slide');
let sliderCount = slider.children.length;
let counter = 0;
const buttonsList = document.querySelector('.buttons-list');
const buttonPrevios = buttonsList.children[0],
    buttonNext = buttonsList.children[buttonsList.children.length - 1];
let slideButtons = document.querySelectorAll('.buttons-list__slide'),
    pagination;


function isCountEqual(count, counter) {
    return count === counter + 1;
}

function getNextSlide() {
    if (isCountEqual(sliderCount, counter)) {
        slider.style.transform = 'translateX(0%)';
        counter = 0;
    } else {
        counter++;
        slider.style.transform = `translateX(-${counter * 100}%)`;
    }
    pagination.assignCurrent(counter + 1)
}

function getPreviosSlide() {
    if (counter === 0) {
        slider.style.transform = `translateX(-${(sliderCount - 1) * 100}%)`;
        counter = sliderCount - 1;
    } else {
        counter--;
        slider.style.transform = `translateX(-${counter * 100}%)`;
    }
}

function getSlideButtons() {
    slideButtons.forEach(function (item) {
        item.classList.toggle('buttons-list__slide--hide');
    })
}


if (sliderCount >= 2) {
    buttonPrevios.after(setPagination());
    pagination = setCurrentPagination();
    pagination.defineCurrent();
    getSlideButtons();
    window.setInterval(getNextSlide, 3000);
}






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

function setCurrentPagination() {
    const buttons = Array.from(document.querySelector('.buttons-list__wrapper')
        .querySelectorAll('.buttons-list__item'));
    let current = null;

    return {
        defineCurrent: function () {
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].classList.contains('buttons-list__item--current')) {
                    current = buttons[i];
                    break;
                }
            }
        },
        getCurrent: function () {
            return current;
        },
        setCurrent: function (index) {
            current = buttons[index - 1];
        },
        assignCurrent: function (index) {
            console.log(current.classList);
            current.classList.toggle('buttons-list__item--current');
            this.setCurrent(index);
            current.classList.toggle('buttons-list__item--current');
        },
    }
}

buttonPrevios.addEventListener('click', getPreviosSlide);
buttonNext.addEventListener('click', getNextSlide);

// let test = setCurrentPagination();

// console.log(test);
// console.log(test.defineCurrent());
// console.log(test.getCurrent());
// console.log(test.assignCurrent(4));
// console.log(test.getCurrent());


export { sliderBlock };