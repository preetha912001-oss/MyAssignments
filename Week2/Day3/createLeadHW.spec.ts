import {test} from '@playwright/test'

test("To create a lead using CSS selectors", async({page})=>{
    await page.goto("http://leaftaps.com/opentaps/control/main")
    await page.locator("#username").fill('democsr2')
    await page.locator("#password").fill('crmsfa')
    await page.locator(".decorativeSubmit").click()
    await page.locator("text=CRM/SFA").click()
    //leads tab
    
    //   await page.locator("#ext-gen508").click()
    // await page.locator("a[id='ext-gen521']").click()
    // await page.getByRole('link', { name: 'Leads' }).click();
    await page.locator("a[href='/crmsfa/control/leadsMain']").click()
    await page.locator("a[href='/crmsfa/control/createLeadForm']").click()

    await page.locator("#createLeadForm_companyName").fill("RM")
    await page.locator("[id='createLeadForm_firstName']").fill("preetha")
    await page.locator("input[id='createLeadForm_lastName']").fill("R N")
    await page.locator("#createLeadForm_personalTitle").fill("Mrs")
    await page.locator('#createLeadForm_generalProfTitle').fill("Software Engineer")
    await page.locator("#createLeadForm_annualRevenue").fill("₹5,000,000")
    await page.locator("#createLeadForm_departmentName").fill("IT")

    const sourceDropdown = page.locator("select[name='dataSourceId']")
    const options = await sourceDropdown.locator("option").all();
    for(let i=0;i< options.length;i++){
        console.log(await options[i].innerText())
    }
    await page.locator("[id='createLeadForm_primaryPhoneNumber']").fill("9745342356")
    await page.locator(".smallSubmit").click()
})
