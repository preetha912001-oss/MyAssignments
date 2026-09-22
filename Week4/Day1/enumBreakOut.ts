enum Environment{
    LOCAL ="Local environment",
    DEVELOPMENT ='Dev environment',
    STAGING ='STAGING environment',
    PRODUCTION ='Prod environment'
}
function runTests(env:Environment):void{
    console.log('The test running in',env)
}
runTests(Environment.LOCAL)
runTests(Environment.DEVELOPMENT)
runTests(Environment.STAGING)
runTests(Environment.PRODUCTION)

let newon:Environment;