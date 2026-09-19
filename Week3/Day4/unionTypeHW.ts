type PaymentMethod =  "UPI" | "CreditCard" | "PayPal"
function makePayment(payment:PaymentMethod){
    console.log(payment)
}
makePayment("UPI")   
makePayment("CreditCard")
//makePayment("Cash")  - This will throw error.Because it is not included in union type.