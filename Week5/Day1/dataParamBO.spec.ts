import {test} from '@playwright/test'
import {parse} from "csv-parse/sync"
import fs from 'fs'
import path from 'path'
let value:any[] = parse(fs.readFileSync('Data/slogin.csv','utf-8'),{columns:true,skip_empty_lines:true})  //relative path
// console.log(value[1].username)
for(let details of value){
test(`Login Data parameterization ${details.tcid}`,async({page})=>{
    await page.goto('https://login.salesforce.com')
    await page.getByRole('textbox',{name:'Username'}).fill(details.username)
    await page.locator('#Login').click()
    await page.getByRole('textbox',{name:'Password'}).fill(details.password)
    await page.getByRole('button',{name:'Log In'}).click()
})
}