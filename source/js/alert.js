import AbstractView from './framework/view/abstract-view.js';
import { render } from './framework/render.js';

const initialMessage = {
    title: 'Ваше сообщение успешно отправлено!',
    description: '* наш сотрудник вам ответит в течение нескольких минут.'
}

const callMessage = {
    title: 'Ваша заявка успешно отправлена!',
    description: '* наш сотрудник свяжется с вами в течение нескольких минут.'
}


const createAlertTemplate = (message) => {
    return `<div class="alert-wrapper">
    <div class="alert">
<p class="alert__title">${message.title ? message.title : 'no message'}</p>
<p class="alert__description">${message.description ? message.description : 'no descrption'}</p>
</div>
</div>`;
}

class AlertMessage extends AbstractView {
    #message;
    constructor(message) {
        super()
        this.#message = message;
    }

    get template() {
        return createAlertTemplate(this.#message);
    }
}

export function getTemporaryNotice(switcher) {
    let alertMessage;
    let message;
    switch (switcher) {
        case 'initial':
            message = initialMessage;
            break;
        case 'callback':
            message = callMessage;
            break;
    }
    alertMessage = new AlertMessage(message);
    if (alertMessage) {
        render(alertMessage, document.body);
        setTimeout(() => {
            alertMessage.element.remove();
            alertMessage = null;
        }, 3000)
    } else {
        console.log('no alert object, add alert type - "initial" or "callback" in getTemporaryNotice() function');
    }
}
