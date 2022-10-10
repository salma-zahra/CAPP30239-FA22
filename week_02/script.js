/* 
This is a javascript example for
week 2.
*/

// inline comment

/*
let num = 100; //integer

function foo() {
    let num2 = 200;
    console.log(num2)
};

foo();

// option 1
//let anonFun = function() {
//    console.log("hello");
//};

// option 2
let anonFun = () => console.log("hello");
*/

(function() {
    console.log("hi")
})();

let person = "Summer";

function people(peopleName) {
    console.log("Hello" + peopleName);
};

people(person);

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[1]);

// Set item in array
arr[1] = "barbar"

console.log(arr);

// Add item to the end of the array
arr.push("car");

// Removing an item from the array (index, deleteCount)
arr.splice(2,2);
console.log(arr);

for (let item of arr) {
    console.log(item);
}

for (let i in arr) {
    console.log(i + " " + arr[i]);
}

// Loop through each item in the array with its index - forEach()
arr.forEach((item,i) => console.log(i + " " + item));

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

console.log(obj1.name);
console.log(obj1["name"]);

obj1.job = "Barista";

console.log(obj1);

// Loop through all properties

for (let key in obj1) {
    let value = obj1[key];
    console.log(`${key}: ${value}`);
}

console.log(`hello ${obj1["name"]} ${num}`); //string literal

for (let i = 0; i < 10; i++) {
    let x = 75;
}

if (x > 50) {
    console.log("Above avg");
} else if (x > 5) {
    console.log ("Below avg")
} else {
    console.log ("Really below avg")    
};

// ternary operator (aka inline if else)
// let y = (x > 50)

// traverse DOM
let example = document.getElementById("example");

example.innerHTML += "Hello world!"