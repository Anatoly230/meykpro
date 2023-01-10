import {removeIfContains} from './rendering.js';

const price = document.querySelector('.price');
const moreBtns = price.querySelectorAll('.parametrs__toggle--more')
const buyBtns = price.querySelectorAll('.parametrs__toggle--buy')
const priceImageBtns = price.querySelectorAll('.slide-pic');
const imageBlocks = price.querySelectorAll('.parametrs__pic-wrapper');
const parametrsBlocks = price.querySelectorAll('.parametrs__wrapper');
const moreBuyBlocks = price.querySelectorAll('.parametrs__toggle-wrapper');

function getImegeSlidBtns() {
    priceImageBtns.forEach(function (item) {
        removeIfContains(item, 'slide-pic--hide')
    })
}

function getMoreBts(){
    moreBtns.forEach(function (item) {
        removeIfContains(item, 'parametrs__toggle--hide')
    })
}

getMoreBts();


getImegeSlidBtns()

console.log(imageBlocks, parametrsBlocks, moreBuyBlocks)

export { price };
