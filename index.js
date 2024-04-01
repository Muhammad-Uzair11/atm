#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 60000; // Doller
let myPincode = 10;
// print welcome message
console.log(chalk.blueBright("\n \tWelcome to - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("Enter your pin"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPincode) {
    console.log(chalk.greenBright("\nCorrect pin code!!\n"));
    let operationsAns = await inquirer.prompt([
        {
            name: "operation",
            message: "Please select option",
            type: "list",
            choices: ["withdraw", "check balance"]
        }
    ]);
    if (operationsAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                message: "Select with a withdraw method",
                type: "list",
                choices: ["fast cash", "enter amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "fast cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    message: "Please select a withdraw method",
                    type: "list",
                    choices: [500, 1000, 5000, 10000, 20000, 30000, 40000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("insufficient balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(fastCashAns.fastCash + " withdraw succesfully");
                console.log("Your remaining balance is : " + myBalance);
            }
        }
        else if (withdrawAns.withdrawMethod === "enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter the amount to withdraw:",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.redBright("Insufficient balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(amountAns.amount + " withdraw succesfully");
                console.log("Your remaining balance is: " + myBalance);
            }
        }
    }
    else if (operationsAns.operation === "check balance") {
        console.log("Your account balance is: " + myBalance);
    }
}
else {
    console.log(chalk.red("Your pin is incorrect,please try again!"));
}
;
