var person = [{ name: "ajith", rollno: 10, std_id: 3 }, { name: "arun", rollno: 17, std_id: 5 },
{ name: "raghu", rollno: 14, std_id: 1 }, { name: "vengi", rollno: 11, std_id: 2 }, { name: "pavithra", rollno: 12, std_id: 4 }]
//console.log(person);
var arraysort = person.sort(function (a, b) { return a.std_id - b.std_id });
let array1 = [];
//console.log(arraysort);
for (i = 0; i < person.length; i++) {
  array1.push(arraysort.slice(i, i + 2));
  //console.log(name1);
  i++;
};
console.log(array1)
