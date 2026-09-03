const browserVersion = 'Chrome';

function getBrowserVersion(){
    if(browserVersion === 'Chrome'){      //hoisting takes place and returning undefined
        var browserVersion = "Fire Fox";
        console.log(browserVersion);
    }
    console.log(browserVersion)
}
getBrowserVersion()
console.log(browserVersion)
