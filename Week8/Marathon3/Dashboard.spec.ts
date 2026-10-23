import {test,expect} from '@playwright/test'
// Use saved Salesforce login session
test.use({
    storageState:'Data/marathon3SFLogin.json'
})
// Declared variables to store the API authentication details
let accessToken: string;
let tokenType: string;
let instanceUrl: string;
let headers_crud: any;
// Declared variables to store the Dashboard details
let dashboard_Id: string;
let dashboard_Title: string;
test('To create a new dashboard',async({page,request})=>{
    // Navigate to the Salesforce Welcome page
    await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')
    // Open the App Launcher
    await page.getByRole('button',{name:'App Launcher'}).click()
    await page.getByRole('button',{name:'View All Applications'}).click()
    // Search for Dashboard
    let searchDashboard= page.getByRole('combobox',{name:'Search apps or items...'})
    await searchDashboard.fill('Dashboards')
    await searchDashboard.press('Enter')
    // Open the Dashboards
    await page.locator('a[data-label="Dashboards"]').click()
    // Start creating a new Dashboard
    await page.getByRole('button',{name:'New Dashboard'}).click()
    // Locate the Dashboard creation iframe
    let frame = page.frameLocator('iframe[title="dashboard"]')
    await frame.locator('input[id="dashboardNameInput"]').fill('Salesforce Automation by Preetha')
    await frame.getByRole('button',{name:'Create'}).click()
    await frame.locator('//button[text()="Save"]').click()
    // Verify Dashboard was saved
    expect(frame.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Dashboard saved' }))
    // Verify that the Dashboard name is displayed
    expect(frame.locator('[class="slds-form-element__static slds-grid slds-grid_align-spread"]').filter({ hasText: 'Salesforce Automation by Preetha' })).toBeVisible()

    //To get the created dashboard via Postman
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
    console.log('Token Data:', tokenData)
    expect(responseBody.status()).toBe(200)
    accessToken = tokenData.access_token
    console.log('Access Token:', accessToken)
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
    // Fetch the created Dashboard using GET request
    let fetchDashboard = await request.get(`${instanceUrl}/services/data/v68.0/sobjects/Dashboard`,{
        headers: headers_crud.headers
    })
    // Verify that the GET request was successful
    expect(fetchDashboard.status()).toBe(200)
    // Convert the GET response into a JavaScript object
    let dashboardData = await fetchDashboard.json()
    console.log('Dashboard Data:', dashboardData)
    // If multiple Dashboards have the same title, this selects only the first match
    for(let data of dashboardData.recentItems){
        if(data.Title === 'Salesforce Automation by Preetha'){
            dashboard_Id = data.Id
            dashboard_Title = data.Title
            break;
        }
    }
    //Delete the created Dashboard using DELETE request
    let deleteDashboard = await request.delete(`${instanceUrl}/services/data/v68.0/sobjects/Dashboard/${dashboard_Id}`,{
        headers: headers_crud.headers
    })
    // Verify successful deletion
    expect(deleteDashboard.status()).toBe(204);
})