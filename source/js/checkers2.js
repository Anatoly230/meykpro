const LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    ENTER = 'Enter',
    SPACE = 'Space';

const checkersGroup = document.querySelector('.checkers');
const checkers = [...checkersGroup.querySelectorAll('.radio-button')];
let focusedButton = checkersGroup.querySelector('.checked'),
    focusedIndex = checkers.indexOf(focusedButton);

checkersGroup.addEventListener('keydown', (e) => {
    switch (e.code) {
        case LEFT:
        case UP: {
            e.preventDefault();
            if (focusedIndex === 0) {
                focusedIndex = checkers.length - 1;
            } else {
                focusedIndex--;
            }
            break;
        }
        case RIGHT:
        case DOWN: {
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

function changeFocus() {
    focusedButton.tabIndex = '-1';
    focusedButton.classList.remove('checked');
    focusedButton = checkers[focusedIndex];
    focusedButton.classList.add('checked');
    focusedButton.tabIndex = '0';
    focusedButton.focus();
}
