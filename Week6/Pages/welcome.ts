import { LoginPage } from "./login";
export class WelcomePage extends LoginPage{
async clickonCRMSFA(){
    await this.page.locator('text=CRM/SFA').click()
}
async logout(){
    await this.page.locator('.decorativeSubmit').click()
}
}