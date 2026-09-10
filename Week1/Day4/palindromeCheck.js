// Verifying the given string is Palindrome
function toReverseString(inputValue){
    let reversedValue ="" 
    let splittedValue = inputValue.split("")                  // Converts string into array
    //using loop to reverse the splitted string
    for(let i=splittedValue.length - 1; i>=0; i--){
        reversedValue = reversedValue + splittedValue[i];   // Concatenate the reversed string
    }
    console.log(`Reversed String : ${reversedValue}`) 
    return reversedValue
}
// Compares the input string with the reversed string
function toCheckPalindrome(inputValue,reversedValue){
    if(inputValue === reversedValue)
        console.log(`True, The given string ${inputValue} is a palindrome!!`)
    else
        console.log(`False, The given string ${inputValue} is not a palindrome`)
}
toCheckPalindrome('level',toReverseString('level'))
toCheckPalindrome('cat',toReverseString('cat'))