import {test} from '@playwright/test'
// Test case to create a new Lead in Salesforce
test('To create new laed',async({page})=>{
    await page.goto('https://login.salesforce.com')
    //parent to child 
    await page.locator('//div[@id="username_container"]/input[@id="username"]').fill('dilipkumar.rajendran@testleaf.com')
    //elder to younger
    await page.locator('//div[@id="usernamegroup"]/following-sibling::input[@id="Login"]').click()
    //grandparent to grand child
    await page.locator('//div[@id="theloginform"]//input[@id="password"]').fill('TestLeaf@2025')
    //basic attribute based xpath
    await page.locator('//input[@id="Login"]').click()
})