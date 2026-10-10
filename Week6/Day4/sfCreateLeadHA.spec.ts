import {test} from  '../../../helper/customFixture'
import  dotenv from 'dotenv'
import data from '../../../Data/dpSfLogin.json'
//use the env file data
//config env file
dotenv.config({path:'Data/prod.env'})
test('Lead Creation in Salesforce using POM HA',async({
    loginFix,
    homeFix,
    leadFix
    })=>{
    await loginFix.loadSfUrl(process.env.prod_url as string)
    //reading data from json file
    await loginFix.loginCredentials(data.username,data.password)
    await loginFix.clickLogin()
    await homeFix.viewAppLauncher()
    await leadFix.clickNew()
    let fName = await leadFix.newLead()
    await leadFix.saveLead()
    console.log('Test steps completed');
    await leadFix.verifyLead(fName)
})                                    