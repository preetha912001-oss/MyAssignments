import {test,expect} from '@playwright/test'
//Playwright Input & Assertion Practice
test('Input and Assertion',async({page})=>{
    // Navigating to the Page
    await page.goto('https://leafground.com/input.xhtml')
    //Validating a Disabled Textbox
    const textBox = page.locator('//input[@placeholder="Disabled"]')
    await expect(textBox).toBeDisabled()
    //Validating an Enabled Textbox
    const enabledTextbox = page.locator('//h5[text()="Type your name"]/following-sibling::div/div/input[@placeholder="Babu Manickam"]')
    await expect(enabledTextbox).toBeEditable()
    enabledTextbox.fill('Preetha')
    //Soft Assertion Practice
    const softAssert = page.locator('//input[@value="Chennai"]')
    await expect.soft(softAssert).toBeDisabled()
    // Fill Data
    //Clearing the existing text using fill()
    let fillData = page.locator('//input[@value="Can you clear me, please?"]')
    await fillData.fill('')
    await page.waitForTimeout(1000); 
    //Entering a new value 
    await fillData.fill('Playwright Learning')
})  