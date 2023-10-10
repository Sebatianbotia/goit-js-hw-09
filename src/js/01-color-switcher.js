const bodyEl = document.querySelector("body");
const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");
let timerId = null;
let firstRun = true;

buttonStop.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};


function colorChange(){
    bodyEl.style.backgroundColor = getRandomHexColor();

};

function runColor(){
    buttonStart.disabled = true;
    buttonStop.disabled = false;
    timerId = setInterval(colorChange, 1000);
    
    if (firstRun){
        colorChange();
        firstRun = false;
    };
};

function stopColor(){
    buttonStart.disabled = false;
    buttonStop.disabled = true;
    clearInterval(timerId);
    firstRun = true;
};

buttonStart.addEventListener('click', runColor);
buttonStop.addEventListener('click', stopColor);


