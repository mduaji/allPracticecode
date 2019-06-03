var readLine = require("readline-sync");
var num1 = readLine.question("Enter the Number  :");
var ArrayArr = []
for (var i = 0; i < num1; i++) {
    var num2 = readLine.question("Enter the Value  :");
    ArrayArr.push(num2);
}
var operation = readLine.question("enter the operation   :");
var result = myfunction(operation, ArrayArr);
function myfunction(operation, ArrayArr) {
    var sum = 0;
    var sum1 = 1;
    if (operation == "add") {
        for (let j in ArrayArr) {
            result += Number(ArrayArr[j]);
        }
        console.log(sum);
    }
    else if (operation == "sub") {
        sum = Number(ArrayArr[0])
        for (let j = 1; j < ArrayArr.length; j++) {
            sum -= Number(ArrayArr[j]);
        }
        console.log(sum);
    }
    else if (operation == "multiple") {
        for (let j = 0; j < ArrayArr.length; j++) {
            sum1 *= Number(ArrayArr[j]);
        }
        console.log(sum1);
    }
    else if (operation == "div" && ArrayArr == 2 && ArrayArr != 1) {
        sum2 = Number(ArrayArr[0])
        for (let j = 1; j < ArrayArr.length; j++) {
            sum2 /= Number(ArrayArr[j]);
        }
        console.log(sum2);
    }
}