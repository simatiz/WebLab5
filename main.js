// 1) поміняти місцями контент блоків «2» та «5»
let buttonSwap = document.querySelector(".swap_button");
buttonSwap.addEventListener("click", swapBoxes);

function swapBoxes() {
    let box2 = document.querySelector(".box2");
    let box5 = document.querySelector(".box5");
    let tmp = box5.innerHTML;
    box5.innerHTML = box2.innerHTML;
    box2.innerHTML = tmp;
}

// 2) функція, яка обчислює площу п’ятикутника
let buttonCalculate = document.querySelector(".calculation_button");
buttonCalculate.addEventListener("click", findPentagon);
let isPentagonFound = false;

function findPentagon() {
    if (!isPentagonFound) {
        let side = 5;
        isPentagonFound = true;
        const textElement = document.querySelector(".box4");
        textElement.insertAdjacentHTML('beforeend',
            `<div style="font-size: 20px; color: white;">Pentagon Area: ${side * 5 * (side / (2 * Math.tan(36)))}</div>`);
    }
}

// 3) скрипт, який «перевертає» задане натуральне число
let buttonReverse = document.querySelector(".reverse_button");
buttonReverse.addEventListener("click", reverseNumber);
let cookieName = "reversed_number";

function reverseNumber() {
    let number = document.querySelector(".input_number").value;
    let res = number.toString().split('').reverse().join('');
    document.cookie = `${cookieName}=${res}`;
    alert("Reversed number: " + res);
}

if (performance.navigation.type === 1 && getCookie(cookieName) !== undefined) {
    if (confirm(`Clear cookies? (${cookieName}=${getCookie(cookieName)})`)) {
        eraseCookie(cookieName);
        alert("Cookies have been deleted");
    } else {
        alert(`Current cookies: ${cookieName}=${getCookie(cookieName)}, you can remove them by reloading the page`);
    }
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0';
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// 4) скрипт, який при настанні події click змінює колір рамки усіх номерних блоків (1..7) на вказаний користувачем
let checkbox = document.querySelector(".checkbox");
document.onclick = function() {
    changeBorderColor(checkbox);
};

function changeBorderColor(checkbox) {
    if (checkbox.checked) {
        if (localStorage.getItem('border-color') === null) {
            localStorage.setItem('border-color', "green");
            for (let i = 1; i < 8; i++) {
                document.querySelector(`.box${i}`).style.borderColor = 'green';
            }
        }
        else {
            for (let i = 1; i < 8; i++) {
                document.querySelector(`.box${i}`).style.borderColor = 'black';
            }
            localStorage.removeItem('border-color');
        }
    }
}

window.onload = function() {
    if (localStorage.getItem('border-color') !== null) {
        for (let i = 1; i < 8; i++) {
            document.querySelector(`.box${i}`).style.borderColor = localStorage.getItem('border-color');
        }
    }
    for (let i=1; i<8; i++)
    {
        localStorage.removeItem(`.box${i}`);
    }
};

// 5) скрипт задання CSS-інструкцій для будь-якого тега в HTML-структурі номерних блоків (1..7):
let buttonX = document.querySelector(".small_box1");
buttonX.addEventListener("click", makeAreaChangeTag);

function makeAreaChangeTag() {
    const box4 = document.querySelector(".box4");
    box4.innerHTML = `<label>Input settings:<textarea class="input_settings" rows="20" cols="50"></textarea></label><button class="button1">1</button><button class="button2">2</button>` + box4.innerHTML;

    let button1 = document.querySelector(".button1");
    button1.addEventListener("click", giveCSSInstructions);

    let button2 = document.querySelector(".button2");
    button2.addEventListener("click", resetCSSInstructions);
}

function giveCSSInstructions() {
    let settings = document.querySelector(".input_settings").value.toString().split(/\s*;\s*/);
    if(localStorage.getItem('settings') === null) localStorage.setItem('settings', settings);
    else{
        let sett = localStorage.getItem('settings') + settings;
        localStorage.setItem('settings', sett);
    }
    let style = '';
    for(let i = 0; i <= settings.length - 1; i++) {
        style += settings[i] + '; ';
    }
    let images = document.querySelectorAll('img');
    images.forEach(element => {element.style.cssText += style;});
}

function resetCSSInstructions(){
    let settings = localStorage.getItem('settings').split(/\s*,\s*/);
    if (settings !== null) {
        let images = document.querySelectorAll('img');
        if(typeof settings === 'string') {
            let setting = settings.split(/\s*:\s*/)[0];
            images.forEach(element => {element.removeProperty(setting);});
            localStorage.removeItem('settings');
        }
        else {
            for (let i = 0; i <= settings.length - 1; i++) {
                let setting = settings[i].split(/\s*:\s*/)[0];
                images.forEach(element => {element.style.removeProperty(setting);});
            }
            localStorage.removeItem('settings');
        }
    }
}