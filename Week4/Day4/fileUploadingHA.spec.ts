import {test,expect} from '@playwright/test'
// This avoids logging in and entering the verification code again
test.use(
    {
        storageState:'Data/salesForceLogin.json'
    }
)
test('To create new laed',async({page})=>{
    // Navigate to the Salesforce application
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.getByRole('button',{name:'App Launcher'}).click()
    await page.getByRole('button',{name:'View All Applications'}).click()
    await page.getByRole('combobox',{name:'Search apps or items...'}).fill('Accounts')
    await page.locator('a[data-label="Accounts"]').click()
    await page.locator('a[title="New"]').click()
    await page.getByRole('textbox',{name:'Account Name'}).fill('File Upload')
    await page.getByRole('combobox',{name:'Rating'}).click()
    await page.locator('span[title="Warm"]').click()
    await page.getByRole('combobox',{name:'Type'}).click()
    await page.locator('span[title="Prospect"]').click()
    await page.getByRole('combobox',{name:'Industry'}).click()
    await page.locator('span[title="Banking"]').click()
    await page.getByRole('combobox',{name:'Ownership'}).click()
    await page.locator('span[title="Public"]').click()
    await page.locator('button[name="SaveEdit"]').click()
    // Locate the success notification message
    const popMsg = page.locator('span[data-aura-class="forceActionsText"]')
    // Verify that the Account was successfully created
    await expect(popMsg).toContainText('was created')
    // Wait for the file chooser event before clicking Upload Files
    const eventTrigger = page.waitForEvent('filechooser')
    await page.locator('a[title="Upload Files"]').click()
    // Capture the file chooser
    const uploadFile = await eventTrigger
    // Upload the file from the Data folder
    await uploadFile.setFiles('Data/PW setup scrnshott.png')
    await page.getByRole('button',{name:'Done'}).click()
    // Verify that the uploaded file is displayed
    await expect(page.locator('span[data-aura-class="uiOutputText"]').first()).toHaveText('PW setup scrnshott')
})  
