import { Wrapper } from "../../helper/pwWrapper";
import {expect} from '@playwright/test'
import { faker } from "@faker-js/faker";
export class SfLead extends Wrapper{
    // Click the New button to create a new Lead
    async clickNew(){
        await this.clickAction(this.page.getByRole('button',{name:'New'}))
    }
    // Enter the Lead details
    async newLead(){
        await this.clickAction(this.page.getByRole('combobox',{name:'Salutation'}))
        await this.clickAction(this.page.locator('[data-value="Mr."]'))
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const companyName = faker.company.name()
        await this.clearAndFill(this.page.getByRole('textbox',{name:'First Name'}),firstName)
        await this.clearAndFill(this.page.getByRole('textbox',{name:'Last Name'}),lastName)
        await this.clearAndFill(this.page.getByRole('textbox',{name:'Company'}),companyName)
        return firstName
        //return [firstName,lastName,companyName]
    }
    // Save the newly created Lead
    async saveLead(){
        await this.clickAction(this.page.locator('button[name="SaveEdit"]'))
    }
    //Verify that the Lead was created successfully
    async verifyLead(expectedLn:string){
        await expect(this.page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Lead' })).toContainText('was created')
        let lName = await this.page.locator('[slot="primaryField"]').innerText()
        console.log(lName)
        expect(lName).toContain(expectedLn)
    }
}