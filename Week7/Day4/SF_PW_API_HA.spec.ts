import {test,expect} from '@playwright/test';
let accessToken: string;
let tokenType: string;
let instanceUrl: string;
let headers_crud: any;
let contactId: any;
let accountId: any;
let caseId: any;
test.describe.serial('Salesforce Case CRUD using Playwright API', async() => {
    // Generate OAuth access token using POST request
    test('To generate the access token', async({request})=>{
        //Serialization -> converting object into json
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
        let tokenResponse = await responseBody.json();
        console.log(tokenResponse);
        expect(responseBody.status()).toBe(200);
        expect(responseBody.statusText()).toBe('OK');
        accessToken = tokenResponse.access_token;
        console.log('accessToken', accessToken);
        tokenType = tokenResponse.token_type;
        console.log('tokenType', tokenType);
        instanceUrl = tokenResponse.instance_url;
        console.log('instanceUrl', instanceUrl);
        // Create common headers using the generated access token
        headers_crud = {
            headers:{
                "Authorization": `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    })
    //Create a Contact and capture the ContactId
    test('To create a contact in Salesforce', async({request})=>{
        // Send POST request to create a new Contact
        let responseBody = await request.post(`${instanceUrl}/services/data/v68.0/sobjects/contact`,{
            // Reuse the common headers for the Contact API request
            headers: headers_crud.headers,
            data:{
                "FirstName": "Karthi",
                "LastName": "K",
            }
        })
        let contactResponse = await responseBody.json();
        console.log(contactResponse);
        // Verify that Contact was created successfully
        expect(responseBody.status()).toBe(201);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('Created');
        console.log(responseBody.statusText());
        // Store the created Contact ID for later requests
        contactId = contactResponse.id;
        console.log('contactId',contactId);
    })
    //Create an Account and capture the AccountId
    test('To create a Account in Salesforce', async({request})=>{
        let responseBody = await request.post(`${instanceUrl}/services/data/v68.0/sobjects/Account`,{
            headers: headers_crud.headers,
            data:{
                "Name": "KK Corporation"
            }
        })
        let accountResponse = await responseBody.json();
        console.log(accountResponse);
        expect(responseBody.status()).toBe(201);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('Created');
        console.log(responseBody.statusText());
        accountId = accountResponse.id;
        console.log('accountId',accountId);
    })
    //Create a Case using ContactId, AccountId, Status, and Origin, then capture the CaseId
    test('To create a Case in Salesforce', async({request})=>{
        let responseBody = await request.post(`${instanceUrl}/services/data/v68.0/sobjects/Case`,{
            headers: headers_crud.headers,
            data:{
                "ContactId": `${contactId}`,
                "AccountId": `${accountId}`,
                "Status": "New",
                "Origin": "Phone",
            }
        })
        let caseResponse = await responseBody.json();
        console.log(caseResponse);
        expect(responseBody.status()).toBe(201);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('Created');
        console.log(responseBody.statusText());
        caseId = caseResponse.id; 
        console.log("caseId",caseId);
    })
    //Fetch the created Case using GET request
    test('To get the Case in Salesforce', async({request})=>{
        let responseBody = await request.get(`${instanceUrl}/services/data/v68.0/sobjects/Case/${caseId}`,{
            headers: headers_crud.headers,
        })
        let caseResponse = await responseBody.json();
        console.log(caseResponse);
        expect(responseBody.status()).toBe(200);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('OK');
        console.log(responseBody.statusText());
    })
    //Update the Case Status to Escalated using PATCH request
    test('To update the Case in Salesforce', async({request})=>{
        let responseBody = await request.patch(`${instanceUrl}/services/data/v68.0/sobjects/Case/${caseId}`,{
            headers: headers_crud.headers,
            data:{
                "Status": "Escalated",
            }
        })
        expect(responseBody.status()).toBe(204);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('No Content');
        console.log(responseBody.statusText());
    })
    //Delete the Case using DELETE request
    test('To delete the Case in Salesforce', async({request})=>{
        let responseBody = await request.delete(`${instanceUrl}/services/data/v68.0/sobjects/Case/${caseId}`,{
            headers: headers_crud.headers
        })
        console.log(responseBody);
        expect(responseBody.status()).toBe(204);
        console.log(responseBody.status());
        expect(responseBody.statusText()).toBe('No Content');
        console.log(responseBody.statusText());
    })
})