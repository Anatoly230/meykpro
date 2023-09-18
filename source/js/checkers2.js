const LEFT = 'arrowLeft',
    RIGHT = 'arrowRight',
    UP = 'arrowUp',
    DOWN = 'arrowDown',
    ENTER = 'Enter',
    SPACE = 'Space';

const checkersGroup = document.querySelector('.checkers');
const checkers = [...checkersGroup.querySelectorAll('.radio-button')];
let focusedButton = checkersGroup.querySelector('.checked'),
    focusedIndex = checkers.indexOf(focusedButton);

checkersGroup.addEventListener('keydown', (e) => {
    // console.log(e.code);
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
    console.log('focus chaged', focusedButton, focusedIndex);
}
