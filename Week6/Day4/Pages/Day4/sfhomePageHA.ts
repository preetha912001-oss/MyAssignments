import { Wrapper } from "../../helper/pwWrapper";
export class SfHome extends Wrapper{
    async viewAppLauncher(){
        // Click the App Launcher
        // await this.clickAction('[title="App Launcher"]')
        await this.clickAction(this.page.locator('[title="App Launcher"]'))
        // Click View All Applications
        await this.clickAction(this.page.locator('[aria-label="View All Applications"]'))
        // Search for Leads application
        await this.clearAndFill(this.page.getByRole('combobox',{name:'Search apps or items...'}),'Leads')
        // Click the Leads application
        await this.clickAction(this.page.locator('a[data-label="Leads"]'))
    }
}