//Interface
interface payment{
    pay(amount: number): void
}
class UPI{
    pay(amount: number): void{
        console.log(`Amount ${amount} paid using UPI`)
    }
}
class CreditCard{
    pay(amount: number): void{
        console.log(`Amount ${amount} paid using CreditCard`)
    }
}
class NetBanking{
    pay(amount: number): void{
        console.log(`Amount ${amount} paid using NetBanking`)
    }
}

let upiMode = new UPI()
upiMode.pay(100)
let creditCardMode = new CreditCard()
creditCardMode.pay(500)
let netBanking = new NetBanking()
netBanking.pay(1000)