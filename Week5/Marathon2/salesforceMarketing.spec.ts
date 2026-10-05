import {test,expect} from '@playwright/test'
// Use saved Salesforce login session
test.use({
    storageState:'Data/marathonSFLogin.json'
})
test('Verify Lead Creation and Conversion to Opportunity',async({page})=>{
    // Navigate to the Salesforce application
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.getByRole('button',{name:'App Launcher'}).click()
    await page.getByRole('button',{name:'View All Applications'}).click()
    // Search for Marketing application
    let searchMarketing = page.getByRole('combobox',{name:'Search apps or items...'})
    await searchMarketing.fill('Marketing')
     // Select Marketing CRM Classic
    await page.locator('//div[@data-name="Marketing CRM Classic"]').click()
    await page.getByRole('link',{name:'Leads'}).click()
    await page.getByRole('button',{name:'New'}).click()
    await page.getByRole('combobox',{name:'Salutation'}).click()
    await page.locator('[data-value="Ms."]').click()
    await page.getByRole('textbox',{name:'First Name'}).fill('Preetha')
    await page.getByRole('textbox',{name:'Last Name'}).fill('R')
    await page.getByRole('textbox',{name:'Company'}).fill('RM EDU')
    await page.locator('button[name="SaveEdit"]').click()
    // Verify Lead was created
    await expect(page.locator('[data-aura-class="forceActionsText"]')).toContainText('was created')
    await page.getByRole('button',{name:'Show more actions'}).click()
    await page.locator('[title="Convert"]').click()
    // Expand Opportunity section
    await page.locator('//fieldset[legend[text()="Opportunity"]]//div[contains(@class,"createPanelCollapsed")]//button').click();
    await page.getByRole('textbox',{name:'Opportunity Name'}).fill('QA');
    await page.getByRole('button',{name:'Convert'}).click()
    // Go back to Leads
    await page.locator("//button[normalize-space()='Go to Leads']").click()
    // search for the created lead 
    await page.getByRole('button', { name: "Search" }).click()
    await page.getByRole('combobox', { name: 'Search by object type' }).click()
    const leadsOption = page.locator('//div[@aria-label="Search by object type"]/ul[@aria-label="Suggested For You"]/li').filter({ hasText: 'Leads' })
    await leadsOption.scrollIntoViewIfNeeded()
    await leadsOption.click()
    // Search for Lead by name
    const searchLead = page.getByRole('searchbox', { name: "Search Leads" })
    await searchLead.fill('Preetha R')
    await searchLead.press('Enter')
    // Verify Lead no longer exists after conversion
    await expect(page.getByText('No results')).toBeVisible();
    // Open Opportunities
    await page.locator('//a[@title="Opportunities"]/span[text()="Opportunities"]').click()
    // Search for the created Opportunity
    const searchOpportunity = page.getByPlaceholder("Search this list...")
    await searchOpportunity.fill('QA')
    await searchOpportunity.press('Enter')
    // Open the exact Opportunity
    await page.locator('//th[@data-label="Opportunity Name"]//a').filter({hasText:'QA'}).first().click()
    // Verify Opportunity title
    const title = page.locator('[slot="primaryField"]').nth(1)
    await expect(title).toBeVisible()
    const titleText = await title.innerText();
    console.log(titleText);
})