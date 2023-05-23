import { createElement, render } from './render.js';

const initialMessage = {
    title: 'Ваше сообщение успешно отправлено!',
    description: '* наш сотрудник вам ответит в течение нескольких минут.'
}

export const callMessage = {
    title: 'Ваша заявка успешно отправлена!',
    description: '* наш сотрудник свяжется с вами в течение нескольких минут.'
}


const createAlertTemplate = (message = initialMessage) =>
    `<div class="alert-wrapper">
    <div class="alert">
<p class="alert__title">${message.title}</p>
<p class="alert__description">${message.description}</p>
</div>
</div>`;

class AlertMessage {
    #element = null;
    constructor(message) {
        this.messageInfo = message;
    }
    get template() {
        return createAlertTemplate(this.messageInfo);
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }

        return this.#element;
    }

    removeElement() {
        this.#element = null;
    }
}

export function getTemporaryNotice(message,time = 3000) {
    let alertMessage = new AlertMessage(message);
    render(alertMessage, document.body);
    setTimeout(() => {
        alertMessage.element.remove();
    }, time)
    // alertMessage = null;
}
