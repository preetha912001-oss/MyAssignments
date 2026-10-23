import {test,expect, Page} from '@playwright/test'
// Use saved Salesforce login session
test.use({
    storageState:'Data/marathon3SFLogin.json'
})
let accessToken: string;
let tokenType: string;
let instanceUrl: string;
let headers_crud: any;
let lead_Id: string;
let lastName:string='Swetha';
//Search Function
async function searchLead(page:Page, lastName:string) {
    // Search for the lead option
    await page.getByRole('button', { name: "Search" }).click()
    await page.getByRole('combobox', { name: 'Search by object type' }).click()
    const leadsOption = page.locator('//div[@aria-label="Search by object type"]/ul[@aria-label="Suggested For You"]/li').filter({ hasText: 'Leads' })
    await leadsOption.scrollIntoViewIfNeeded()
    await leadsOption.click()
    // Search for Lead by Last name
    const searchLead = page.getByRole('searchbox', { name: "Search Leads" })
    await searchLead.fill(lastName)
    await searchLead.press('Enter')
}
test('To create a New Lead',async({page,request})=>{ 
    // To create Lead via Postman
    // Generate OAuth access token using POST request
    let responseBody = await request.post('https://orgfarm-b5ee75a3ba-dev-ed.develop.my.salesforce.com/services/oauth2/token',{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:{
            "grant_type": 'client_credentials',
            "client_id": '3MVG9XgkMlifdwVB7e4j4aYJ4mVBmpqgQsCcWuv2JpoLd5k8RMEYryeuF_jQ0631EDniTx1OBNYi3_VYxYg05',
            "client_secret": '48A14658ED52432EC847CBD17FA4BF168DFEE7C05304018BD62F60AC7DBE349F'
        }
    })
    //Deserialization -> converting json into object
    // Store the access token, token type, and instance URL from the token response
    let tokenData = await responseBody.json()
    expect(responseBody.status()).toBe(200)
    accessToken = tokenData.access_token
    tokenType = tokenData.token_type
    console.log('Token Type:', tokenType)
    instanceUrl = tokenData.instance_url
    console.log('Instance URL:', instanceUrl)
    // Create common headers using the generated access token
    headers_crud = {
        headers:{
            "Authorization": `${tokenType} ${accessToken}`,
            'Content-Type': 'application/json'
        }
    }
    // Create Lead using POST request
    let createLead = await request.post(`${instanceUrl}/services/data/v68.0/sobjects/Lead`,{
        headers: headers_crud.headers,
        data: {
            "Salutation": "Mr.",
            "LastName": `${lastName}`,
            "Company": "ABC Corp",
        }
    })
    expect(createLead.status()).toBe(201)
    let leadData = await createLead.json()
    console.log('Lead Data:', leadData)
    lead_Id = leadData.id;
    console.log('Lead ID:', lead_Id);
    // Update the created Lead using PATCH request
    let updateLead = await request.patch(`${instanceUrl}/services/data/v68.0/sobjects/Lead/${lead_Id}`,
        {
            headers: headers_crud.headers,
            data: {
                "FirstName": 'R',
            }
        }
    );
    expect(updateLead.status()).toBe(204);
    //Delete the Created Lead through UI
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    await page.getByRole('button',{name:'App Launcher'}).click()
    await page.getByRole('button',{name:'View All Applications'}).click()
    //Navigate to Dashboards
    const searchLeads= page.getByRole('combobox',{name:'Search apps or items...'})
    await searchLeads.fill('Leads')
    await searchLeads.press('Enter')
    //Click Leads
    await page.locator('a[data-label="Leads"]').click()
    //Calling the Search function to search the created lead
    await searchLead(page,lastName)
    //Locate the exact lead created through API
    const checkCreatedLead = page.locator(`a[href*="${lead_Id}"]:visible`);
    await expect(checkCreatedLead).toBeVisible();
    await expect(checkCreatedLead).toContainText(lastName)
    await checkCreatedLead.click();
    //To Delete the Lead
    await page.getByRole('button', {name: 'Show more actions'}).click();
    // Click Delete from the menu
    await page.getByRole('menuitem', {name: 'Delete',exact: true}).click();
    // Confirm deletion in the dialog
    await page.getByRole('button', {name: 'Delete',exact: true}).click();
    // Verify that Salesforce shows a deletion confirmation
    expect(page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'was deleted.' })).toBeVisible()
    //Calling the Search function to search the Deleted lead
    await searchLead(page,lastName)
    // To verify the exact Lead ID is no longer visible
    const checkDeletedLead = page.locator(`a[href*="${lead_Id}"]:visible`);
    await expect(checkDeletedLead).toHaveCount(0);
    console.log('Lead deleted successfully:', lead_Id);
})