import {test} from "@playwright/test"
import { ViewAccount } from "../../../Pages/viewAccountPage"

test('Create Account using POM',async ({page}) => {

//create object for view Account page

let vp=new ViewAccount(page)
await vp.loadUrl("https://leaftaps.com/opentaps/control/main")
await vp.loginCredentials("democsr2","crmsfa")
await vp.clickonLogin()
await vp.clickonCRMSFA()
await vp.clickonAccountsButton()
await vp.clickonCreateAccountButton()
await vp.enterManditoryFields()
await vp.clickonCreateAccountSubmitButton()
await vp.verifyAccount()
})