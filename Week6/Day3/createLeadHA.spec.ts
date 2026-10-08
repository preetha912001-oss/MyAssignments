import { LeadPage } from "../../../Pages/leadPageHA";
import {test} from '@playwright/test'
// Use the saved Salesforce login session
test.use({storageState: 'Data/pomSFLogin.json'});
test('Salesforce Lead Creation Using POM',async({page})=>{
    // Create an object for the LeadPage class
    let viewLead = new LeadPage(page)
    // Navigate to the Salesforce application
    await viewLead.loadUrl("https://orgfarm-b5ee75a3ba-dev-ed.develop.lightning.force.com/lightning/n/devedapp__Welcome")
    await viewLead.viewAppLauncher()
    await viewLead.clickNew()
    await viewLead.newLead()
    await viewLead.saveLead()
    await viewLead.verifyLead()
})                                    