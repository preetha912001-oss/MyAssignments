import {Page} from "@playwright/test"
export class LoginPage{
    page:Page
    // Constructor receives the Playwright page from the test
    constructor(lpage:Page){
        this.page=lpage
    }
    // Navigate to the given URL
    async loadUrl(url:string){
        await this.page.goto(url)
    }
}                                            