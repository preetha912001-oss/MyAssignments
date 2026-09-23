import {test,expect} from '@playwright/test'
test('Automating Alert & Frame Interactions',async({page})=>{ 
    page.on('dialog',async(dialog)=>{
        const alertMsg = dialog.message()
        console.log(alertMsg)
        const alertType = dialog.type()
        console.log(alertType)
        if(alertType==='confirm')
        await dialog.accept()
    })
    await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm')
    // Locate the iframe using frameLocator
    const iframeLocator = page.frameLocator('[name="iframeResult"]')
    await iframeLocator.locator('button').click() 
    //Retrieving the text after click action
    const afterClick = await iframeLocator.locator('#demo').innerText()
    console.log('after click',afterClick);
    // Retry assertion
    await expect(iframeLocator.locator('#demo')).toHaveText('You pressed OK!')
    // Non-retry assertion
    expect(afterClick).toBe("You pressed OK!")
})