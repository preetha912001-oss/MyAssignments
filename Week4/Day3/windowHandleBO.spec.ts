 import {test} from '@playwright/test'
 test('To handle window',async({page,context})=>{
    //launch browser and open main page
    await page.goto('https://www.leafground.com/window.xhtml')
    //create event listener for new window
    let pagePromise = context.waitForEvent('page')
    //locate and click the button
    await page.locator('[class="ui-button-text ui-c"]').nth(0).click()
    //store the newpage
    const childPage = await pagePromise
    //interact with child page
    await childPage.locator('//input[@id="email"]').fill("Preeth@gmail.com")
    await childPage.locator('[id="message"]').fill("Hello World")
    //child page title
    const childPageTitle = await page.title()
    console.log('Child Page Title',childPageTitle)
    //bring main page to front
    await page.bringToFront()
    const mainPageTitle = await childPage.title()
    console.log('Main Page Title',mainPageTitle)
 })
