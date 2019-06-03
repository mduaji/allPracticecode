var readLine = require("readline-sync");
var num1 = readLine.question("Enter the Number");
var consoldatedArr = []

for (var i = 0; i < num1; i++) {
    var num2 = readLine.question("Enter the Value");
    consoldatedArr.push(num2);
}
var operation = readLine.question("enter the operation   :");
var sum = getResult(operation, consoldatedArr);

function getResult(operation, consoldatedArr) {

    if (operation == 'add') {
        var sum = consoldatedArr.reduce(myfunction);
        console.log(sum);
        function myfunction(total, value) {
            return Number(total) + Number(value);
        }
    }
    else if (operation == 'sub') {
        var sum = consoldatedArr.reduce(myfunction);
        console.log(sum);
        function myfunction(total, value) {
            return total - value;
        }
    }
    else if (operation == 'multiple') {
        var sum = consoldatedArr.reduce(myfunction);
        console.log(sum);
        function myfunction(total, value) {
            return total * value;
        }
    }
    else if (operation == 'div' && num1 == 2) {
        var sum = consoldatedArr.reduce(myfunction);
        console.log(sum);
        function myfunction(total, value) {
            return total / value;

        }
    }
    else {
        console.log("invalid operation");
    }
}
