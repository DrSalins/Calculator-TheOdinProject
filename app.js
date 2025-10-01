const displayDiv = document.querySelector(".display");
const buttonNodeList = document.querySelectorAll("button");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "X", "÷"];
const buttonArray = Array.from(buttonNodeList);
let firstNumber = null;
let secondNumber = null;
let operand = "";
let readyForSecondNumber = false;
const add = (firstNumber, secondNumber) => {
  return firstNumber + secondNumber;
};
const subtract = (firstNumber, secondNumber) => {
  return firstNumber - secondNumber;
};
const multiply = (firstNumber, secondNumber) => {
  return firstNumber * secondNumber;
};
const divide = (firstNumber, secondNumber) => {
  if (secondNumber == 0) {
    return "😂😂😂";
  } else {
    return firstNumber / secondNumber;
  }
};
const operate = (firstNumber, secondNumber, operand) => {
  if (operand == "+") {
    return add(firstNumber, secondNumber);
  } else if (operand == "-") {
    return subtract(firstNumber, secondNumber);
  } else if (operand == "X") {
    return multiply(firstNumber, secondNumber);
  } else if (operand == "÷") {
    return divide(firstNumber, secondNumber);
  }
};
buttonArray.forEach((e) => {
  e.addEventListener("click", () => {
    if (displayDiv.innerHTML == 0 && numbers.includes(e.textContent)) {
      displayDiv.innerHTML = e.textContent;
    } else if (numbers.includes(e.textContent)) {
      if (readyForSecondNumber) {
        displayDiv.innerHTML = "";
        readyForSecondNumber = false;
      }
      if (displayDiv.innerHTML === "0") {
        displayDiv.innerHTML = e.textContent;
      } else {
        displayDiv.innerHTML += e.textContent;
      }
    } else if (e.textContent === ".") {
      if (readyForSecondNumber) {
        displayDiv.innerHTML = "0.";
        readyForSecondNumber = false;
      } else if (!displayDiv.innerHTML.includes(".")) {
        if (displayDiv.innerHTML == "" || displayDiv.innerHTML === "0") {
          displayDiv.innerHTML = "0.";
        } else {
          displayDiv.innerHTML += ".";
        }
      }
    } else if (e.textContent === "DEL") {
      if (displayDiv.innerHTML.length > 1) {
        displayDiv.innerHTML = displayDiv.innerHTML.slice(0, -1);
      } else {
        displayDiv.innerHTML = "0";
      }
    } else if (e.textContent == "+/-") {
      if (readyForSecondNumber) {
        displayDiv.innerHTML = "-0";
        readyForSecondNumber = false;
      } else {
        let currentNumber = Number(displayDiv.innerHTML);
        currentNumber = currentNumber * -1;
        displayDiv.innerHTML = currentNumber;
      }
    } else if (e.textContent === "%") {
      displayDiv.innerHTML = (Number(displayDiv.innerHTML) / 100).toFixed(6);
    } else if (e.textContent == "AC") {
      displayDiv.innerHTML = 0;
      firstNumber = null;
      secondNumber = null;
      operand = "";
    } else if (operators.includes(e.textContent)) {
      firstNumber = Number(displayDiv.innerHTML);
      operand = e.textContent;
      readyForSecondNumber = true;
    } else if (e.textContent == "=") {
      readyForSecondNumber = false;
      secondNumber = Number(displayDiv.innerHTML);
      let result = operate(firstNumber, secondNumber, operand);
      displayDiv.innerHTML = result;
    }
  });
});
document.addEventListener("keydown", (e) => {
  const keyMap = {
    "+": "+",
    "-": "-",
    "*": "X",
    x: "X",
    "/": "÷",
    ".": ".",
    Enter: "=",
    Backspace: "DEL",
    Escape: "AC",
    "%": "%",
    n: "n",
  };
  const key = e.key;
  if (!isNaN(key) && key !== " ") {
    document.querySelector(`button[data-key='${key}']`).click();
  } else if (keyMap[key]) {
    document.querySelector(`button[data-key='${keyMap[key]}']`).click();
  } else if (e.key === "5" && e.shiftKey) {
    document.querySelector("button[data-key='%']").click();
  }
});
