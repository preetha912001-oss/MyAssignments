// create abstract class 
// fill() -> implement
// clear()->implement
// locator()-> unimplement
// frame() -> unimplement

// create another concrete class 
// -> implement methods
// -> create object and call the methods

abstract class Playwright{
    //implemented method
    fill(){
        console.log('Its an implemented method fill abstract class')
    }
    //implemented method
    clear(){
        console.log('Its an implemented method clear from abstract class')
    }
    //unimplemented method
    abstract locator():void
    //unimplemented method
    abstract frame():void
}
class applyPlaywright extends Playwright{
    locator(): void {
        console.log('abstract method locator implemented inside concrete class')
    }
    frame(): void {
        console.log('abstract method frame implemented inside concrete class')
    }
    ownMethod(){
        console.log('Own Concrete class mathod')
    }
}
let output = new applyPlaywright()
output.locator()
output.clear()
output.ownMethod()