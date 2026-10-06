import { Browser } from "./parentFileHieBO"
class Chrome extends Browser{
    launchBrowser(){
        console.log('Your are launching Chrome browser')
    }
}
const chromeBrowser = new Chrome()
chromeBrowser.launchBrowser()
chromeBrowser.browserType()
chromeBrowser.browserVersion()