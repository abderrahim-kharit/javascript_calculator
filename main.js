let allBtns = document.querySelectorAll(".digits button");
let division = document.querySelector(".divs");
let addition = document.querySelector(".add");
let subtraction = document.querySelector(".sub");
let multipl = document.querySelector(".mtp");
let resultArea = document.querySelector(".result");
let equal = document.querySelector(".equal");
let reset = document.querySelector(".reset");
let numbers = document.querySelectorAll(".nbrs");
let del = document.querySelector(".del");
let operators = [division, addition, subtraction, multipl, equal];
let operator1 = "";
let operator2 = "";
let isOperatorClicked = false;

numbers.forEach((element) => {
  element.onclick = function () {
    // Show number
    resultArea.innerHTML += element.innerHTML;
    if (isOperatorClicked === false) {
      /* means that an operator is not clicked and now
      we typing on operator 1 */
      operator1 += element.innerHTML;
    } else {
      /* means that an operator is clicked and now
      we typing on operator 2 */
      operator2 = operator2 + element.innerHTML;
    }
  };
});
let lastOp;
let currentOp;
/*----------- Operations Process---------------*/
operators.forEach((element) => {
  element.addEventListener("click", function () {
    resultArea.innerHTML += element.innerHTML;
    if (element === "=") {
      isOperatorClicked = false;
    } else {
      isOperatorClicked = true;
    }
    if (operator2 === "" && element !== equal) {
      lastOp = element.innerHTML;
    }
    if (operator2 !== "") {
      switch (lastOp) {
        case "+":
          operator1 = parseFloat(
            (parseFloat(operator1) + parseFloat(operator2)).toFixed(3)
          );
          lastOp = element.innerHTML;
          operator2 = "";
          break;
        case "*":
          operator1 = parseFloat(
            (parseFloat(operator1) * parseFloat(operator2)).toFixed(3)
          );
          lastOp = element.innerHTML;
          operator2 = "";
          break;
        case "-":
          operator1 = parseFloat(
            (parseFloat(operator1) - parseFloat(operator2)).toFixed(3)
          );
          lastOp = element.innerHTML;
          operator2 = "";
          break;
        case "/":
          operator1 = parseFloat(
            (parseFloat(operator1) / parseFloat(operator2)).toFixed(3)
          );
          lastOp = element.innerHTML;
          operator2 = "";
          break;
      }
    }
    /* show result and remove operation symbol if equal button is clicked */
    if (element === equal) {
      resultArea.innerHTML = operator1;
      operator1 = operator1.toString();
      isOperatorClicked = false;
    } else {
      resultArea.innerHTML = operator1 + element.innerHTML;
    }
  });
});

/*-------------- Reset Button-------------*/
reset.onclick = function () {
  // reset all variables and clear result area
  resultArea.innerHTML = "";
  operator1 = "";
  operator2 = "";
  isOperatorClicked = false;
};

/*-------------- Delete Button-------------*/
del.onclick = function () {
  resultArea.innerHTML = resultArea.innerHTML.slice(0, -1);
  if (operator2 === "" && lastOp === undefined) {
    if (typeof operator1 !== "string") {
      operator1 = operator1.toString().slice(0, -1);
      isOperatorClicked = false;
    } else {
      operator1 = operator1.slice(0, -1);
    }
  }
  // if (typeof operator1 === "number" && operator2 === "" && lastOp === "=") {
  //   operator1 = parseFloat(operator1.toString().slice(0, -1));
  // }
  if (operator2 === "" && lastOp === "=") {
    operator1 = operator1.slice(0, -1);
  }
  if (operator2 === "" && lastOp !== undefined) {
    lastOp = undefined;
  }
  if (operator2 !== "") {
    operator2 = operator2.slice(0, -1);
  }
  if (resultArea.innerHTML === "") {
    resultArea.innerHTML = "";
    operator1 = "";
    operator2 = "";
    isOperatorClicked = false;
  }
};

allBtns.forEach((element) => {
  element.addEventListener("click", function () {
    if (resultArea.innerHTML.length >= 12) {
      resultArea.style.cssText = `background-color: red !important`;
    } else {
      resultArea.style.cssText = `background-color: rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important}`;
    }
  });
});
