import { test,expect } from '@playwright/test';
import Path from 'path';
test('Multiple File Upload', async ({ page }) => {
    await page.goto('https://www.leafground.com/file.xhtml');
    let uploadMultiFile = page.locator('input[multiple="multiple"]');
    // Upload multiple files using an array in setInputFiles()
    await uploadMultiFile.setInputFiles([
        //using relative path
        Path.join(__dirname, '../../../Data/PW setup scrnshott.png'),
        Path.join(__dirname, '../../../Data/icon.png')
    ]);
    // Verify both selected files
    await expect(page.locator('div[class="ui-fileupload-filename"]').nth(0)).toContainText('PW setup scrnshott.png')
    await expect(page.locator('div[class="ui-fileupload-filename"]').nth(1)).toContainText('icon.png')
});