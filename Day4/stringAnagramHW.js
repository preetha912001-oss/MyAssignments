//To find the length of the last word
let s = "Hello World"
let string_2 = " fly me to the moon "
function findLastWord(inputValue){
    let trimValue = inputValue.trim()                     // To remove spaces from the beginning and end of the string
    let splitValue = trimValue.split(" ")
    let lastWord = splitValue[splitValue.length-1]       //To get the last word
    let stringLength = lastWord.length
    console.log(stringLength)
}
findLastWord(s)

//To find the length of the last word with trim
findLastWord(string_2)  

//To Check whether two strings are anagrams
function isAnagram(input1,input2){
    // Remove spaces and convert both strings to lowercase
    let trimValue1 = input1.trim().toLowerCase()
    let trimValue2 = input2.trim().toLowerCase()
    // Split into characters, sort them, and join them back
    let sortValue1 = trimValue1.split("").sort().join("")       
    let sortValue2 = trimValue2.split("").sort().join("")
    //Comparing Sorted Strings
    if(sortValue1 === sortValue2)
        console.log(`True, Sort Value1: ${sortValue1} , Sort Value2: ${sortValue2}`)
    else 
        console.log(`False, Sort Value1: ${sortValue1} , Sort Value2: ${sortValue2}`)
}
isAnagram('Listen',' silent ')
isAnagram('Hello ',' World ')
