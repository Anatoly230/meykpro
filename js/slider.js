import { defineIndex } from "./utils.js";
import { getParentElement } from "./rendering.js";

let sliderBlock = null,
    slider = null,
    sliderCount = 0,
    buttonsList = null,
    buttonPrevios = null,
    buttonNext = null,
    slideButtons = null,
    paginationBlock = null,
    pagination,
    durationTime = 18000;

function isCountEqual(count, counter) {
    return count === counter + 1;
}

function getCustomSlide(index) {
    slider.style.transform = `translateX(-${(index - 1) * 100}%)`;
    pagination.counter = index - 1;
    pagination.assignCurrent(index);
}

function getNextSlide() {
    if (isCountEqual(sliderCount, pagination.counter)) {
        slider.style.transform = 'translateX(0%)';
        pagination.counter = 0;

    } else {

        pagination.counter++;
        slider.style.transform = `translateX(-${pagination.counter * 100}%)`;
    }
    pagination.assignCurrent(pagination.counter + 1)

}

function getPreviosSlide() {
    if (pagination.counter === 0) {
        slider.style.transform = `translateX(-${(sliderCount - 1) * 100}%)`;
        pagination.counter = sliderCount - 1;
    } else {
        pagination.counter--;
        slider.style.transform = `translateX(-${pagination.counter * 100}%)`;
    }
    pagination.assignCurrent(pagination.counter + 1)
}

function getSlideButtons() {
    slideButtons.forEach(function (item) {
        item.classList.toggle('buttons-list__slide--hide');
    })
}

function getStartSlider() {
    try {
        sliderBlock = document.querySelector('.micflag__slider');
        if (!sliderBlock) {
            throw new Error('слайдер отсутствует')
        }
        if (sliderBlock) {
            slider = sliderBlock.querySelector('.slider');
            sliderCount = slider.children.length;
            if (sliderCount >= 2) {
                buttonsList = document.querySelector('.buttons-list');
                buttonPrevios = buttonsList.children[0];
                buttonNext = buttonsList.children[buttonsList.children.length - 1];
                slideButtons = document.querySelectorAll('.buttons-list__slide');
                paginationBlock = setPagination();
                buttonPrevios.after(paginationBlock);
                pagination = setCurrentPagination();
                pagination.defineCurrent();
                getSlideButtons();
                window.setInterval(getNextSlide, durationTime);
                buttonPrevios.addEventListener('click', getPreviosSlide);
                buttonNext.addEventListener('click', getNextSlide);
                paginationBlock.addEventListener('click', onCustomSlide);
            }
        }
    } catch (error) {
        // console.log(error);
    }

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
            current.classList.toggle('buttons-list__item--current');
            this.setCurrent(index);
            current.classList.toggle('buttons-list__item--current');
        },
        counter: 0,
    }
}

function onCustomSlide(e) {
    if (!e.target.classList.contains('buttons-list__item--current') && e.target.classList.contains('buttons-list__item')) {
        let index = defineIndex(e.target);
        getCustomSlide(index);
    }
}


getStartSlider()


export { sliderBlock };