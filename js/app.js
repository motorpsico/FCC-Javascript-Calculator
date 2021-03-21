function updateDisplay() {
    displayFormula.innerText = formula;
    displayResult.innerText = result;
}

function addDigit(e) {
    const button = e.target;
    const digit = button.innerText;
    let invalid = /^0[0-9]/
    if(invalid.test(result+digit)) {
        result = digit; 
    }    
    else {
        result += digit;
        
    }
    formula += digit;
    updateDisplay();
    //funciona bien
}

function addDecimal() {
    if(!result.includes(".")) { 
        result += ".";
        formula += ".";
    }
    updateDisplay();
}

function equal() {
    let res = eval(formula);
    formula = res;
    result = res;
    updateDisplay();
}

function clear() {
    formula = "";
    result = "0";
    updateDisplay();
}

function del() {
  
    formula = formula.substring(0, formula.length - 1);
    result = result.substring(0, result.length-1);
    if(result.length === 0)
        result = "0";
    updateDisplay();
}

function addOperator(e) {
    let operator = e.target.innerText;
    let noOperator = /([0-9]$)/;
    let oneOperator = /[0-9][\+\/\*-]$/;
    let twoOperator = /[\+\/\*-][\+\/\*-]$/
    if(noOperator.test(formula))
        formula += operator;
    else {
        if(oneOperator.test(formula)) {
           let lastOperator = formula.substring(formula.length - 1);
           if(lastOperator !== "-" && operator === "-")
                formula += operator;   
        } else {
            if(twoOperator.test(formula))
                formula = formula.substring(0, formula.length - 2) + operator;
        }
    }
    result = "0";
    updateDisplay();
    
}

let formula = "";
let result = "0";
let lastOperator = "";


const displayFormula = document.querySelector(".formula");
const displayResult = document.querySelector(".result");

const buttons = $(".button");
for(let button of buttons) {
    if(!isNaN(button.innerText))
        button.addEventListener("click", addDigit);
    else if(button.id === "clear")
        button.addEventListener("click", clear);
    else if(button.id === "decimal")
        button.addEventListener("click", addDecimal);
    else if(button.id === "add")
        button.addEventListener("click", addOperator);
    else if(button.id === "equals")
        button.addEventListener("click", equal);
    else if(button.id === "multiply")
        button.addEventListener("click", addOperator);
    else if(button.id === "divide")
        button.addEventListener("click", addOperator);
    else if(button.id === "subtract")
        button.addEventListener("click",addOperator);
    else if(button.id === "delete") 
        button.addEventListener("click", del );
    
        
}