import { getParentElement } from "./rendering.js";
import { isEscape } from "./utils.js";
import { pathDetected } from "./img-path-gaenerate.js";
import { startSwipe, endSwipe } from "./touches.js";

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

const portCurrent = getCurrentPortItem();


function createPopUp() {
    const fullImageTemplate = portfolioBlock.querySelector('#portfolo-popUp').content;
    const fullImage = fullImageTemplate.cloneNode(true);
    body.appendChild(fullImage)
}

function closePopUp() {
    window.removeEventListener('keydown', escapeClose);
    window.removeEventListener('keydown', onKeyNav);
    portCurrent.getPopUp().removeEventListener('click', onNavBtn);
    portCurrent.getPopUp().remove();
    portCurrent.getPopUp().removeEventListener('click', onClickingOnVoid);
    portCurrent.getPopUp().removeEventListener('click', onClikcCloseBtn);
    endSwipe();
    portCurrent.reset();
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

function switchToNext() {
    portCurrent.setCurrent(portCurrent.getCurrent().nextElementSibling ?
        portCurrent.getCurrent().nextElementSibling :
        portCurrent.getCurrent().parentElement.firstElementChild);
    console.log(portCurrent)
    return portCurrent.getCurrent();
}
function switchToPrevios() {
    portCurrent.setCurrent(portCurrent.getCurrent().previousElementSibling ?
        portCurrent.getCurrent().previousSibling :
        portCurrent.getCurrent().parentElement.lastElementChild);
    return portCurrent.getCurrent();
}

function clickConditions(e) {
    return e.target.classList.contains('pop-up__image-navigation--next');
}

function touchConditions() {

}

function switchImage(callback, target) {
    let current = null;
    if (callback) {
        current = switchToNext()
    } else {
        current = switchToPrevios()
    }
    fillImageData(current.querySelector('.portfolio__item-pic-contaner'), target)
}

function onNavBtn(e) {
    if (e.target.classList.contains('pop-up__image-navigation')) {
        switchImage(clickConditions(e), portCurrent.getTarget())
    }
}




function setNavBtns() {
    if (portCurrent.getPopUp()) {
        portCurrent.getPopUp().addEventListener('click', onNavBtn);
    }
}

function setPortKeyDown() {
    if (portCurrent.getPopUp()) {
        window.addEventListener('keydown', onKeyNav)
    }
}

function onKeyNav(e) {
    let currentItem = portCurrent.getCurrent(),
        target = portCurrent.getTarget();
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
        e.preventDefault()
    }
    if (e.code === 'ArrowRight') {
        e.preventDefault();
        currentItem = currentItem.nextElementSibling ? currentItem.nextElementSibling : currentItem.parentElement.firstElementChild;
        portCurrent.setCurrent(currentItem)
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        currentItem = currentItem.previousElementSibling ? currentItem.previousElementSibling : currentItem.parentElement.lastElementChild;
        portCurrent.setCurrent(currentItem)
    }
    fillImageData(currentItem.querySelector('.portfolio__item-pic-contaner'), target)
}


function onClickPortfolio(e) {
    const parentElement = getParentElement(e.target, 'portfolio__item');
    if (parentElement) {
        createPopUp();
        portCurrent.setPopUp(document.querySelector('.pop-up'));
        portCurrent.setCurrent(parentElement);
        let sourcePicture = parentElement.querySelector('.portfolio__item-pic-contaner'),
            portfolioPicture = portCurrent.getPopUp().querySelector('.pop-up__image-block'),
            popUp = portCurrent.getPopUp();
        portCurrent.setTarget(portfolioPicture);
        if (sourcePicture && portfolioPicture) {
            fillImageData(sourcePicture, portfolioPicture);
            window.addEventListener('keydown', escapeClose);
            popUp.addEventListener('click', onClickingOnVoid);
            popUp.addEventListener('click', onClikcCloseBtn);
            startSwipe(portCurrent)
            setNavBtns();
            setPortKeyDown();
        }
    }
    portfolioBlock.removeEventListener('click', onClickPortfolio);
}

function startPrtfolio() {
    if (portfolioBlock) {
        portfolioBlock.addEventListener('click', onClickPortfolio);
    }
}

startPrtfolio();
export { portfolioBlock, switchToPrevios, switchToNext, fillImageData, switchImage };
