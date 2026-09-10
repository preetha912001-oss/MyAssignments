//Launch RedBus in Edge and Flipkart in WebKit
import {test} from '@playwright/test'
test("To launch Salesforce", async({page})=>{
   await page.goto("https://login.salesforce.com/?locale=in");
   await page.locator('#username').fill('dilipkumar.rajendran@testleaf.com')
   await page.locator('[id="Login"]').click()
   await page.locator('#password').fill('TestLeaf@2025')
   await page.locator('[id="Login"]').click()
   console.log(await page.title())
   console.log(page.url())
})