import {test} from  '../../../helper/customFixture'
import { SfLogin } from '../../../Pages/Day4/sfloginPageHA';
import { SfLead } from '../../../Pages/Day4/sfleadPageHA'
import { SfHome } from '../../../Pages/Day4/sfhomePageHA';
import  dotenv from 'dotenv'
import data from '../../../Data/dpSfLogin.json'

// Use the saved Salesforce login session
//test.use({storageState: 'Data/sfLoginHA.json'});

//use the env file data
//config env file
dotenv.config({path:'Data/prod.env'})
test('Lead Creation in Salesforce using POM HA',async({
    loginFix,
    homeFix,
    leadFix
    })=>{
    //reading data from env file
    //let loadPage = new SfLogin(page)
    //await loadPage.loadSfUrl('https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome')

    await loginFix.loadSfUrl(process.env.prod_url as string)
    //reading data from json file
    await loginFix.loginCredentials(data.username,data.password)
    await loginFix.clickLogin()

    //let homePage = new SfHome(page)
    await homeFix.viewAppLauncher()
    
    //let leadPage = new SfLead(page)
    await leadFix.clickNew()

    let fName = await leadFix.newLead()
    await leadFix.saveLead()
    console.log('Test steps completed');

    await leadFix.verifyLead(fName)
})                                    