import {test,expect} from '@playwright/test'
// Use saved Salesforce login session
test.use({
    storageState:'Data/marathonSFLogin.json'
})
test('Create and verify a New Case in Chatter',async({page})=>{
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.getByRole('button',{name:'App Launcher'}).click()
    await page.getByRole('button',{name:'View All Applications'}).click()
    // Search for Service application
    let searchService = page.getByRole('combobox',{name:'Search apps or items...'})
    await searchService.fill('Service')
    // Select Service application
    await page.locator('//div[@data-name="Service"]').click()
    await page.getByRole('link',{name:'Cases'}).click()
    await page.getByRole('button',{name:'New'}).click()
    await page.getByRole('combobox',{name:'Contact Name'}).click()
    await page.getByRole('option',{name:'Add New Contact'}).click()
    await page.getByRole('combobox',{name:'Salutation'}).click()
    await page.locator('[data-value="Mr."]').click()
    await page.getByRole('textbox',{name:'First Name'}).fill('Ram')
    await page.getByRole('textbox',{name:'Last Name'}).fill('N')
    await page.locator('button[name="SaveEdit"]').nth(1).click()
    // Verify Contact was created
    await expect(page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Contact' })).toContainText('was created')
    await page.getByRole('combobox',{name:'Account Name'}).click()
    await page.getByText('New Account').click()
    await page.getByRole('textbox',{name:'Account Name'}).fill('Ram')
    await page.getByRole('textbox',{name:'Account Number'}).fill('10012345235')
    await page.getByRole('combobox',{name:'Rating'}).click()
    await page.locator('[data-value="Hot"]').click()
    await page.locator('button[name="SaveEdit"]').nth(1).click()
    // Verify Account was created
    await expect(page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Account' })).toContainText('was created')
    await page.getByRole('combobox',{name:'Status'}).click()
    await page.locator('//div[@aria-label="Status"]//lightning-base-combobox-item[@data-value="New"]').click()
    await page.getByRole('combobox',{name:'Priority'}).click()
    await page.locator('[data-value="High"]').click()
    await page.getByRole('combobox',{name:'Case Origin'}).click()
    await page.locator('[data-value="Email"]').click()
    await page.getByRole('textbox',{name:'Subject'}).fill('Product Return Request')
    await page.getByRole('textbox',{name:'Description'}).fill('Requesting a return for a defective product')
    await page.locator('button[name="SaveEdit"]').click()
    // Verify Case was created
    await expect(page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Case' })).toContainText('was created')
    // Edit Case Status
    await page.getByRole('button',{name:'Edit Status'}).click()
    await page.getByRole('combobox',{name:'Status'}).click()
    await page.locator('[data-value="Escalated"]').click()
    // Save updated Status
    await page.locator('button[name="SaveEdit"]').click()
    // Open Chatter update box
    await page.getByRole('button',{name:"Share an update..."}).click()
    // Enter Chatter post
    await page.locator('//div[@data-placeholder="Share an update..."]//p').fill('Chatter is created');
    // Share the Chatter post
    await page.getByRole('button',{name:"Share"}).click()
    // Verify Chatter post is visible
    await expect(page.getByText('Chatter is created')).toBeVisible();
    // Find the specific Chatter post
    const post = page.locator('article[data-type="TextPost"]').filter({ hasText: 'Chatter is created' });
    // Open post actions
    await post.getByText('Actions for this Feed Item').click();
    // Like the Chatter post
    await page.getByTitle("Like on Chatter").click()
     // Verify post was liked
    await expect(page.getByText('Post was liked.')).toHaveText('Post was liked.')
     // Open Chatter page
    await page.getByRole('link',{name:'Chatter'}).click()
    // Verify the post is liked
    await expect(page.locator('[title="Unlike"]').first()).toHaveText('Liked')
})