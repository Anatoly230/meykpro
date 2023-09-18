
const LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    ENTER = 'Enrer',
    SPACE = 'Space';

const radioGroup = document.querySelector('.radio-group');
const checkers = [...radioGroup.querySelectorAll('.radio-button')]
let focusedButton = radioGroup.querySelector('.radio-button.checked'),
    focusedIndex = checkers.indexOf(focusedButton);

if (!focusedButton) {
    focusedIndex = 0;
    focusedButton = checkers[focusedIndex];
}


radioGroup.addEventListener('keydown', (e) => {
    switch (e.code) {
        case UP:
        case LEFT: {
            e.preventDefault();
            if (focusedIndex === 0) {
                focusedIndex = checkers.length - 1;

            } else {
                focusedIndex--;
            }
            break;
        }
        case DOWN:
        case RIGHT: {
            e.preventDefault();
            if (focusedIndex === checkers.length - 1) {
                focusedIndex = 0;

            } else {
                focusedIndex++;
            }
            break;
        }
        case ENTER:
        case SPACE: {
            break;
        }

        default: {
            return
        }
    }
    changeFocus()
})


radioGroup.addEventListener('click', (e) => {
    if (checkers.includes(e.target) && !e.target.classList.contains('checked')) {
        focusedIndex = checkers.indexOf(e.target);
        changeFocus();
    }
})

function changeFocus() {
    focusedButton.tabIndex = '-1'
    focusedButton.classList.remove('checked');
    focusedButton = checkers[focusedIndex];
    focusedButton.tabIndex = '0';
    focusedButton.classList.add('checked');
    focusedButton.focus();
}
