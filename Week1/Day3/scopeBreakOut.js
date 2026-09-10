let browserVersion = 'Chrome';

function getBrowserVersion(){
    if(browserVersion === 'Chrome'){      //hoisting takes place and returning undefined
        let browserVersion = "Fire Fox";
        console.log(browserVersion);
    }
    console.log(browserVersion)
}
getBrowserVersion()
console.log(browserVersion)
