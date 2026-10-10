import {Page,Locator} from '@playwright/test'
//hierarchical inheritance
export abstract class Wrapper{
    //use in all child class 
    page:Page
    // Constructor receives the Playwright page from the test
    constructor(sfpage:Page){
        this.page = sfpage
    }
    //we will use login for all module(lead,account)
    async loadUrl(url:string):Promise<void>{
        try{
            await this.page.goto(url)
            console.log('Logged In Successfully')
        }
        catch(err){
            throw new Error('Logged In Failed')
        }
    }
    //take locator(id,class..) and data(name,company name..)- clear text and fill 
    async clearAndFill(locator:Locator,data:string){
        await locator.clear()
        await locator.fill(data)
    }
    async clickAction(locator:Locator){
        await locator.click()
    }
}   