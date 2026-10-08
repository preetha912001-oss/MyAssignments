import {Page} from "@playwright/test"
export class LoginPage{
    page:Page
    constructor(tpage:Page){
        this.page=tpage
    }
    async loadUrl(url:string){
        await this.page.goto(url)
    }
    async loginCredentials(username:string,password:string){
        await this.page.locator('#username').fill(username)
        await this.page.locator('#password').fill(password)
    }
    async clickonLogin(){
        await this.page.locator('.decorativeSubmit').click()
    }
}