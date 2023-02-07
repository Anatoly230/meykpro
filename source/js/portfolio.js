import { getParentElement } from "./rendering.js";

const portfolio = document.querySelector('.portfolio')

const sliderBlock = document.querySelector('.micflag__slider');
const slider = sliderBlock.querySelector('.slider');

portfolio.addEventListener('click', function (e) {
    let element = getParentElement(e.target, 'portfolio__item'),
        picPath = '';
    if (element) {
        picPath = element.querySelector('.portfolio__item-pic-contaner');
        // console.log(picPath);
    }
})

window.setTimeout(function () {

    slider.style.transitionDuration = '400ms';
    slider.style.transitionProperty = 'transform';
    slider.style.transform = 'translateX(-100vw)';
    // slider.style.left = '-100vw';
    sliderBlock.style.background = 'linear-gradient(to bottom right, #FFFFFF, #D5D8DF)';
    // sliderBlock.style.backgroundColor = '#FF0000';
    console.log(sliderBlock)
}, 1000)


export { portfolio };