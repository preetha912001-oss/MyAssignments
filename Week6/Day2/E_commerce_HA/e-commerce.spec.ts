import {test} from '@playwright/test'
import {Pagelogin} from './loginPage'

test('E-commerce automation testing',async()=>{
    let loginPage = new Pagelogin()
    loginPage.waitForPageLoad()
    loginPage.verifyPage();
    loginPage.enterUsername();
    loginPage.enterPassword();
    loginPage.clickLogin();
    loginPage.getPageTitle();
})