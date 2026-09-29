import {test,expect} from '@playwright/test'
test('To upload Files using Event Listener',async({page})=>{
    await page.goto('https://www.naukri.com/registration/createAccount')
    await page.getByRole('radio',{name:"I'm experienced. I have work experience (excluding internships)"}).click()
    const eventList = page.waitForEvent('filechooser')
    await page.getByRole('button',{name:"Upload Resume"}).click()
    const upload = await eventList 
    await upload.setFiles('Data/Preetha_SQL_Resume.pdf')
    let uploadCheck = await page.locator('[class="file-name ellipsis"]').innerText()
    console.log(uploadCheck);
    //Retry assertion
    await expect(page.locator('[class="file-name ellipsis"]')).toContainText('Preetha_SQL_Resume.pdf')
})
test.only('To upload Files using input type',async({page})=>{
    await page.goto('https://www.naukri.com/registration/createAccount')
    await page.getByRole('radio',{name:"I'm experienced. I have work experience (excluding internships)"}).click()
    let uploadFile=page.getByRole('button',{name:'Upload your resume'})
    //relative path
    await uploadFile.setInputFiles('Data/Preetha_SQL_Resume.pdf')
    let uploadResult = await page.locator('[class="file-name ellipsis"]').innerText()
    console.log(uploadResult);
    //Retry assertion
    await expect(page.locator('[class="file-name ellipsis"]')).toContainText('Preetha_SQL_Resume.pdf')
})