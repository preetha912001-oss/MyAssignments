//parent class
class BankAccount{
    public accountNumber: number = 1001
    private accountHolder: string = 'Preetha'
    protected balance: number = 5000
    deposit(amt:number){
        this.balance = this.balance + amt
    }
    withdraw(amt:number){
       this.balance = this.balance - amt
    }
    showAccountDetails(){
        console.log(this.accountNumber); // public
        console.log(this.accountHolder); // private
        console.log(this.balance);       // protected
    }
}
const myAccount = new BankAccount()
console.log(myAccount.accountNumber)      //public - can access outside the class
// console.log(myAccount.accountHolder)  //private - can't access outside the parent class
// console.log(myAccount.balance)       //protected - can't directly access outside the class            
myAccount.deposit(5000)
myAccount.withdraw(2000)
myAccount.showAccountDetails()

//child class
class AnotherBankAccount extends BankAccount{
    showBalanceAmount(){
        console.log(this.accountNumber)      //public can access inside the child class
        console.log(this.balance)           //protected can directly access inside the child class
        //console.log(this.accountHolder)  //private can't access inside the child class
    }
}
const savings = new AnotherBankAccount()
savings.showBalanceAmount()