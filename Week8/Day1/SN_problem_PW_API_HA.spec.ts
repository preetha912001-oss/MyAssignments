import {test, expect} from '@playwright/test';
let headers_crud: any;
let problemNumber: string;
let systemId: string;
test.describe.serial('ServiceNow Problem Playwright API Testing', async() => {
    
    test('To generate the bearer token',async({request})=>{
        let responseBody = await request.post('https://dev230189.service-now.com/oauth_token.do', {
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form:{
                "grant_type": 'password',
                "client_id": 'a041475fbafc4a9fb2545731401291dc',
                "client_secret": '#li)<1(hK?#Q0;!n*ErE]iBe3`UGqg)3',
                "username": 'admin',
                "password": 'jaJ6yY*4xT!H'
            }
        })
        let tokenResponse = await responseBody.json();
        console.log(tokenResponse);
        expect(responseBody.status()).toBe(200);
        expect(responseBody.statusText()).toBe('OK');
        let accessToken = tokenResponse.access_token;
        console.log('accessToken', accessToken);
        let tokenType = tokenResponse.token_type;
        console.log('tokenType', tokenType);
        headers_crud = {    
            headers:{
                "Authorization": `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json'
        }}
    })
    test('To create a problem in ServiceNow', async({request})=>{
        let responseBody = await request.post('https://dev230189.service-now.com/api/now/table/problem', {
            headers: headers_crud.headers,
            data:{  
                "short_description": 'Repeated login failures in Salesforce'
            }
        })   
        expect(responseBody.status()).toBe(201);
        const problemResponse = await responseBody.json();
        console.log(problemResponse);
        problemNumber = problemResponse.result.number;
        console.log('problemNumber', problemNumber);
        systemId = problemResponse.result.sys_id;   
        console.log('systemId', systemId);
    })
    test('To get the problem in ServiceNow', async({request})=>{
        let responseBody = await request.get(`https://dev230189.service-now.com/api/now/table/problem/${systemId}`, {
            headers: headers_crud.headers
        })
        expect(responseBody.status()).toBe(200);
    })
    test('To update the problem in ServiceNow', async({request})=>{
        let responseBody = await request.patch(`https://dev230189.service-now.com/api/now/table/problem/${systemId}`, { 
            headers: headers_crud.headers,
            data: {
                "short_description": "Updated short description"
            }
        })
        expect(responseBody.status()).toBe(200);
    })
    test('To verify the problem record in UI is Visible',async({page})=>{
        // Open ServiceNow UI
            await page.goto('https://dev230189.service-now.com');
            await page.getByRole('textbox',{name:'User name'}).fill('admin')
            await page.getByRole('textbox',{name:'Password'}).fill('jaJ6yY*4xT!H')
            await page.getByRole('button',{name:'Log in'}).click()
            // Open Problem list directly
            await page.goto('https://dev230189.service-now.com/problem_list.do');
            // Wait for Problem list to load
               //await page.waitForLoadState('domcontentloaded');
            // Search for the Problem number
            const searchProblem = page.getByRole('searchbox', { name: 'Search' });
            await searchProblem.fill(problemNumber);
            await searchProblem.press('Enter');
            // Verify Problem number is visible
            await expect(page.getByRole('link', { name: `Open record: ${problemNumber}` })).toBeVisible();
    })
    test('To delete the problem in ServiceNow', async({request})=>{
        let responseBody = await request.delete(`https://dev230189.service-now.com/api/now/table/problem/${systemId}`, {
            headers: headers_crud.headers
        })
        expect(responseBody.status()).toBe(204);
    })
    test('To verify the problem record in UI is Hidden',async({page})=>{
        // Open ServiceNow UI
            await page.goto('https://dev230189.service-now.com');
            await page.getByRole('textbox',{name:'User name'}).fill('admin')
            await page.getByRole('textbox',{name:'Password'}).fill('jaJ6yY*4xT!H')
            await page.getByRole('button',{name:'Log in'}).click()
            // Open Problem list directly
            await page.goto('https://dev230189.service-now.com/problem_list.do');
            // Wait for Problem list to load
               //await page.waitForLoadState('domcontentloaded');
            // Search for the Problem number
            const searchProblem = page.getByRole('searchbox', { name: 'Search' });
            await searchProblem.fill(problemNumber);
            await searchProblem.press('Enter');
            // Verify Problem number is visible
            await expect(page.getByRole('link', { name: `Open record: ${problemNumber}` })).toBeHidden();
    })
})