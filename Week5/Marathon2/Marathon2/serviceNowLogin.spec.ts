import {test} from '@playwright/test'
test('Service Now Login',async({page})=>{
    await page.goto('https://dev230189.service-now.com/now/nav/ui/classic/params/target/ui_page.do%3Fsys_id%3D471d232bc3bf43107c46b11ed4013114')
    await page.locator('#user_name').fill('admin');
    await page.locator('#user_password').fill('jaJ6yY*4xT!H');
    await page.locator('#sysverb_login').click();
    await page.context().storageState({path:'Data/marathonSnowLogin.json'})
})