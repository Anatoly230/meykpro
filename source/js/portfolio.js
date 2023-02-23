import { getParentElement } from "./rendering.js";
import { isEscape } from "./utils.js";

const body = document.querySelector('.page-body')

function getImegepaths(parentElement) {
    if (parentElement) {
        let paths = {},
            img = parentElement.querySelector('.portfolio__pic')
        paths.src = img.src;
        paths.srcset = img.srcset;
        img = null;
        return paths;
    }
}

const portfolioBlock = document.querySelector('.micflag__portfolio'); //добавить класс с блоком портфолио

function createPopUp() {
    const fullImageTemplate = portfolioBlock.querySelector('#portfolo-popUp').content;
    const fullImage = fullImageTemplate.cloneNode(true);
    body.appendChild(fullImage)
    return body.querySelector('.pop-up').querySelector('.pop-up__image');
}


function escapeClose(e) {
    if (isEscape(e)) {
        document.querySelector('.pop-up').remove();
        window.removeEventListener('keydown', escapeClose);
    }
}

portfolioBlock.addEventListener('click', function (e) {
    const parentElement = getParentElement(e.target, 'portfolio__item'),
        imagePaths = getImegepaths(parentElement),
        fullImage = createPopUp();
    fullImage.src = getFullPath(imagePaths.src);
    fullImage.srcset = getFullPath(imagePaths.srcset);
    window.addEventListener('keydown', escapeClose)
    getParentElement(fullImage, 'pop-up').addEventListener('click', function (e) {
        if (e.target.classList.contains('pop-up')) {
            e.target.remove();
        }
    })

})


function getStringStart(str) {
    return str.split('').slice(0, str.lastIndexOf('/') + 1).join('')
}

function getFullPath(surcePath) {
    console.log(getStringStart(surcePath) + getFileName(surcePath) + '-full' + getStringEnd(surcePath))
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
    console.log(end);
    return str.split('').slice(str.lastIndexOf(end), str.length).join('')
}

function getFileName(str) {
    let end = switchChar(str);
    console.log(str.split('').slice(str.lastIndexOf('/') + 1, str.lastIndexOf(end)).join(''));
    return str.split('').slice(str.lastIndexOf('/') + 1, str.lastIndexOf(end)).join('');
}




export { portfolioBlock };
