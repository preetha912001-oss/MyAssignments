import {test} from '@playwright/test'
import dotenv from 'dotenv'
import fs from 'fs'
import {parse} from 'csv-parse/sync'
//To read json data
import prodDropDown from '../../../utils/prodDropDown.json'
//To load .env file in process.env
dotenv.config({path:'utils/prodLogin.env'})
//To read csv data
const csvData:any[] = parse(fs.readFileSync('utils/prodLeadData.csv','utf-8'),{columns:true,skip_empty_lines:true})
test('To pass data from different files such as .env, .json and .csv files', async({page})=>{
    let url = process.env.prod_url as string
    let userName = process.env.prod_username as string
    let password = process.env.prod_password as string
    await page.goto(url)
    await page.locator("#username").fill(userName)
    await page.locator('#password').fill(password)
    await page.getByRole('button',{name:'Login'}).click()
    await page.getByRole('link',{name:"CRM/SFA"}).click()
    await page.getByRole('link',{name:"Leads"}).click()
    await page.getByRole('link',{name:"Create Lead"}).click()
    await page.locator('#createLeadForm_companyName').fill(csvData[0].companyName)
    await page.locator('#createLeadForm_firstName').fill(csvData[0].firstName)
    await page.locator('#createLeadForm_lastName').fill(csvData[0].lastName)
    //selecting dropdown using label
    await page.locator('#createLeadForm_dataSourceId').selectOption({label: prodDropDown.source})
    //selecting dropdown using Value
    await page.locator('#createLeadForm_marketingCampaignId').selectOption(prodDropDown.Marketing_Campaign)
    //print all the values in the Marketing Campaign dropdown
    let mcdropDown = page.locator('#createLeadForm_marketingCampaignId option')
    let mcCount = await mcdropDown.count()
    for(let i = 0; i< mcCount; i++){
        let marketing_Campaign_Value = await mcdropDown.nth(i).innerText()
        console.log(marketing_Campaign_Value)
    }
    await page.locator('#createLeadForm_industryEnumId').selectOption({index : 5})
    await page.locator('#createLeadForm_currencyUomId').selectOption(prodDropDown.currency)
    await page.locator('#createLeadForm_generalCountryGeoId').selectOption(prodDropDown.country)
    await page.locator('#createLeadForm_generalStateProvinceGeoId').selectOption({index : 5})
    //Get the count of all states and print the values in the console
    let states =  page.locator('#createLeadForm_generalStateProvinceGeoId option')
    let stateCount = await states.count()
    let allStateNames = await states.allTextContents();
    for(let j=0; j <allStateNames.length; j++){
        let stateName = allStateNames[j]
        console.log(stateName)
    }
    await page.locator('[value="Create Lead"]').click()
})