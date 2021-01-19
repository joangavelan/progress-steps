const fillProgressBar = document.querySelector('.fill');
const buttons = document.querySelectorAll('button');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const steps = document.getElementsByClassName('step');
const nsInput = document.querySelector('#ns-input');

let indexRange = steps.length - 1;
let width = 0;
let index = 0;
let fill = 0;

const renderFill = (index, range) =>  {
    fill = Math.floor((index / range) * 100);

    let progressBar = setInterval(() => {
        if(width == fill) clearInterval(progressBar)
        else if (width > fill) width--;
        else width++;

        fillProgressBar.style.width = `${width}%`;
    }, 10);
}

const activation = () => {
    for(let step of steps) step.classList.remove('active');
    for(let i = 0; i <= index; i++) steps[i].classList.add('active');
}

const setButtonState = () => {
    if(index >= indexRange) nextButton.setAttribute('disabled', true);
    else if(index <= 0) previousButton.setAttribute('disabled', true);
    else {
        nextButton.removeAttribute('disabled')
        previousButton.removeAttribute('disabled')
    }
}

nsInput.addEventListener('input', () => {
    let numberOfSteps = +nsInput.value;
    let markup = '';

    for(let i = 0; i < numberOfSteps; i++) {
        markup += `
            <div class="step">${i+1}</div>
        ` 
    }
    steps[0].parentNode.innerHTML = markup;

    indexRange = steps.length - 1;

    if(index >= indexRange) index = indexRange;

    activation();
    setButtonState();
    renderFill(index, indexRange);
})
 
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('next')) index++;
        if(button.classList.contains('previous')) index--;
        
        activation();
        setButtonState();
        renderFill(index, indexRange);
    })
})

setButtonState();