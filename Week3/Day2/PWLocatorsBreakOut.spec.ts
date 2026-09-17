import {test} from '@playwright/test'
test('PW Locators',async({page})=>{
    await page.goto('https://leaftaps.com/opentaps/control/main')
    await page.getByRole('textbox',{name:"USERNAME"}).fill('democsr2')
    await page.getByLabel('Password').fill('crmsfa')
    await page.getByRole('button').click()
    await page.getByText('CRM/SFA').click()
})