import { getParentElement } from "./rendering.js";
import { isEscape } from "./utils.js";

const body = document.querySelector('.page-body');
const portfolioBlock = document.querySelector('.micflag__portfolio'); //добавить класс с блоком портфолио

function getCurrentPortItem() {
    let current = null,
        target = null,
        popup = null
    return {
        setCurrent: function (crnt) {
            current = crnt;
        },
        getCurrent: function () {
            return current;
        },
        setTarget: function (trgt) {
            target = trgt;
        },
        getTarget: function () {
            return target;
        },
        setPopUp: function (pup) {
            popup = pup;
        },
        getPopUp: function () {
            return popup;
        },
        reset: function () {
            popup = null;
            target = null;
            current = null;
        }
    }
}

const portCurrnet = getCurrentPortItem();


function createPopUp() {
    const fullImageTemplate = portfolioBlock.querySelector('#portfolo-popUp').content;
    const fullImage = fullImageTemplate.cloneNode(true);
    body.appendChild(fullImage)
}

function closePopUp() {
    window.removeEventListener('keydown', escapeClose);
    window.removeEventListener('keydown', onKeyNav);
    portCurrnet.getPopUp().removeEventListener('click', onNavBtn);
    portCurrnet.getPopUp().remove();
    portCurrnet.getPopUp().removeEventListener('click', onClickingOnVoid);
    portCurrnet.getPopUp().removeEventListener('click', onClikcCloseBtn);
    portCurrnet.reset();
    portfolioBlock.addEventListener('click', onClickPortfolio);
}

function escapeClose(e) {
    if (isEscape(e)) {
        closePopUp();
    }
}

function isPopUp(e) {
    return e.target.classList.contains('pop-up');
}

function isCloseBtn(e) {
    return e.target.classList.contains('pop-up__close-btn');
}

function onClickingOnVoid(e) {
    if (isPopUp(e)) {
        closePopUp();
    }
}

function onClikcCloseBtn(e) {
    if (isCloseBtn(e)) {
        closePopUp();
    }
}

function fillImageData(source, target) {
    const srcImg = Array.from(source.children),
        trgImg = Array.from(target.children);
    srcImg.forEach(function (item, i) {
        if (item.tagName === 'IMG') {
            trgImg[i].src = pathDetected(item.src);
            trgImg[i].srcset = pathDetected(item.srcset);
            trgImg[i].alt = item.alt;
            trgImg[i].dataset.type = item.dataset.type;
            trgImg[i].width = '1042';
            trgImg[i].height = '744';
        } else {
            trgImg[i].srcset = pathDetected(item.srcset);
        }
    })
}

function onNavBtn(e) {
    let currentItem = portCurrnet.getCurrent(),
        target = portCurrnet.getTarget();
    if (e.target.classList.contains('pop-up__image-navigation')) {
        if (e.target.classList.contains('pop-up__image-navigation--next')) {
            currentItem = currentItem.nextElementSibling ? currentItem.nextElementSibling : currentItem.parentElement.firstElementChild;
            portCurrnet.setCurrent(currentItem)
        } else {
            currentItem = currentItem.previousElementSibling ? currentItem.previousElementSibling : currentItem.parentElement.lastElementChild;
            portCurrnet.setCurrent(currentItem)
        }
        fillImageData(currentItem.querySelector('.portfolio__item-pic-contaner'), target)
    }
}




function setNavBtns() {
    if (portCurrnet.getPopUp()) {
        portCurrnet.getPopUp().addEventListener('click', onNavBtn);
    }
}

function setPortKeyDown() {
    if (portCurrnet.getPopUp()) {
        window.addEventListener('keydown', onKeyNav)
    }
}

function onKeyNav(e) {
    let currentItem = portCurrnet.getCurrent(),
        target = portCurrnet.getTarget();
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        e.preventDefault()
    }
    if (e.code === 'ArrowRight') {
        e.preventDefault();
        currentItem = currentItem.nextElementSibling ? currentItem.nextElementSibling : currentItem.parentElement.firstElementChild;
        portCurrnet.setCurrent(currentItem)
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        currentItem = currentItem.previousElementSibling ? currentItem.previousElementSibling : currentItem.parentElement.lastElementChild;
        portCurrnet.setCurrent(currentItem)
    }
    fillImageData(currentItem.querySelector('.portfolio__item-pic-contaner'), target)
}



function onClickPortfolio(e) {
    const parentElement = getParentElement(e.target, 'portfolio__item');
    if (parentElement) {
        createPopUp();
        portCurrnet.setPopUp(document.querySelector('.pop-up'));
        portCurrnet.setCurrent(parentElement);
        let sourcePicture = parentElement.querySelector('.portfolio__item-pic-contaner'),
            portfolioPicture = portCurrnet.getPopUp().querySelector('.pop-up__image-block');
        portCurrnet.setTarget(portfolioPicture);
        if (sourcePicture && portfolioPicture) {
            fillImageData(sourcePicture, portfolioPicture);
            window.addEventListener('keydown', escapeClose);
            portCurrnet.getPopUp().addEventListener('click', onClickingOnVoid);
            portCurrnet.getPopUp().addEventListener('click', onClikcCloseBtn);
            setNavBtns();
            setPortKeyDown();
        }
    }
    portfolioBlock.removeEventListener('click', onClickPortfolio);
}


portfolioBlock.addEventListener('click', onClickPortfolio)

function pathDetected(str) {
    if (str.split(',').length > 1) {
        return str.split(',').reduce(function (accum, item) {
            return accum += `, ${getFullPath(item)}`;
        }, '')
    }
    return getFullPath(str)
}


function getStringStart(str) {
    return str.split('').slice(0, str.lastIndexOf('/') + 1).join('')
}

function getFullPath(surcePath) {
    return getStringStart(surcePath) + getFileName(surcePath) + '-full' + getStringEnd(surcePath);
}

function switchChar(str) {
    if (str.lastIndexOf('@') === -1) {
        return '.'
    }
    return '@';
}

function getStringEnd(str) {
    let end = switchChar(str);
    return str.split('').slice(str.lastIndexOf(end), str.length).join('')
}

function getFileName(str) {
    let end = switchChar(str);
    return str.split('').slice(str.lastIndexOf('/') + 1, str.lastIndexOf(end)).join('');
}

export { portfolioBlock };
