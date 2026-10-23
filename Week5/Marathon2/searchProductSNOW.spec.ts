import { test, expect } from '@playwright/test';
// Use saved Service Now login session
test.use({
    storageState:'Data/marathonSnowLogin.json'
})
test('Search Product in ServiceNow', async ({ page }) => {
    // Launch browser and navigate to ServiceNow
    await page.goto('https://dev230189.service-now.com/now/nav/ui/classic/params/target/ui_page.do%3Fsys_id%3D471d232bc3bf43107c46b11ed4013114');
    // Verify ServiceNow home page is displayed
    expect(await page.title()).toContain('ServiceNow');
    // Navigate to All → Service Catalog
    await page.getByRole('menuitem', { name: 'All' }).click();
    await page.locator('#filter').fill('Service Catalog');
    await page.getByRole('list', { name: 'Self-Service' }).getByRole('link', { name: 'Service Catalog 1 of 1' }).click();
    // Switch to Service Catalog iframe if the catalog is inside one
    const catalogFrame = page.frameLocator('iframe');
    // Select Mobiles category
    await catalogFrame.getByRole('link', { name: 'Mobiles. Cell phones to meet your business needs.', exact: true }).click();
    // Choose Apple iPhone 13 Pro
    await catalogFrame.getByRole('link', { name: 'Apple iPhone 13 pro' }).click();
    // Configure required options
    await catalogFrame.getByText('Yes', { exact: true }).click();
    await catalogFrame.getByLabel('What was the original phone number?').fill('9876543210');
    await catalogFrame.getByLabel('Monthly data allowance').selectOption('500MB');
    // Click Order Now
    await catalogFrame.getByRole('button', { name: 'Order Now' }).first().click();
    // Verify order confirmation message
    await expect(catalogFrame.locator('//div[@class="notification notification-success"]//span[text()="Thank you, your request has been submitted"]')).toBeVisible();
    // Capture the full content inside the iframe
    await catalogFrame.locator('body').screenshot({path: 'Data/iframe-full-screenshot.png'});
});
