/**
 * Topic: Functions, Expressions & Arrow Syntax
 * Source: javascript.info (Chapters 2.15 - 2.18)
 */

// 1. Function Declaration (Hoisted)
console.log("--- Function Declaration ---");
// Can be invoked before its definition due to hoisting
console.log(greet("Sam")); 

function greet(name) {
    return `Hello, ${name}!`;
}

// 2. Function Expression (Not Hoisted)
console.log("\n--- Function Expression ---");
// Calling sayBye() here would throw: ReferenceError: Cannot access before initialization
const sayBye = function (name) {
    return `Goodbye, ${name}!`;
};
console.log(sayBye("Sam"));

// 3. Arrow Functions
console.log("\n--- Arrow Functions ---");
// Implicit return for single-expression bodies
const add = (a, b) => a + b;
console.log(add(5, 7)); // 12

// Arrow function returning an object literal using parentheses
const createUser = (role = "guest") => ({ role });
console.log(createUser()); // { role: "guest" }