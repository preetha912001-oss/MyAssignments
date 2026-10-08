import { HomePage } from "./home";
export class AccountPage extends HomePage {
async clickonCreateAccountButton(){
    await this.page.locator('//a[text()="Create Account"]').click()
}
}