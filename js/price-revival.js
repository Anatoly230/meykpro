import { removeAddIfContains } from './rendering.js';

const price = document.querySelector('.price');
const parametrsSet = price.querySelectorAll('.parametrs')
const priceImageBtns = price.querySelectorAll('.slide-pic');


// вся логика открытия и закрытия в объекте возвращающей функции definOPenCloseElement()
function definOPenCloseElement() {
    let price = {
        current: null
    }
    return {
        setCurrent: function (element) {
            if (isDataSetAbout(element, 'current')) {
                element.dataset.about = '';
                price.current = null;
                revialPrice(element);
                element.scrollIntoView({block: "center", inline: "center"});  //прокрутка к нужному объекту
            } else {
                element.dataset.about = 'current';
                revialPrice(element);
                element.scrollIntoView({block: "center", inline: "center"}); //прокрутка к нужному объекту
                if (price.current !== null) {
                    revialPrice(price.current);
                    price.current.dataset.about = '';
                    price.current = element;
                } else {
                    price.current = element;
                }
            }
        }
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

function getToggleClass(element, toggleClass) {
    element.classList.toggle(toggleClass);
}

function isDataSetAbout(element, attr) {
    return element.dataset.about === attr;
}

function revialPrice(element) {
    let headerWrapper = element.querySelector('.parametrs__heading-wrapper'),
        parametrHeader = headerWrapper.querySelector('.parametrs__heading'),
        parametrPrice = headerWrapper.querySelector('.parametrs__price'),
        picWrapper = element.querySelector('.parametrs__pic-wrapper'),
        parametrsWrapper = element.querySelector('.parametrs__wrapper'),
        parametrSet = element.querySelectorAll('.parametr'),
        parametrsBtnWrapper = element.querySelector('.parametrs__toggle-wrapper'),
        btnMore = element.querySelector('.btn--more'),
        btnIcon = btnMore.querySelector('.btn__icon'),
        btnTexts = btnMore.querySelectorAll('.btn__text'),
        btnBuy = btnMore.parentElement.querySelector('.btn--buy'),
        btnBuyIcon = btnBuy.querySelector('.btn__icon'),
        btnBuyText = btnBuy.querySelector('.btn__text');
    getToggleClass(element, 'parametrs--js');
    getToggleClass(headerWrapper, 'parametrs__heading-wrapper--js');
    getToggleClass(parametrHeader, 'parametrs__heading--js');
    getToggleClass(parametrPrice, 'parametrs__price--js');
    getToggleClass(picWrapper, 'parametrs__pic-wrapper--js');
    getToggleClass(parametrsWrapper, 'parametrs__wrapper--js');
    getToggleClass(parametrsBtnWrapper, 'parametrs__toggle-wrapper--js');
    getToggleClass(btnMore, 'parametrs__toggle--js');
    getToggleClass(btnMore, 'btn--js-more');
    getToggleClass(btnMore, 'btn--js-collapse');
    getToggleClass(btnMore, 'btn--js');
    removeAddIfContains(btnMore, 'btn--hide');
    getToggleClass(btnIcon, 'btn__icon--js');
    getToggleClass(btnBuy, 'btn--js-buy');
    getToggleClass(btnBuy, 'btn--js');
    getToggleClass(btnBuyIcon, 'btn__icon--js');
    getToggleClass(btnBuyIcon, 'btn__icon--js-cart');
    getToggleClass(btnBuyText, 'btn__text--js-buy');
    // getToggleClass(btnBuyText, 'btn__text--js');

    parametrSet.forEach(function (item) {
        getToggleClass(item, 'parametr--js-hide');
        if (isDataSetAbout(item, 'show')) {
            getToggleClass(item.querySelector('.parametr__name'), 'parametr__name--js-hide')
            getToggleClass(item, 'parametr--js-show')
        }
    })

    btnTexts.forEach(function (item) {
        getToggleClass(item, 'btn__text--hide');
        getToggleClass(item, 'btn__text--js');
    })

    btnIcon = btnTexts = btnBuy = btnBuyIcon = btnBuyText = null;
}

function isMoreBtn(element) {
    return getParentElement(element, 'btn--more');
}

price.addEventListener('click', function (e) {

    if (isMoreBtn(e.target)) {
        e.preventDefault();
        seniorUnit.setCurrent(getParentElement(e.target, 'parametrs'));
    }
})

function getImegeSlidBtns() {
    priceImageBtns.forEach(function (item) {
        removeAddIfContains(item, 'slide-pic--hide')
    })
}

function launchPrice() {
    parametrsSet.forEach(function (item) {
        revialPrice(item);
    })
}


// getImegeSlidBtns();
launchPrice();

export { price };
