let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;

function appendToDisplay(value) {
    currentInput += value;
    if (operator) {
        display.value = `${firstOperand} ${operator} ${currentInput}`;
    } else {
        display.value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    display.value = '';
}
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        // If the key is a number
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // If the key is an operator
        setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        // If the key is Enter
        calculate();
    } else if (key === 'Backspace') {
        // If the key is Backspace
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || `${firstOperand} ${operator}` || '';
    } else if (key === 'Escape') {
        // If the key is Escape
        clearDisplay();
    }
});
function setOperation(op) {
    if (currentInput) {
        firstOperand = parseFloat(currentInput);
        operator = op;
        currentInput = '';
        display.value = `${firstOperand} ${operator}`;
    }
}

function calculate() {
    if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        let result;2+
        fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                num1: firstOperand,
                num2: secondOperand,
                operation: operator,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                display.value = data.error;
            } else if (data.result !== undefined) {
                display.value = data.result;
                currentInput = String(data.result);
                firstOperand = null;
                operator = null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            display.value = 'Error';
        });
    }
}