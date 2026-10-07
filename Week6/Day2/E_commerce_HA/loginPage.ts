import { Basepage } from "./basePage";
import { PageRules } from "./pageRules";
export class Pagelogin extends Basepage implements PageRules{
    verifyPage():void{
        console.log('Login Page Verified')
    }
    enterUsername():void{
        console.log('Enter user name')
    } 
    enterPassword():void{
        console.log('Enter password')
    } 
    clickLogin():void{
        console.log('Click login')
    }
}