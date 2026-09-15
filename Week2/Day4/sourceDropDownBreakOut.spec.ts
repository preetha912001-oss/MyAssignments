import {test} from '@playwright/test'
test("To print the sources dropdown", async({page})=>{
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill('democsr2')
    await page.locator("#password").fill('crmsfa')
    await page.locator(".decorativeSubmit").click()
    await page.locator("text=CRM/SFA").click()
    await page.locator("a[href='/crmsfa/control/leadsMain']").click()
    await page.locator("a[href='/crmsfa/control/createLeadForm']").click()
    let sourceDropdown = page.locator("[id='createLeadForm_dataSourceId']>option")
    let optionCount = await sourceDropdown.count()
    for(let i=0;i< optionCount;i++){
        let result = await sourceDropdown.nth(i).innerText()
        console.log(result)
    }
})