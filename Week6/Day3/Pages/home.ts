import { WelcomePage } from "./welcome";
export class HomePage extends WelcomePage{
    async clickonAccountsButton(){
        await this.page.locator('//a[text()="Accounts"]').click()
    }
}