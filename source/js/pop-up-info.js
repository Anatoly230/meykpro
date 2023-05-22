import { isEscape } from "./utils.js";

const requestBtn = document.querySelector('.header__callback-btn')
const body = document.querySelector('body')

let popUpBody = null,
    popUpCloseBtn = null;

function onEscapeKeyDown(e) {
    if (isEscape(e)) {
        closePopUpInfo()
    }
}

function onClickingOnVoid(e) {
    if (isPopUpBg(e)) {
        closePopUpInfo()
    }
}

function isPopUpBg(e) {
    return e.target.classList.contains('pop-up-background');
}

function createPopUpInfo() {
    const popUpTemplate = document.querySelector('#pop-up-info').content;
    const popUpInfo = popUpTemplate.cloneNode(true);
    body.appendChild(popUpInfo)
}

function closePopUpInfo() {
    popUpCloseBtn.removeEventListener('click', closePopUpInfo)
    popUpBody.removeEventListener('click', onClickingOnVoid)
    window.removeEventListener('keydown', onEscapeKeyDown)
    popUpBody.remove()
}

function onClickRequestBtn(e) {
    createPopUpInfo()
    popUpBody = body.querySelector('.pop-up-background')
    popUpCloseBtn = popUpBody.querySelector('.popUp-info__close')
    popUpCloseBtn.addEventListener('click', closePopUpInfo)
    popUpBody.addEventListener('click', onClickingOnVoid)
    window.addEventListener('keydown', onEscapeKeyDown)
}

requestBtn.addEventListener('click', onClickRequestBtn)

export { requestBtn };