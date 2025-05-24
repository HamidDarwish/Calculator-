const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let currentOperation = '';
let previousInput = '';
let shouldResetScreen = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            handleNumber(value);
        } else if (value === 'C') {
            clear();
        } else if (value === '⌫') {
            backspace();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
        updateDisplay();
    });
});

function handleNumber(number) {
    if (shouldResetScreen) {
        currentInput = '';
        shouldResetScreen = false;
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function handleOperator(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    currentOperation = operator;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (currentOperation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    currentOperation = '';
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clear() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    shouldResetScreen = false;
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    if (currentOperation && previousInput) {
        result.value = `${previousInput} ${currentOperation} ${currentInput}`;
    } else {
        result.value = currentInput || '0';
    }
}

// Multiplication Table Logic
const tableNumberInput = document.getElementById('table-number');
const tableResultDiv = document.getElementById('table-result');

function generateTable(num) {
    if (isNaN(num) || num < 0) {
        tableResultDiv.innerHTML = '<span style="color: #fa5252">Please enter a valid number greater than 0.</span>';
        return;
    }
    
    let tableHTML = '<table>';
    for (let i = 1; i <= 10; i++) {
        tableHTML += `<tr><td>${num} × ${i}</td><td>=</td><td>${num * i}</td></tr>`;
    }
    tableHTML += '</table>';
    tableResultDiv.innerHTML = tableHTML;
}

// Show table automatically when input changes
tableNumberInput.addEventListener('input', function() {
    const num = parseInt(this.value);
    generateTable(num);
});
