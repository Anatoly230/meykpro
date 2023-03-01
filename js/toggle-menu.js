/* stylelint-disable */

import { isEscape } from './utils.js';

let body = null,
  header = null,
  toggleMenu = null,
  buttonsBlock = null,
  menu = null;

function headerZIndexUp() {
  body = document.querySelector('.page-body')
  header.style.zIndex = body.childElementCount + 1;
}

function revailMenu() {
  if (toggleMenu.classList.contains('toggle-menu--hide') && toggleMenu !== null) {
    toggleMenu.classList.remove('toggle-menu--hide')
    buttonsBlock.style.justifyContent = 'space-between';
    menu.classList.add('menu--hide');
  }
}

function closeMenu(e) {
  if (isEscape(e)) {
    getToggle()
    window.removeEventListener('keydown', closeMenu);
  }
}
function getToggle() {
  menu.classList.toggle('menu--hide');
  menu.classList.toggle('menu--show');
  toggleMenu.classList.toggle('toggle-menu--close');
}


function openMenu(e) {
  e.preventDefault();
  if (e.target.classList.contains('toggle-menu')) {
    getToggle()
    window.addEventListener('keydown', closeMenu)
  }
}

function isHaveHeader() {
  header = document.querySelector('.header');
  if (header) {
    toggleMenu = header.querySelector('.toggle-menu');
    buttonsBlock = header.querySelector('.header__buttons-wrapper');
    menu = header.querySelector('.menu');
    toggleMenu.addEventListener('click', openMenu)
    revailMenu();
    headerZIndexUp();
  }
}

isHaveHeader();
export { toggleMenu }