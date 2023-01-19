import { removeAddIfContains } from './rendering.js';

const price = document.querySelector('.price');
const moreBtns = price.querySelectorAll('.btn--more')
// const buyBtns = price.querySelectorAll('.parametrs__toggle--buy')
const priceImageBtns = price.querySelectorAll('.slide-pic');

function definOPenCloseElement() {
    let price = {
        current: null,
        previos: null,
    }
    return {
        getCurrent: function () {
            return price.current;
        },
        setCurrent: function (element) {
            if(element.dataset.about !== 'current'){
                element.dataset.about = 'current';
                price.previos = price.current;
                price.current = element;
            }else{
                price.current.dataset.about = '';
                element.dataset.about = 'current';
                price.current = element;

            }

        },
        getPrevios: function () {
            return price.previos;
        },
        setPrevios: function (value) {
            price.previos = value;
        },
    }
}

let seniorUnit = definOPenCloseElement();


function isContains(element, containClass) {
    return element.classList.contains(containClass);
}

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
    console.log(foundElement);
    if (foundElement) {
        seniorUnit.setCurrent(getParentElement(element, 'parametrs'));
        console.log(seniorUnit.getCurrent())
        removeAddIfContains(foundElement, currentClass, targetClass)
    }
}

function getToggleClass(element, toggleClass) {
    element.classList.toggle(toggleClass);
}

function moreBuyBtnsToggle(element) {
    let btnIcon = element.querySelector('.btn__icon'),
        btnTexts = element.querySelectorAll('.btn__text'),
        btnBuy = element.parentElement.querySelector('.btn--buy'),
        btnBuyIcon = btnBuy.querySelector('.btn__icon'),
        btnBuyText = btnBuy.querySelector('.btn__text');
    getToggleClass(element, 'btn--js-more');
    getToggleClass(element, 'btn--js-collapse');
    getToggleClass(element, 'btn--js');
    getToggleClass(btnIcon, 'btn__icon--js');
    getToggleClass(btnBuy, 'btn--js-buy');
    getToggleClass(btnBuy, 'btn--js');
    getToggleClass(btnBuyIcon, 'btn__icon--js');
    getToggleClass(btnBuyIcon, 'btn__icon--js-cart');
    getToggleClass(btnBuyText, 'btn__text--js');
    btnTexts.forEach(function (item) {
        getToggleClass(item, 'btn__text--hide');
        getToggleClass(item, 'btn__text--js');
    })
    btnIcon = btnTexts = btnBuy = btnBuyIcon = btnBuyText = null;
}

price.addEventListener('click', function (e) {
    e.preventDefault();
    seniorUnit.setCurrent(getParentElement(e.target, 'parametrs'))
    let classtitle = 'btn--more',
        newElement = getParentElement(e.target, classtitle);
        let rootItem = seniorUnit.getCurrent();
    if (newElement !== null) {

        getToggleClass(seniorUnit.getCurrent(), 'parametrs--js')
        moreBuyBtnsToggle(newElement);

    } else { console.log(`target elemnt not contains the class "${classtitle}"`) }
})




function getImegeSlidBtns() {
    priceImageBtns.forEach(function (item) {
        removeAddIfContains(item, 'slide-pic--hide')
    })
}

function getMoreBts() {
    moreBtns.forEach(function (item) {
        removeAddIfContains(item, 'parametrs__toggle--hide');
        removeAddIfContains(item, 'btn--hide');
    })
}

getMoreBts();

getImegeSlidBtns()



export { price };
