export const config = {
    classTo: 'input',
    errorClass: 'input--error',
    successClass: 'input--valid',
    errorTextParent: 'input',
    errorTextTag: 'span',
    errorTextClass: 'text-help',
};
const messages = {
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

Pristine.addMessages('ru', messages);
Pristine.setLocale('ru');

export function validateNickname(value) {
    return value.trim().length >= 2 && value.trim().length <= 50;
    // return value.length >= 2 && value.length <= 50 && value.trim().length === value.length;
}

export function validateCyrylic(value) {
    let regExp = /^[а-яА-Я]*$/gm;
    if (regExp.test(value)) {
        return true;
    }
    return false;
}

export function validatePhoneFormat(value) {
    const regExp = /^\+?[7|7|8]?\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/gm;
    if (regExp.test(value)) {
        return true;
    }
    return false;
}
