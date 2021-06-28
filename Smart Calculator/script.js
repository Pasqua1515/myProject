class Calcolatrice {
    constructor(prevCalculation, recentCalculation){
        this.prevCalculation = prevCalculation
        this.recentCalculation = recentCalculation
        this.clear()
    }

clear(){// delete everything
this.prevoperand = ""
this.recentoperand = ""
this.operation = undefined
}

delete(){ // delete a single nunmber
this.recentoperand = this.recentoperand.toString().slice(0, -1)
}

appendNumber(number){ // add a number to the screen
      if (number === "." && this.recentoperand.includes(".")) return
     this.recentoperand = this.recentoperand.toString() + number.toString();
// change to string to add different numbers to avoid unwanted sumn
}


operate(operation){ // + * / -
if(this.recentoperand === "") return
if(this.prevoperand !== ""){
    this.calculate() // calculate even when theres already a calculation pending
}
this.operation = operation
this.prevoperand = this.recentoperand
this.recentoperand = ''
}

calculate(){// calculatyes the math and creates 1 value
let result;
// parseFloat (turn to numbers to calculate)
const prev = parseFloat(this.prevoperand)
const recent = parseFloat(this.recentoperand)

if(isNaN(prev) || isNaN(recent)) return

//switvh for more if statements
switch(this.operation){
    case "+":
        result = prev + recent
        break 
    case "-":
        result = prev - recent
        break 
    case "÷":
        result = prev / recent
        break 
    case "x":
        result = prev * recent
        break
    default: return
}

this.recentoperand = result
this.operation = undefined
this.prevoperand = ""
}

numberDisplay(number){ // number is a string:
    const stringn = number.toString()
    const integerDig = parseFloat(stringn.split(".")[0])
    const decimalDig = stringn.split(".")[1]
    let integerDisplay
    
    if(isNaN(integerDig)) {
        integerDisplay = ""
    }else{
        integerDisplay = integerDig.toLocaleString("en", {maximumFractionDigits: 0})
    }

    if(decimalDig != null){
        return `${integerDisplay}.${decimalDig}`
    }else{
        return integerDisplay
    }
}


updateUi (){ //updates the display
this.recentCalculation.innerText = this.numberDisplay(this.recentoperand)
if(this.operation != null){
    this.prevCalculation.innerText = `${this.numberDisplay(this.prevoperand)} ${this.operation}`
}else{
    this.prevCalculation.innerText = ""
}
}

}


//DOM
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-ac]");
const prevCalculation = document.querySelector("[data-prev-calc]");
const recentCalculation = document.querySelector("[data-recent-calc]");


const calculator = new Calcolatrice(prevCalculation, recentCalculation)

numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateUi()
    })})



operations.forEach(btn => {
        btn.addEventListener("click", () => {
            calculator.operate(btn.innerText)
            calculator.updateUi()
        })})



equals.addEventListener("click", btn => {
    calculator.calculate()
    calculator.updateUi()
} )


allClear.addEventListener("click", btn => {
    calculator.clear()
    calculator.updateUi()
})

deleteBtn.addEventListener("click", btn => {
    calculator.delete()
    calculator.updateUi()
})
