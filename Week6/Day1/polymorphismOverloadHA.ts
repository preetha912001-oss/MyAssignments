class APIClient{
    //Method overloading
    sendRequest(endpoint:string):void;
    sendRequest(endpoint:string,requestBody:string,requestStatus:boolean):void;

    //Implementation
    sendRequest(endpoint:string,requestBody?:string,requestStatus?:boolean):void{
        if(requestBody){
            console.log(`Endpoint: ${endpoint}`)
            console.log(`Request Body: ${requestBody}`)
            console.log(`Request Status: ${requestStatus}`)
        }
        else{
            console.log(`Endpoint: ${endpoint}`);
        }
    }

}
//Object
let apiCall = new APIClient();

//first version
apiCall.sendRequest('/login')
//second version
apiCall.sendRequest('/login','username',true)
