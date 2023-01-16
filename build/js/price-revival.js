import { removeAddIfContains } from './rendering.js';

const price = document.querySelector('.price');
const moreBtns = price.querySelectorAll('.parametrs__toggle--more')
// const buyBtns = price.querySelectorAll('.parametrs__toggle--buy')
const priceImageBtns = price.querySelectorAll('.slide-pic');
let openedPrice = null;

function definOPenCloseElement() {
    let price = {
        current: null,
        previos: null,
    }
    return {
        getCurrent: function () {
            return price.current;
        },
        setCurrent: function (value) {
            price.current = value;
        },
        getPrevios: function () {
            return price.previos;
        },
        setPrevios: function (value) {
            price.previos = value;
        },
    }
}

let test = definOPenCloseElement();

function isContains(element, containClass) {
    return element.classList.contains(containClass);
}

// function ifContainsOrNo(element, classOne, classTwo) {
//     if (isContains(element, classOne)) {
//         element.classList.add(classOne);
//     } else { 
//         element.classList.add(classTwo);
//     }
// }

function getParentElement(element, parentClass) {
    while (!element.classList.contains(parentClass)) {
        element = element.parentElement;
        if (element === null) {
            return null;
        }
    }
    return element;
}

function toggleElemenClass(element, parentClass, classOne, classTwo) {
    let targetElemnt = getParentElement(element, parentClass),
        contansClass, addingClass;
    if (icContains(targetElemnt, classOne)) {
        contansClass = classOne;
        addingClass = classTwo;
    } else if (icContains(targetElemnt, classTwo)) {
        contansClass = classtwo;
        addingClass = classOne;
    }
    targetElemnt.classList.remove(contansClass);
    targetElemnt.classList.add(addingClass);
}

function setOtherClass(element, currentClass, targetClass) {
    let foundElement = getParentElement(element, currentClass);
    if (foundElement) {
        test.setCurrent(getParentElement(element, 'parametrs'));
        console.log(test.getCurrent())
        removeAddIfContains(foundElement, currentClass, targetClass)
    }
}

price.addEventListener('click', function (e) {
    e.preventDefault();
    let element = getParentElement(e.target, 'parametrs__toggle--more')
    console.log(element)
    if (isContains(element, 'btn--collapse')) {
        element.classList.remove('btn--collapse');
        element.classList.add('btn--more');
    } else {
        element.classList.remove('btn--more');
        element.classList.add('btn--collapse');
    }
    // setOtherClass(e.target, 'btn--more', 'toggle-btn-js--collapse');

})

function getImegeSlidBtns() {
    priceImageBtns.forEach(function (item) {
        removeAddIfContains(item, 'slide-pic--hide')
    })
}

function getMoreBts() {
    moreBtns.forEach(function (item) {
        removeAddIfContains(item, 'parametrs__toggle--hide');
        removeAddIfContains(item, 'btn--collapse');
    })
}

getMoreBts();


// getImegeSlidBtns()

// console.log(imageBlocks, parametrsBlocks, moreBuyBlocks)

export { price };
