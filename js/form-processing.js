

const form = document.querySelector('.contacts__form');
const submitBtn = form.querySelector('.form__submit');

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
    tel: "This field requires a valid telephone number",
    maxlength: "Не меньше ${1} цифр",
    minlength: "Не больше ${1} цифр",
    min: "Minimum value for this field is ${1}",
    max: "Maximum value for this field is ${1}",
    pattern: "необходимо соотвествие формату",
    equals: "The two fields do not match"
}
const pristine = new Pristine(form, config),
    some = form.querySelector('#name');

Pristine.addMessages('ru', messges);
Pristine.setLocale('ru');






function validateNickname(value) {
    return value.length >= 2 && value.length <= 50;
}

function onSubmit(e) {
    let isValid = pristine.validate();
    if (isValid) {
        submitBtn.disbled = true
    } else {
        e.preventDefault()
        submitBtn.disbled = false
    }

}

console.log(form)
console.log(some)

pristine.addValidator(some, validateNickname, 'От 2 до 50 символов')



form.addEventListener('submit', onSubmit)

export { form };