import {test,expect} from '@playwright/test'
import {parse} from 'csv-parse/sync'
import fs from 'fs'
// Read the CSV file and convert the data into an array of objects
// columns: true → Uses the first row as column names
// skip_empty_lines: true → Ignores empty rows
let convertObj: any[] = parse(fs.readFileSync('utils/loginData.csv','utf-8'),{columns:true,skip_empty_lines : true})
// Loop through each record from the CSV file
for(let readData of convertObj){
// Create a separate test for each user in the CSV file
test(`Read Data from CSV ${readData.uid}`,async({page})=>{
    await page.goto('https://leaftaps.com/opentaps/control/main')
    // Enter the username from the CSV file
    await page.locator('#username').fill(readData.Username)
    // Enter the password from the CSV file
    await page.locator('#password').fill(readData.Password)
    await page.getByRole('button',{name:'Login'}).click() 
    // Verify that the CRM/SFA text is visible after successful login
    await expect(page.getByText('CRM/SFA')).toBeVisible()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
})
}                    
