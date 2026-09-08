//Function declaration

function userProfile(name){
    console.log(`Hello, ${name}!`);
}
userProfile("Preetha")

//Arrow Function

const double = (inputNum)=> inputNum * 2
console.log(double(10))

//Anonymous Function

setTimeout(function (){
    console.log("This message is delayed by 2 seconds")
},2000)

//Callback Function

const callbackFunc = ()=>console.log("Call Back Function")
function getUserData(cb){
    setTimeout(()=>{
        cb()
    },3000)
}
getUserData(callbackFunc)