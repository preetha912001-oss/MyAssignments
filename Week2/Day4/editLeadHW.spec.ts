import {test} from '@playwright/test'
// Test case to create and edit a Lead
test('To edit lead',async({page})=>{
    await page.goto('https://leaftaps.com/opentaps/control/main')
    await page.locator("#username").fill('democsr2')
    await page.locator("[id='password']").fill('crmsfa')
    await page.locator(".decorativeSubmit").click()
    await page.locator("text=CRM/SFA").click()
    // Click on the Leads link
    await page.locator("a[href='/crmsfa/control/leadsMain']").click()
    // Click on Create Lead
    await page.locator('[class="shortcuts"]>li').nth(1).click()
    await page.locator('[id="createLeadForm_companyName"][name="companyName"]').fill('Testleaf')
    await page.locator('#createLeadForm_firstName').fill('Preetha')
    await page.locator('input#createLeadForm_lastName').fill('L')
    // Click the Create Lead button
    await page.locator('td .smallSubmit').click()
    // Click the Edit link to edit the created Lead
    await page.locator('//a[text()="Edit"]').click()
    await page.locator('//input[@id="updateLeadForm_companyName"]').fill('RM')
    // Click the Update button to save the changes
    await page.locator('input[value="Update"]').click()
})