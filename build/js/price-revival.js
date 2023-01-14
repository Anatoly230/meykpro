import { removeAddIfContains } from './rendering.js';

const price = document.querySelector('.price');
const moreBtns = price.querySelectorAll('.parametrs__toggle--more')
const buyBtns = price.querySelectorAll('.parametrs__toggle--buy')
const priceImageBtns = price.querySelectorAll('.slide-pic');
const imageBlocks = price.querySelectorAll('.parametrs__pic-wrapper');
const parametrsBlocks = price.querySelectorAll('.parametrs__wrapper');
const moreBuyBlocks = price.querySelectorAll('.parametrs__toggle-wrapper');

price.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('parametrs__toggle--more')){
        removeAddIfContains(e.target, 'btn--more', 'toggle-btn-js--collapse')
console.log(e.target.classList)
console.log('Заменить класс на collapse')
    }
// console.log(e.target.classList)

})

function getImegeSlidBtns() {
    priceImageBtns.forEach(function (item) {
        removeAddIfContains(item, 'slide-pic--hide')
    })
}

function getMoreBts() {
    moreBtns.forEach(function (item) {
        removeAddIfContains(item, 'parametrs__toggle--hide');
        removeAddIfContains(item, 'btn--collapse', 'btn--more');
    })
}

getMoreBts();


getImegeSlidBtns()

console.log(imageBlocks, parametrsBlocks, moreBuyBlocks)

export { price };
