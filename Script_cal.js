// Get references to important elements
const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstOperand = null;
let waitForSecondOperand = false;

// Function to update the display with the current input
function updateDisplay() {
    result.textContent = currentInput;
}

// Function to clear all calculator data
function clearAll() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    waitForSecondOperand = false;
}

// Function to handle digit input
function inputDigit(digit) {
    if (waitForSecondOperand) {
        currentInput = digit;
        waitForSecondOperand = false;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

// Function to handle decimal input
function inputDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// Function to handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation();
        currentInput = String(result);
        firstOperand = result;
    }

    waitForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Function to perform calculations
function performCalculation() {
    const inputValue = parseFloat(currentInput);
    if (operator === '+') {
        return firstOperand + inputValue;
    } else if (operator === '-') {
        return firstOperand - inputValue;
    } else if (operator === '×') {
        return firstOperand * inputValue;
    } else if (operator === '÷') {
        return firstOperand / inputValue;
    }
    return inputValue;
}

// Event listeners for button clicks
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            clearAll();
        } else if (button.id === 'backspace') {
            currentInput = currentInput.slice(0, -1);
        } else if (button.classList.contains('operator')) {
            handleOperator(button.textContent);
        } else if (button.id === 'decimal') {
            inputDecimal();
        } else if (button.id === 'equal') {
            if (waitForSecondOperand) {
                currentInput = 'Error';
            } else {
                currentInput = performCalculation();
                operator = '';
                firstOperand = null;
            }
        } else {
            inputDigit(button.textContent);
        }
        updateDisplay();
    });

    // Add mouse hover effects
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#ddd';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '';
    });
});

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        inputDigit(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (/[+\-×÷]/.test(key)) {
        handleOperator(key);
    } else if (key === 'Enter') {
        if (!waitForSecondOperand) {
            currentInput = performCalculation();
            operator = '';
            firstOperand = null;
            updateDisplay();
        }
    } else if (key === 'Escape') {
        clearAll();
        updateDisplay();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
});
