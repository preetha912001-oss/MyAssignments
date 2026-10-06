//Super Class
class WebComponent{
    selector:string
    constructor(selector:string){
        this.selector = selector
    }
    click():void{
        console.log(`Clicking the selector ${this.selector}`)
    }
    focus():void{
        console.log(`Focusing the selector ${this.selector}`)
    }
}
//Sub class1
class Button extends WebComponent{
    click():void{
        console.log('Button click')
        super.click()
    }
}
//Sub class2
class TextInput extends WebComponent{
    value:string=""
    enterText(text: string):void{
        this.value = text
        console.log(`The text ${text} is entered into ${this.selector}`)
    }
}
let testComponents = ():void=>{
    let buttonClass = new Button('#submitLogin')
    let textInput = new TextInput('#textBox')
    buttonClass.click()
    textInput.enterText('Preetha')
}
testComponents()