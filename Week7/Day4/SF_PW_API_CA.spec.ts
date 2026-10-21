import {test, expect} from '@playwright/test';

let accessToken:any;
let tokenType:any;
let instanceUrl:any;
let leadId:any;
test.describe.serial('Executing in serial mode', async() => {
test('Salesforce API testing with Playwright', async ({request}) => {
    //Serialization ->converting object into json
    let responseBody = await request.post('https://orgfarm-b5ee75a3ba-dev-ed.develop.my.salesforce.com/services/oauth2/token',{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            "grant_type": 'client_credentials',
            "client_id": '3MVG9XgkMlifdwVB7e4j4aYJ4mVBmpqgQsCcWuv2JpoLd5k8RMEYryeuF_jQ0631EDniTx1OBNYi3_VYxYg05',
            "client_secret": '48A14658ED52432EC847CBD17FA4BF168DFEE7C05304018BD62F60AC7DBE349F'
        }
    })
    //Deserialization -> converting json into object
    let tokenResponse = await responseBody.json();
    console.log(tokenResponse);
    expect(responseBody.status()).toBe(200);
    expect(responseBody.statusText()).toBe('OK');

    accessToken = tokenResponse.access_token;
    console.log(accessToken);

    tokenType = tokenResponse.token_type;
    console.log(tokenType);

    instanceUrl = tokenResponse.instance_url;
    console.log(instanceUrl);
})

test('To Create lead in Salesforce', async ({request}) => {
    let responseBody = await request.post(`${instanceUrl}/services/data/v68.0/sobjects/lead`, {
        headers: {
          "Authorization": `${tokenType} ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data:{
            "Salutation": "Mr.",
            "LastName": "John",
            "Company": "ABC Corp",
        }
    })
    let leadResponse = await responseBody.json();
    console.log(leadResponse);
    expect(responseBody.status()).toBe(201)
    console.log(responseBody.status())
    expect(responseBody.statusText()).toBe('Created')
    console.log(responseBody.statusText())
    leadId = leadResponse.id;
    console.log(leadId);
})
test('To get lead in Salesforce', async ({request}) => {
    let responseBody = await request.get(`${instanceUrl}/services/data/v68.0/sobjects/lead/${leadId}`, {
        headers: {
          "Authorization": `${tokenType} ${accessToken}`,
          'Content-Type': 'application/json'
        }
    })
    let leadResponse = await responseBody.json();
    console.log(leadResponse);
    expect(responseBody.status()).toBe(200)
    console.log(responseBody.status())
    expect(responseBody.statusText()).toBe('OK')
    console.log(responseBody.statusText())
})
test('To modify lead in Salesforce', async ({request}) => {  
    let responseBody = await request.patch(`${instanceUrl}/services/data/v68.0/sobjects/lead/${leadId}`, {
        headers: {
          "Authorization": `${tokenType} ${accessToken}`,
          'Content-Type': 'application/json'
        },
        data:{
            "Salutation": "Mr.",
            FirstName: "Preethi",
        }
    })
    expect(responseBody.status()).toBe(204)
    console.log(responseBody.status())
    expect(responseBody.statusText()).toBe('No Content')
    console.log(responseBody.statusText())
})
test('To delete lead in Salesforce', async ({request}) => {
    let responseBody = await request.delete(`${instanceUrl}/services/data/v68.0/sobjects/lead/${leadId}`, {
        headers: {
          "Authorization": `${tokenType} ${accessToken}`,
          'Content-Type': 'application/json'
        }
    })
    expect(responseBody.status()).toBe(204)
    console.log(responseBody.status())
    expect(responseBody.statusText()).toBe('No Content')
    console.log(responseBody.statusText())
})
})