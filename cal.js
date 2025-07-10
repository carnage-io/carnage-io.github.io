// Calculator button layout and logic
const calcBtns = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
];
if (document.getElementById('calc-buttons')) {
    let html = '';
    for (let btn of calcBtns) {
        html += `<button class="calc-btn" data-key="${btn}">${btn}</button>`;
    }
    document.getElementById('calc-buttons').innerHTML = html;
}

const display = document.getElementById('calc-display');
let input = "";

function updateDisplay(val) {
    display.value = val;
}

function handleInput(val) {
    if (val === "=") {
        try {
            let result = eval(input);
            updateDisplay(result ?? 0);
            input = String(result ?? 0);
        } catch {
            updateDisplay("Error");
            setTimeout(() => updateDisplay(input || "0"), 1000);
        }
    } else if (val === "C") {
        input = "";
        updateDisplay("0");
    } else {
        input += val;
        updateDisplay(input);
    }
}

// Click support
if (document.getElementById('calc-buttons')) {
    document.getElementById('calc-buttons').onclick = function (e) {
        if (!e.target.classList.contains('calc-btn')) return;
        let val = e.target.getAttribute('data-key');
        if (val === "=") handleInput("=");
        else handleInput(val);
    };
}

// Keyboard support
if (display) {
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') return; // handled in main.js
        if ("0123456789/*-+.".includes(e.key)) {
            handleInput(e.key);
        } else if (e.key === "Enter" || e.key === "=") {
            handleInput("=");
        } else if (e.key === "Backspace") {
            input = input.slice(0, -1);
            updateDisplay(input || "0");
        } else if (e.key.toUpperCase() === "C") {
            input = "";
            updateDisplay("0");
        }
    });
}