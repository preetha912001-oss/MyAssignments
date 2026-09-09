//Launch RedBus in Edge and Flipkart in WebKit
import {chromium,webkit,test} from '@playwright/test'
test("To launch Edge and Webkit", async()=>{
    //Launch Edge browser
    const edgeBrowser = await chromium.launch({ headless: false, channel: "msedge" });
    const edgeContext = await edgeBrowser.newContext();
    const edgePage = await edgeContext.newPage();
    // It opens Red Bus URL
    await edgePage.goto("https://www.redbus.in");
    console.log("Red Bus Title:", await edgePage.title());
    console.log("Red Bus URL:", edgePage.url());

    //Launch WebKit browser
    const webkitBrowser = await webkit.launch({headless: false});
    const webkitContext = await webkitBrowser.newContext();
    const webkitPage = await webkitContext.newPage();
    // It opens Flipkart URL
    await webkitPage.goto("https://www.flipkart.com")
    console.log("Flipkart Title:", await webkitPage.title());
    console.log("Flipkart URL:", webkitPage.url())
})