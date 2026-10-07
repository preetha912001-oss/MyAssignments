import { Basepage } from "./basePage";
import { PageRules } from "./pageRules";
class ProductPage extends BasePage implements PageRules{
    verifyPage():void{
        console.log('Product Page Verified')
    }
    searchProduct():void{
        console.log('Searching Product')
    }
        
    addToCart():void{
         console.log("Adding Product to Cart");
    }
}