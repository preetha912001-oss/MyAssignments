//Super class
class BasePage{
    findElement(){
        console.log("Finding the element")
    }
    clickElement(){
        console.log("Clicking the element")
    }
    enterText(){
        console.log("Entering text")
    }
    performCommonTasks(){
        console.log("Performing common tasks");
    }
}
//Sub class
class LoginPage extends BasePage{
    //override the superclass method
    performCommonTasks(){
        console.log("Performing login page tasks");
    }
}

//Super class methods
let firstClass = new BasePage()
firstClass.findElement()
firstClass.clickElement()
firstClass.enterText()
firstClass.performCommonTasks()

//Sub class methods
let secondClass = new LoginPage()
secondClass.findElement()
secondClass.clickElement()
secondClass.enterText()
secondClass.performCommonTasks()