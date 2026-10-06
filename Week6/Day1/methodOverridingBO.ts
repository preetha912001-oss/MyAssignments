
//Method Overriding
class Browser{
    browserVersion(){
        console.log('Parent Browser version is 10.1')
    }
}
class Chrome  extends Browser{
    browserVersion() {
        console.log('Child browser version is 9.8')
        super.browserVersion()
    }
}

let version = new Chrome()
version.browserVersion()