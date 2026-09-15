import {test} from '@playwright/test'
// Test case to create a new Individual in Salesforce
test('To create individual assignment',async({page})=>{
    await page.goto('https://login.salesforce.com')
    await page.locator('#username').fill('dilipkumar.rajendran@testleaf.com')
    await page.locator('[value="Log In"]').click()
    await page.locator('#password').fill('TestLeaf@2025')
    // Click the Login button
    await page.locator('input[class="button r4 wide primary"][id="Login"]').click()
    await page.locator('[class="slds-icon-waffle"]').click()
    await page.locator('[aria-label="View All Applications"]').click()
    await page.locator('[data-label="Individuals"]').click()
    // Locate the Individuals navigation tab
    const individual = page.locator('one-app-nav-bar-item-root').filter({ has: page.locator('a[title="Individuals"]') })
    // Locate the dropdown menu for the Individuals tab
    const dropdown = individual.locator('one-app-nav-bar-item-dropdown one-app-nav-bar-menu-button')
    // Click the dropdown button
    await dropdown.locator('a[role="button"]').click()
    // Click New Individual
    await page.locator('[href="/0PK/e?sObjectName=Individual&save_new_url=%2F0PK%2Fe&navigationLocation=LIST_VIEW"]').click()
    await page.locator('label~input[placeholder="Last Name"]').fill('Laju')
    // Click Save to create the Individual
    await page.locator('//span[text()="Save"]').click()
})