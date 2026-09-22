import {test,expect} from '@playwright/test'
test('Automating JavaScript Prompt Dialog',async({page})=>{  
    // Value that will be entered into the prompt
    const acceptInput = 'Playwright'
    // Listen for the dialog and accept it with the given value
    page.once('dialog',async(dialog)=>{
    await dialog.accept(acceptInput)
    })
    await page.goto('https://www.leafground.com/alert.xhtml')
    // Locate the Show button for the Prompt Dialog
    const clickShow =  page.locator("//span[text()='Show']").nth(4)
    await clickShow.click()
    // Verifying that the entered value is displayed in the result
    await expect(page.locator("#confirm_result")).toContainText(acceptInput)
})



