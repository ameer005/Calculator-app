const keypad = document.querySelector(".keypad");
const displayMain = document.querySelector(".display__number-main");
const displaySub = document.querySelector(".display__number-sub");
const del = document.querySelector(".keypad__btn--del");
const reset = document.querySelector(".keypad__btn--reset");
const equal = document.querySelector(".keypad__btn--operator-equal");
const toggle = document.querySelector(".toggle__fill");

// GLOBAL VARIABLES
let currVal = "";
let previusVal = "";
let operator;

// HELPER FUNCTIONS
const getDisplayNumber = function (number) {
  const strinNumber = number.toString();
  const integerDigits = parseFloat(strinNumber.split(".")[0]);
  const decimalDigits = strinNumber.split(".")[1];

  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
};

const updateScreen = function (main, sub) {
  displayMain.textContent = getDisplayNumber(main);
  if (sub === "") displaySub.textContent = `${getDisplayNumber(sub)}`;
  else displaySub.textContent = `${getDisplayNumber(sub)}${operator}`;
};

const compute = function (curval, prevval, operator) {
  const previous = parseFloat(prevval);
  const current = parseFloat(curval);
  let total;

  switch (operator) {
    case "+":
      total = previous + current;
      break;
    case "-":
      total = previous - current;
      break;
    case "/":
      total = previous / current;
      break;
    case "×":
      total = previous * current;
      break;
    default:
      total = 0;
  }

  previusVal = "";
  operator = "";
  currVal = total.toString();
  updateScreen(currVal, previusVal);
};

/////////////////////// MAIN ////////////////////////

// Numbers
keypad.addEventListener("click", function (e) {
  btn = e.target;

  if (!btn.matches(".keypad__btn--number")) return;

  // Restricting decimal occurence to only one
  if (btn.textContent === "." && currVal.includes(".")) return;

  currVal += btn.textContent;
  updateScreen(currVal, previusVal);
});

// Delelte
del.addEventListener("click", function () {
  currVal = currVal.slice(0, -1);
  updateScreen(currVal, previusVal);
});

// Reset
reset.addEventListener("click", function () {
  previusVal = "";
  currVal = "";
  operator = "";
  updateScreen(currVal, previusVal);
});

// Operators
keypad.addEventListener("click", function (e) {
  btn = e.target;

  if (!btn.matches(".keypad__btn--operator")) return;

  // Checking if we have both the operands
  if (currVal !== "" && previusVal !== "") {
    compute(currVal, previusVal, operator);
  } else {
    // previusVal = currVal + btn.textContent;
    previusVal = currVal;
    currVal = "";
    operator = btn.textContent;
    updateScreen(currVal, previusVal);
  }
});

// Equal
equal.addEventListener("click", function () {
  if (currVal === "" && previusVal === "") return;

  compute(currVal, previusVal, operator);
});

//////////////////////THEME SWITCHING/////////////////////

const toggleFill = document.querySelector(".toggle__fill-btn");
const logo = document.querySelector(".header__logo-text");
const theme = document.querySelector(".theme");

const changeTogglePos = function (theme, value) {
  toggleFill.style.transform = `translate(${value}, -50%)`;
  toggleFill.dataset.theme = theme;
};

const changingColor = function (color) {
  displayMain.style.color = color;
  displaySub.style.color = color;
  logo.style.color = color;
  theme.style.color = color;
};

toggle.addEventListener("click", function () {
  if (toggleFill.dataset.theme === "theme-1") {
    changeTogglePos("theme-2", "2rem");

    document.body.classList.add("theme-two");
    changingColor("#444b5a");
  } else if (toggleFill.dataset.theme === "theme-2") {
    changeTogglePos("theme-3", "4rem");

    document.body.classList.remove("theme-two");
    document.body.classList.add("theme-three");
    changingColor("#ffe53d");
  } else if (toggleFill.dataset.theme === "theme-3") {
    changeTogglePos("theme-1", "0");

    document.body.classList.remove("theme-three");
    changingColor("var(--color-keys-text-2)");
  }
});
