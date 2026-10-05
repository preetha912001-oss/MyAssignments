import {test,expect} from "@playwright/test"

//Salesforce tests
test.describe('Salesforce Tests', () => {
    // Reuse saved Salesforce session
    test.use({ storageState: 'Data/sf-storage.json' });
    // test.only()
    test.only('Verify Salesforce Homepage', async ({ page }) => {
        await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
        // Verify user is already logged in
        const title = await page.title()
        expect(title).toContain('Lightning Experience | Salesforce');
    });
    // test.slow()
    test('Navigate to Salesforce Page', async ({ page }) => {
        test.slow();
        await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
    });
    // test.fail()
    test('Invalid Salesforce Session', async ({ page }) => {
        test.fail();
        await page.goto('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome');
        await page.locator('#username').fill('DemoSalesMan');
        await page.locator('#password').fill('crm');
        await page.locator('.decorativeSubmit').click();
    });
});

//LeafTaps Tests
test.describe('LeafTaps Tests', () => {
    // Normal login
    test('Login and Verify LeafTaps Homepage', async ({ page }) => {
        await page.goto('http://leaftaps.com/opentaps/');
        await page.getByLabel('Username').fill('DemoSalesManager')
        await page.getByRole('textbox',{name:'PASSWORD'}).fill('crmsfa')
        await page.getByRole('button').click()
        await page.getByText('CRM/SFA').click()
        const title = await page.title()
        expect(title).toContain('My Home | opentaps CRM');
    });
    //Invalid login
    test('Invalid LeafTaps Login', async ({ page }) => {
        test.fail();
        await page.goto('http://leaftaps.com/opentaps/');
        await page.locator('#username').fill('DemoSales');
        await page.locator('#password').fill('crmsf');
        await page.locator('.decorativeSubmit').click();
    });
    // Incomplete flow
    test('Incomplete LeafTaps Flow', async ({ page }) => {
        test.fixme();
        await page.goto('http://leaftaps.com/opentaps/');
        await page.locator('#username').fill('DemoSalesManager');
        await page.locator('#password').fill('crmsfa');
    });
    // Optional test
    test('Optional LeafTaps Test', async ({ page }) => {
        test.skip();
        await page.goto('http://leaftaps.com/opentaps/');
        const title = await page.title()
        expect(title).toContain('My Home | opentaps CRM');
    });
});