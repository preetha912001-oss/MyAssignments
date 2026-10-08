import {expect} from "@playwright/test"
import { CreateAccountPage } from "./createAccountPage"

export class ViewAccount extends CreateAccountPage{
async verifyAccount(){
const accountName = this.page.locator('span.tabletext').filter({
    hasText: 'Anupk'
});

await expect(accountName).toContainText('Anupk');
}

}