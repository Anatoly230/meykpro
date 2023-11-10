import AbstractView from '../framework/view/abstract-view.js';

const createTempletePopUp = () => {
    return `<div class="pop-up-background">
    <div class="popUp-info">
        <button type="button" class="popUp-info__close" aria-label="закрыть окно">
            <svg class="popUp-info__close-pic" width="20" height="20">
                <!-- <use xlink:href="../img/icons/sprite.svg#close"></use> -->
                <use xlink:href="../img/icons/close.svg"></use>
            </svg>
        </button>
        <form class="popUp-info__form" action="" method="post">
            <p class="popUp-info__title">
                Заказать бесплатную консультацию</p>
            <p class="popUp-info__description">Оставьте свои контактные данные и&nbsp;наш менеджер перезвонит вам
                в&nbsp;течение 10&nbsp;минут</p>
                <div class="input">
            <label class="input__name" for="tel" class="">Ваш номер телефона</label>
            <input class="input__field" type="tel" name="phone" id="tel" required>
            </div>
            <button class="popUp-info__submit btn" name="submit" type="submit">Отправть заявку</button>
        </form>
    </div>
</div>`
}

const pseudoBtn = document.querySelector('.btn--buy')


export class popUpConsult extends AbstractView {
    #popUpBg = null;
    #popUp = null;
    #submitBtn = null;
    #closeBtn = null;
    #input = null;
    #documentBody = document.body;

    get template() {
        return createTempletePopUp();
    }
    defineWindowElements() {
        this.#popUpBg = this.element;
        this.#closeBtn = this.element.querySelector('.popUp-info__close');
        this.#popUp = this.element.querySelector('.popUp-info');
        this.#input = this.element.querySelector('.input__field');
        this.#submitBtn = this.element.querySelector('.popUp-info__submit');
    }
    defineEvents() {
        this.#closeBtn.addEventListener('click', (e) => {
            this.#hide()
        })
        this.#popUpBg.addEventListener('click', (e) => {
            this.#hide()
        })
    }

    init() {
        if (!this.elment) {
            this.defineWindowElements();
            this.defineEvents();
        }
        this.#show()
    }
    #show() {
        this.#documentBody.appendChild(this.element)
    }
    showPopUp() {
        this.#show()
    }

    #hide() {
        this.element.remove()
    }
}

const popUpEl = new popUpConsult();

popUpEl.init()
pseudoBtn.addEventListener('click', function (e) {
    e.preventDefault();

    popUpEl.showPopUp();
})

