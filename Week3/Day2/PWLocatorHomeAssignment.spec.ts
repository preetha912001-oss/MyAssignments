import {test} from '@playwright/test'
test('Playwright Locator',async({page})=>{
    await page.goto('http://leaftaps.com/opentaps/control/main')
    //Using playwright locators
    await page.getByLabel('Username').fill('democsr2')
    await page.getByRole('textbox',{name:'PASSWORD'}).fill('crmsfa')
    await page.getByRole('button').click()
    await page.getByText('CRM/SFA').click()
    await page.getByRole('link', { name: 'Leads' }).click();
    await page.getByRole('link', { name: 'Create Lead' }).click()
    //using xpath and css locators
    await page.locator('//span[text()="Company Name"]/following::input[@id="createLeadForm_companyName"]').fill('RM')    //Elder cousin to Younger Cousin
    await page.locator('[id="createLeadForm_firstName"]').fill('Preetha')
    await page.locator('input[name="lastName"][id="createLeadForm_lastName"]').fill('R')        //Using multiple attributes
    await page.locator('#createLeadForm_personalTitle').fill('Mrs')
    await page.locator('//input[@name="generalProfTitle"]').fill('Software Engineer')
    await page.locator('//input[contains(@name, "annualRev")]').fill('400000')                  //partial attribute based
    await page.locator('[name="departmentName"]').fill('IT')
    await page.locator('#createLeadForm_primaryPhoneNumber').fill('8976542823')
    await page.locator('//input[contains(@value,"Create Lea")]').click()
})