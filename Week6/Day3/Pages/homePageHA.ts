import { LoginPage } from "./loginPageHA"
// HomePage inherits the common methods from LoginPage
export class HomePage extends LoginPage{
    // Open App Launcher and navigate to Leads
    async viewAppLauncher(){
        // Click the App Launcher
        await this.page.locator('[title="App Launcher"]').click()
        // Click View All Applications
        await this.page.locator('[aria-label="View All Applications"]').click()
        // Search for Leads application
        await this.page.getByRole('combobox',{name:'Search apps or items...'}).fill('Leads')
        // Click the Leads application
        await this.page.locator('a[data-label="Leads"]').click()
    }
}                                     