import {test} from '@playwright/test'
import dotenv from 'dotenv'
dotenv.config({path:'utils/qa.env'})
test('To read data using env file',async({page})=>{
    let sf_url = process.env.qa_URL as string
    let sf_username = process.env.qa_username as string
    let sf_password = process.env.qa_password as string
    await page.goto(sf_url)
    await page.getByRole('textbox',{name:'Username'}).fill(sf_username)
    await page.locator('#Login').click()
    await page.getByRole('textbox',{name:'Password'}).fill(sf_password)
    await page.getByRole('button',{name:'Log In'}).click()
})
