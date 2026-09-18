//fibonacci function
function fibonacciFunc(n:number):number{
    //explicit inference
    let firstNum: number = 0
    //implicit inference
    let secondNum = 1
    // Start from position 2
    for(let i=2; i <=n ; i++)
    {
        // Add previous two numbers
        let result : number = firstNum + secondNum
        firstNum = secondNum
        secondNum = result
    }
    // Return Fibonacci value
    return secondNum
}
// Function call for 3
console.log(fibonacciFunc(3))
// Function call for 5
console.log(fibonacciFunc(5))
// Function call for 13
let funcCall2 = fibonacciFunc(13)
console.log(funcCall2)
// Function call for 9
console.log(fibonacciFunc(9))
// Function call for 11
console.log(fibonacciFunc(11))