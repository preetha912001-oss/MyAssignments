import {test} from '@playwright/test'
import Login from '../../../utils/loginDP.json'
test('Login Data parameterization',async({page})=>{
    await page.goto('https://login.salesforce.com')
    await page.getByRole('textbox',{name:'Username'}).fill(Login.username)
    await page.locator('#Login').click()
    await page.getByRole('textbox',{name:'Password'}).fill(Login.password)
    await page.getByRole('button',{name:'Log In'}).click()
})