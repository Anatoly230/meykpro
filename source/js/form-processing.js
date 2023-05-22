import sendData from "./fetcher.js";
import { getTemporaryNotice } from "./alert.js";
import { config, validateNickname, validatePhoneFormat} from "./pristine-configs.js";

const form = document.querySelector('.contacts__form');

const regularOrder = new Pristine(form, config, false),
    name = form.querySelector('#name'),
    phone = form.querySelector('#phone');


regularOrder.addValidator(name, validateNickname, 'От 2 до 50 символов', true)
// regularOrder.addValidator(name, validateCyrylic, 'Имя должно быть написано кирилицей', true)
regularOrder.addValidator(phone, validatePhoneFormat, 'Например: 8 900 77 77 00', true)


form.addEventListener('submit', function (e) {
    e.preventDefault()
    // const isValid = regularOrder.validate() && sendData(this);
    const isValid = regularOrder.validate();

    if (typeof isValid === 'boolean' && isValid) {
        this.elements.submit.disabled = true;

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.reset();
                getTemporaryNotice()
            }, 1000);
            resolve('name')
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