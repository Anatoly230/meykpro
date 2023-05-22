import sendData from "./fetcher.js";
import { getTemporaryNotice, callMessage } from "./alert.js";


const form = document.querySelector('.contacts__form');
const config = {
    classTo: 'input',
    errorClass: 'input--error',
    successClass: 'input--valid',
    errorTextParent: 'input',
    errorTextTag: 'span',
    errorTextClass: 'text-help',
};
const messges = {
    required: "Это поле обязательное",
    email: "Введите корректный адресс",
    number: "Здесь необходимо число",
    integer: "Здесь должно быть целое число",
    url: "введите корректный адресс сайта",
    tel: "Необходимо ввести корректный номер телефона",
    maxlength: "Не меньше ${1} цифр",
    minlength: "Не больше ${1} цифр",
    min: "Minimum value for this field is ${1}",
    max: "Maximum value for this field is ${1}",
    pattern: "необходимо соотвествие формату",
    equals: "The two fields do not match"
}
const pristine = new Pristine(form, config, false),
    some = form.querySelector('#name'),
    phone = form.querySelector('#phone');

Pristine.addMessages('ru', messges);
Pristine.setLocale('ru');





function validateNickname(value) {
    return value.trim().length >= 2 && value.trim().length <= 50;
    // return value.length >= 2 && value.length <= 50 && value.trim().length === value.length;
}

function validateCyrylic(value) {
    let regExp = /^[а-яА-Я]*$/gm;
    if (regExp.test(value)) {
        return true;
    }
    return false;
}

function validatePhoneFormat(value) {
    const regExp = /^\+?[7|7|8]?\(?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/gm;
    if (regExp.test(value)) {
        return true;
    }
    return false;
}

pristine.addValidator(some, validateNickname, 'От 2 до 50 символов', true)
// pristine.addValidator(some, validateCyrylic, 'Имя должно быть написано кирилицей', true)
pristine.addValidator(phone, validatePhoneFormat, 'Например: 8 900 77 77 00', true)


form.addEventListener('submit', function (e) {
    e.preventDefault()
    // const isValid = pristine.validate() && sendData(this);
    const isValid = pristine.validate();

    if (typeof isValid === 'boolean' && isValid) {
        this.elements.submit.disabled = true;

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.reset();
                getTemporaryNotice()
            }, 1000);
            resolve('some')
        })
        promise.then((res) => {
            setTimeout(() => {
                this.elements.submit.disabled = false;
            }, 2000)
        })

        //сообщение об успешной отправки формы
    } else {

        //сообщение об ошибке отправки данных
    }
})


export { form };