import { HomePage } from "./homePageHA";
import { expect } from "@playwright/test";
// LeadPage inherits the methods from HomePage
export class LeadPage extends HomePage{
    // Click the New button to create a new Lead
    async clickNew(){
        await this.page.getByRole('button',{name:'New'}).click()
    }
    // Enter the Lead details
    async newLead(){
        await this.page.getByRole('combobox',{name:'Salutation'}).click()
        await this.page.locator('[data-value="Mr."]').click()
        await this.page.getByRole('textbox',{name:'First Name'}).fill('Ram')
        await this.page.getByRole('textbox',{name:'Last Name'}).fill('N')
        await this.page.getByRole('textbox',{name:'Company'}).fill('RM EDU')
    }
    // Save the newly created Lead
    async saveLead(){
        await this.page.locator('button[name="SaveEdit"]').click()
    }
    // Verify that the Lead was created successfully
    async verifyLead(){
        await expect(this.page.locator('[data-aura-class="forceActionsText"]').filter({ hasText: 'Lead' })).toContainText('was created')
    }
}