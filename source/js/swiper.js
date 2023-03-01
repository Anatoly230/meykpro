const swipeTest = 0;
const sliderTwo = document.querySelector('.slider-two'),
    slides = Array.from(sliderTwo.querySelectorAll('.slider-two__item'));
let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationId = 0,
    currentIndex = 0;


slides.forEach((slide, index) => {
    const slideImage = slide.querySelector('.slider-two__item-image');
    slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    // Touch events

    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    // Mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
})

window.oncontextmenu = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function touchStart(index) {

    return function (e) {
        currentIndex = index;
        isDragging = true;
        startPos = getPositionX(e);
        animationId = requestAnimationFrame(animation);
        this.classList.add('grabbing');
    }
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationId);
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1) {
        currentIndex += 1
    }
    if (movedBy > 100 &&  currentIndex > 0) {
        currentIndex -= 1
    }
    setPositionByindex();
    this.classList.remove('grabbing');
}

function touchMove(e) {
    if (isDragging) {
        let currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
    setSliderPosition()
    if (isDragging) {
        requestAnimationFrame(animation)
    }
}

function setSliderPosition() {
    sliderTwo.style.transitionProperty = 'transform';
    sliderTwo.style.transitionDuration = '1000ms';
    sliderTwo.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByindex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentIndex;
    setSliderPosition();
}

console.log('swipe start');

// export { swipeTest };