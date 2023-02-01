/* stylelint-disable */

import { isEscape } from './utils.js';

const header = document.querySelector('.header');
const toggleMenu = header.querySelector('.toggle-menu');
const buttonsBlock = header.querySelector('.header__buttons-wrapper');
const menu = header.querySelector('.menu');



function testMenu() {
  if (toggleMenu.classList.contains('toggle-menu--hide')) {
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

toggleMenu.addEventListener('click', openMenu)
testMenu();


export { toggleMenu }