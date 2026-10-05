class Calculation{
//public property
value1:number = 4
//private property
private value2:number = 5
//protected property
protected value3: number = 4
//public method 
add(){
    return this.value1 + this.value2
}
//private method 
private sub(){
    return this.value2 - this.value3
}
get subOutside(){
    return this.sub()
}
//protected method 
protected mul(){
    return this.value3 * this.value1
}
}
class childCal extends Calculation{
    get mulInsideChildClass(){
        return this.mul()
    }
}
let result = new Calculation()
console.log(result.add())
console.log(result.subOutside)
let result2 = new childCal()
console.log(result2.mulInsideChildClass)