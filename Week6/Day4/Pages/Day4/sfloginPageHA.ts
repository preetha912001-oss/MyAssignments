import { Wrapper } from "../../helper/pwWrapper";
export class SfLogin extends Wrapper{
    async loadSfUrl(url:string){
        await this.loadUrl(url)
    }
    async loginCredentials(username:string,password:string){
        await this.clearAndFill(this.page.getByRole('textbox',{name:'Username'}),username)
        await this.clickLogin()
        await this.clearAndFill(this.page.getByRole('textbox',{name:'Password'}),password)
    }
    async clickLogin(){
        await this.clickAction(this.page.locator('#Login'))
    }
}