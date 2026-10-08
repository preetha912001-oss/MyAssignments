import { AccountPage } from "./account";
export class CreateAccountPage extends AccountPage{
async enterManditoryFields(){
    await this.page.locator('#accountName').fill('Anupk')
}
async clickonCreateAccountSubmitButton(){
    await this.page.locator('.smallSubmit').click()
}
}