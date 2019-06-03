var readLine = require("readline-sync");
var num1 = readLine.question("Enter the Number  :");
var ArrayArr = []
for (var i = 0; i < num1; i++) {
    var num2 = readLine.question("Enter the Value  :");
    ArrayArr.push(num2);
}
var operation = readLine.question("enter the operation   :");
var result = myfunction();
var result = ArrayArr.reduce(myfunction);
console.log(result);
function myfunction(v1, v2) {
    if (operation == "add") {
        return Number(v1) + Number(v2);
    }
    else if (operation == "sub") {
        return v1 - v2;
    }
    else if (operation == "multiple") {
        return v1 * v2;
    }
    else if (operation == "div") {
        return v1 / v2;
    }
}