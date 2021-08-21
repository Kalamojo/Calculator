let output = document.querySelector('#output');
let numbers = document.querySelectorAll('.number');
let decimal = document.querySelector('#decimal');
let clear = document.querySelector('#clear');
let operators = document.querySelectorAll('.operator');
let equals = document.querySelector('#equals');

var operation;
var first;
var second;

let value = (object, change) => {
    object.value = `${change}`;
};

var current = output.value;

numbers.forEach(element => {
    element.addEventListener('click', () => {
        if (current != "undefined") {
            current = current + element.textContent;
            value(output, current);
        } else {
            current = element.textContent;
            value(output, current);
        }
    }, false)
});

decimal.addEventListener('click', () => {
    current = current + decimal.textContent;
    value(output, current);
    decimal.disabled = true;
})


operators.forEach(element => {
    element.addEventListener('click', () => {
        first = current;
        value(output, "")
        current = "";
        operation = element.textContent;
        decimal.disabled = false;
    })
})

equals.addEventListener('click', () => {
    second = current;
    value(output, operate(operation, first, second));
    current = output.value;
    decimal.disabled = false;
})

clear.addEventListener('click', () => {
    value(output, "");
    current = "";
    operation = "";
    decimal.disabled = false;
});


function add(array) {
    let sum = +array[0];
    for(var i = 1; i <= array.length - 1; i++) {
        sum += +array[i];
    }
    return sum;
}
function subtract(array) {
    let difference = array[0];
    for(var i = 1; i <= array.length - 1; i++) {
        difference -= array[i];
    }
    return difference;
}
function multiply(array) {
    let product = +array[0];
    for(var i = 1; i <= array.length - 1; i++) {
        product *= +array[i];
    }
    return product;
}
function divide(array) {
    let quotient = +array[0];
    for(var i = 1; i <= array.length - 1; i++) {
        quotient /= +array[i];
    }
    return quotient;
}

function operate(sign, num1, num2) {
    switch (sign) {
        case '+':
            return add([num1, num2]);
            break;
        case '-':
            return subtract([num1, num2]);
            break;
        case '*':
            return multiply([num1, num2]);
            break;
        case '/':
            if (num2 != 0) {
                return divide([num1, num2]);
            } else {
                alert("Bruh");
                value(output, "");
                current = "";
            }
            break;
        default:
            alert("There has been an error of some sort. Make sure you entered in values and operators correctly.");
    }
}