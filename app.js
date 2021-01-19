const fillProgressBar = document.querySelector('.fill');
const buttons = document.querySelectorAll('button');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const steps = document.getElementsByClassName('step');

const indexRange = steps.length - 1;
let width = 0;
let index = 0;
let fill = 0;

const renderFill = (index) => fill = Math.round((index / indexRange) * 100);
const activateStep = (index) => steps[index].classList.add('active');
const deactivateStep = (index) => steps[index + 1].classList.remove('active');

const setButtonState = () => {
    if(index >= indexRange) nextButton.setAttribute('disabled', true);
    else if(index <= 0) previousButton.setAttribute('disabled', true);
    else {
        nextButton.removeAttribute('disabled')
        previousButton.removeAttribute('disabled')
    }
}

activateStep(index);
setButtonState();
 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('next')) {
            index++;
            activateStep(index)
        } 
        if(button.classList.contains('previous')) {
            index--;
            deactivateStep(index);
        }

        setButtonState();
        renderFill(index);

        let progressBar = setInterval(() => {
            if(width == fill) clearInterval(progressBar)
            else if (width > fill) width--;
            else width++;

            fillProgressBar.style.width = `${width}%`;
        }, 10);
    })
})