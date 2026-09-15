import {test} from '@playwright/test'
// Test case to create a new Lead in Salesforce
test('To create new laed',async({page})=>{
    await page.goto('https://login.salesforce.com')
    await page.locator('#username').fill('dilipkumar.rajendran@testleaf.com')
    await page.locator('[id="Login"]').click()
    await page.locator('#password').fill('TestLeaf@2025')
    await page.locator('[id="Login"]').click()
    // Click the App Launcher (waffle icon)
    await page.locator('[class="slds-icon-waffle"]').click()
    // Click View All Applications
    await page.locator('[aria-label="View All Applications"]').click()
    // Select the Sales application
    await page.locator('//one-app-launcher-app-tile[@data-name="Sales"]').click()
    await page.locator('//a[@title="Leads"]').click()
    await page.locator('//div[text()="New"]').click()
    // Open the Salutation dropdown
    await page.locator('button[aria-label="Salutation"]').click()
    // Select Mrs. from the Salutation dropdown
    await page.locator('//lightning-base-combobox-item[@data-value="Mrs."]').click()
    await page.locator('//input[contains(@name,"lastNam")]').fill('preetha_test1')
    await page.locator('[name="Company"]').fill('testleaf') 
    // Click Save button
    await page.locator('records-form-footer runtime_platform_actions-actions-ribbon ul>li').nth(2).click() 
})