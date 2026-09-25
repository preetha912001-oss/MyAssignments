import {test,expect} from '@playwright/test'
test('Window Handling',async({page,context})=>{
    // Navigate to the application
    await page.goto('http://leaftaps.com/opentaps/control/main')
    await page.locator('[id="username"]').fill('Demosalesmanager')
    await page.locator('#password').fill('crmsfa')
    await page.getByRole('button',{name:'Login'}).click()
    await page.locator('text="CRM/SFA"').click()
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByText('Merge Leads',{exact:true}).click()
    //Window handling
    // Sequential way of handling a new window
    const firstPromise = context.waitForEvent('page')     //returns a promise
    // Click the first Lookup button which opens a new window
    await page.getByAltText('Lookup', { exact: true }).first().click();
    // Wait for the new window to open
    // await resolves the Promise and gives the new Page object
    const promiseResult = await firstPromise;
    // In the new window: Find the first row → first link and click it
    await promiseResult.locator('div.x-grid3-row').nth(0).locator('a.linktext').first().click();
    //Too handle concurrent window
    // Handle the second new window using Promise.all()
    const [secondPage] = await Promise.all([
        // Wait for the second window
        context.waitForEvent('page'),
        // Click the second Lookup button
        page.getByAltText('Lookup', { exact: true }).nth(1).click()
    ]);
    await secondPage.locator('div.x-grid3-row').nth(1).locator('a.linktext').nth(0).click();
    //Create a dialog listener before clicking Merge
    page.on('dialog',async(confirmDialog)=>{
        console.log(confirmDialog.message())
        const alertType = confirmDialog.type()
        console.log(alertType)
        await confirmDialog.accept()
    })
    await page.locator('[class="buttonDangerous"]').click()
    await expect(page).toHaveTitle('View Lead | opentaps CRM');
})