import { isEscape } from "./utils.js";
import { popUpConsult } from "./view/pop-up-consult.js";
import { render } from './framework/render.js';
import sendData from "./fetcher.js";
import { config, validatePhoneFormat } from "./pristine-configs.js";
import { getTemporaryNotice} from "./alert.js";
import addPhoneMask from "./utils/tel-mask.js";


const requestBtn = document.querySelector('.header__callback-btn');
const body = document.querySelector('body');
const popUpForm = null;

let popUpBody = null,
    popUpCloseBtn = null;

function popUpFormProces(popup) {
    const form = popup.querySelector('.popUp-info__form');
    addPhoneMask(form.querySelector('[type=tel]'));
    const fastOrder = new Pristine(form, config, false);
    fastOrder.addValidator(form.querySelector('#tel'), validatePhoneFormat, 'Например: 8 900 77 77 00', true);

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        // console.log(form.querySelector('[type=tel]').value);
        // const isValid = regularOrder.validate() && sendData(this, './php/fast-order.php');
        const isValid = fastOrder.validate();

        if (typeof isValid === 'boolean' && isValid) {
            this.elements[1].disabled = true;
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.reset();
                    closePopUpInfo();
                    getTemporaryNotice('callback')
                }, 1000);
                resolve('name')
            })
            
            
            //сообщение об успешной отправки формы
        } else {

            //сообщение об ошибке отправки данных
        }
    })


}

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


function closePopUpInfo() {
    popUpCloseBtn.removeEventListener('click', closePopUpInfo)
    popUpBody.element.removeEventListener('click', onClickingOnVoid)
    popUpBody.element.remove()
    popUpBody.removeElement()
    window.removeEventListener('keydown', onEscapeKeyDown)
}

function onClickRequestBtn() {
    popUpBody = new popUpConsult();
    popUpFormProces(popUpBody.element);
    popUpCloseBtn = popUpBody.element.querySelector('.popUp-info__close')
    popUpCloseBtn.addEventListener('click', closePopUpInfo)
    popUpBody.element.addEventListener('click', onClickingOnVoid)
    window.addEventListener('keydown', onEscapeKeyDown)
    render(popUpBody,document.body)
}

requestBtn.addEventListener('click', onClickRequestBtn)
export { requestBtn };