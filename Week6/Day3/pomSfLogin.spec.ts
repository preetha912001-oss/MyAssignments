import {test} from '@playwright/test'
test('Salesforce Login',async({page})=>{
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.getByRole('textbox',{name:'Username'}).fill('preetha912001.25de7ddfd104@agentforce.com')
    await page.locator('#Login').click()
    await page.getByRole('textbox',{name:'Password'}).fill('09@2001janpr')
    await page.getByRole('button',{name:'Log In'}).click()
    // Complete the email verification manually
    await page.pause();
    await page.context().storageState({path:'Data/pomSFLogin.json'})
})