let test = 'hi';
let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
// let numArr = [3, 5, 9, 1, 3, 6, 8, 5, 2, 1, 0, 9, 3, 6, 5, 56, 13, 52, 30, 51, 29, 58, 67, 123, 57, 12, 30, 57, 123, 9, 8, 5, 2, 10, 98, 56, 2, 1, 9, 57, 2, 30, 57, 2, 30, 57, 2, 13, 56, 78, 3, 5, 9, 1, 3, 6, 8, 5, 2, 1, 0, 9, 3, 6, 5, 56, 13, 52, 30, 51, 29, 58, 67, 123, 57, 12, 30, 57, 123, 9, 8, 5, 2, 10, 98, 56, 2, 1, 9, 57, 2, 30, 57, 2, 30, 57, 2, 13, 56, 78]

function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function fibonachi(n) {
  if (n === 1 || n === 2) {
    return 1;
  }
  return fibonachi(n - 1) + fibonachi(n - 2);
}


function binarySearchRq(arr, num, start, end) {
  let center = Math.floor((start + end) / 2);
  if (arr[center] === num) {
    return center;
  }
  if (start === end) {
    return -1;
  }
  if (num < arr[center]) {
    return binarySearchRq(arr, num, 0, center - 1);
  } else {
    return binarySearchRq(arr, num, center + 1, end);
  }
}


let fullMailContent = 'Anatoly Kitaev <maximos225@gmail.com>';
let shortMailContent = 'maximos225@gmail.com';
let regTest = /(\w*@{1}\D*\.\w{2,3})/gi;

function withdrawMail(strMail) {
  if (strMail.indexOf('<') > 0) {
    return strMail.split('').slice(strMail.indexOf('<') + 1, strMail.indexOf('>')).join('');
  }
  return strMail;
}

function touchTest(e) {
  e.preventDefault();
  console.log(e);
}

const testSlider = document.querySelector('.slider-two');
// testSlider.addEventListener('touchstart', touchTest);
// testSlider.addEventListener('touchend', touchTest);
// testSlider.addEventListener('touchmove', touchTest);
// console.log(testSlider);

export { test };
