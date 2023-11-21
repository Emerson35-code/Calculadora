const previousOperationText = document.querySelector('#previous-operetion');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#button-container button')

class calculator {
   constructor (previousOperationText, currentOperationText) {
       this.previousOperationText = previousOperationText;
       this.currentOperationText = currentOperationText;
       this.currentOperation = "";
   }
   // metudos
   addDigit(digit) {

    if(digit === "." && this.currentOperationText.innerText.includes(".")) 
    {
       return;
       
       
    }
   
     this.currentOperation = digit;
     this.updateScreen();

   }

   processOperation(operation) {
    if(this.currentOperationText.innerText === "" && operation !== "C") {
        if(this.previousOperationText.innerText !== "") {
             this.changeOperation(operation);
        }
        return;
    }

    let operationValue;
    let previous = + this.previousOperationText.innerText.split(" ")[0];
    let current = + this.currentOperationText.innerText;

    switch(operation) {
        case "+" :
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-" :
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "*" :
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "/" :
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "DEL" :
            this.precessDelOperetor();
            break;
        case "CE" :
            this.precessClearCurrentOperation();
            break;
        case "C" :
            this.processClearOperation();
            break;
        case "=" :
            this.processEqualOperator();
            break;
         default:
            return;   
    }
   }

   updateScreen(operationValue = null,
     operation = null,
      current = null,
      previous = null
      ) {
      
  
        if(operationValue === null) {
            this.currentOperationText.innerText +=
             this.currentOperation;
        } else {

            if(previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        } 
   } 

   changeOperation(operation) {
    const mathOperation = ["*", "-", "+", "/"];

    if(!mathOperation.includes(operation)) {
        return
    }

     this.previousOperationText.innerText = 
     this.previousOperationText.innerText.slice(0, -1) + operation;

   }

   precessDelOperetor() {
    this.currentOperationText.innerText =
     this.currentOperationText.innerText.slice(0, -1);
   }

   precessClearCurrentOperation() {
   this.currentOperationText.innerText = "";

   }

   processClearOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
   }

   processEqualOperator() {
     const operation = previousOperationText.innerText.split(" ") [1]
     this.processOperation(operation);
   }
}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
        calc.addDigit(value);
    } else {
        calc.processOperation(value);
    }
    });
});
