//Method Overloading
class TextBox{
    fill(text: string):void
    fill(text: string, locator: string):void
    fill(text: string, locator?: string):void{
    if(locator){
        console.log(`This is the locator ${locator} for text,${text}`);
    }else{
        console.log("Recevied your name",text);
    }
    }
}
let input = new TextBox()
//input.fill('Preetha')
input.fill('Preetha','.username')