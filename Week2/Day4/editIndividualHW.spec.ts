import {test,expect} from '@playwright/test'
// Test case to edit an existing Individual in Salesforce
test('To edit individual assignment',async({page})=>{
    await page.goto('https://login.salesforce.com')
    await page.locator('#username').fill('dilipkumar.rajendran@testleaf.com')
    await page.locator('[value="Log In"]').click()
    await page.locator('#password').fill('TestLeaf@2025')
    await page.locator('input[class="button r4 wide primary"][id="Login"]').click()
    await page.locator('[class="slds-icon-waffle"]').click()
    await page.locator('[aria-label="View All Applications"]').click()
    // Select the Individuals application
    await page.locator('[data-label="Individuals"]').click()
    // Click the Individuals tab
    await page.locator('//span[text()="Individuals"]').click()
    await page.locator('[aria-label="Search this list..."]').fill('RN')
    // Press Enter to perform the search
    await page.locator('input[placeholder="Search this list..."]').press("Enter")
    // Wait for the search results to load
    await page.waitForTimeout(2000); 
    await page.locator("//span[text()='Show Actions']").click()
    await page.locator('//a[@title="Edit"]').click()
    // Locate the Salutation dropdown
    const salutationDropdown = page.locator('a.select[role="button"], button[aria-label^="Salutation"]').first();
    // Open the Salutation dropdown
    await salutationDropdown.click();
    // Select Mr. from the Salutation dropdown
    await page.locator('a[title="Mr."], lightning-base-combobox-item[data-value="Mr."]').click();
    await page.locator('[placeholder="First Name"]').fill('Preetha')
    await page.locator('//span[text()="Save"]').click()
    // Verify that the updated first name is visible
    await expect(page.getByTitle("Preetha")).toBeVisible();
})