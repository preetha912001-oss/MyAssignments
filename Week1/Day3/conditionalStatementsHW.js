
// Conditional Statement 
function launchBrowser(browserName){

    if(browserName === "Chrome")
        console.log("Launching Chrome")
    else 
        console.log('Launching other browser')
}
function runTests(testType){

    switch(testType)
    {
        case 'Smoke':
            console.log('Smoke Test type');
            break;
        case 'Sanity':
            console.log('Sanity Test type');
            break;
        case 'Regression':
            console.log('Regression Test type')
            break;
        default:
            console.log('Default Smoke Test type');
            break;
    }
}
launchBrowser("Chrome")
runTests('Sanity')