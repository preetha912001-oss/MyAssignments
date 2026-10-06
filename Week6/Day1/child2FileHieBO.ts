import { Browser } from "./parentFileHieBO"
class Edge extends Browser{
    launchBrowser(){
        console.log('Your are launching Edge browser')
    }
}
const edgeBrowser = new Edge()
edgeBrowser.launchBrowser()
edgeBrowser.browserType()
edgeBrowser.browserVersion()