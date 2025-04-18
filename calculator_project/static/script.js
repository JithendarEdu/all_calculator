let display = document.getElementById('display');
let currentInput = '';
let firstOperand = null;
let operator = null;

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = null;
    display.value = '';
}

function setOperation(op) {
    if (currentInput) {
        firstOperand = parseFloat(currentInput);
        operator = op;
        currentInput = '';
    }
}

function calculate() {
    if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        let result;
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