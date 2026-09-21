/**
 * Topic: Operators & Comparison Rules
 * Source: javascript.info (Chapters 2.8 - 2.9)
 */

// 1. Operator Quirks (Implicit Conversion)
console.log("--- Operator Behaviors ---");

// Binary '+' concatenates strings if any operand is a string
console.log("" + 1 + 0);       // "10"
console.log(4 + 5 + "px");     // "9px" (left-to-right: 4 + 5 = 9, then 9 + "px")
console.log("$" + 4 + 5);      // "$45"

// Math operators (-, *, /, %) always convert to numbers
console.log("" - 1 + 0);       // -1
console.log("6" / "2");        // 3
console.log("5" * "2");        // 10

// Unary plus (+) is a fast shorthand for Number()
const strValue = "50";
console.log(+strValue === 50); // true

// 2. Strict Equality (===) vs Loose Equality (==)
console.log("\n--- Equality Checks ---");
console.log(0 == false);       // true  (both converted to 0)
console.log(0 === false);      // false (different types: number vs boolean)

console.log("" == false);      // true
console.log("" === false);     // false

// 3. The null and undefined Comparison Rules
console.log("\n--- null vs undefined Edge Cases ---");

// Under abstract equality (==), null and undefined equal only each other and nothing else
console.log(null == undefined);  // true
console.log(null === undefined); // false

// Comparison operators (<, >, <=, >=) convert null to 0
console.log(null > 0);   // false (0 > 0 is false)
console.log(null == 0);  // false (equality check does NOT convert null to 0)
console.log(null >= 0);  // true  (null is converted to 0, 0 >= 0 is true)

// undefined becomes NaN in numeric comparisons (all checks return false)
console.log(undefined > 0);  // false
console.log(undefined < 0);  // false
console.log(undefined == 0); // false