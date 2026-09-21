/**
 * Topic: Variables, Data Types & Type Conversion
 * Source: javascript.info (Chapters 2.4 - 2.7)
 */

// 1. Variable Declarations: let vs const
let score = 10;
score = 15; // Re-assigning is allowed

const MAX_LIMIT = 100;
// MAX_LIMIT = 200; // TypeError: Assignment to constant variable

// 2. The 8 Basic Data Types in JavaScript
console.log("--- Primitive Data Types ---");
console.log(typeof "Hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof 9007199254740991n); // "bigint"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof Symbol("id"));   // "symbol"

// Known legacy bug from JS 1995: null returns "object"
console.log(typeof null);           // "object"

// Non-primitive type
console.log(typeof { name: "Alex" }); // "object"

// 3. Explicit Type Conversion
console.log("\n--- Explicit Conversion ---");

// String conversion
const num = 123;
console.log(String(num));           // "123"

// Numeric conversion
console.log(Number("  456  "));      // 456 (trims spaces)
console.log(Number("123abc"));       // NaN (fails to parse completely)
console.log(Number(true));           // 1
console.log(Number(false));          // 0
console.log(Number(null));           // 0
console.log(Number(undefined));      // NaN

// Boolean conversion
// Falsy values: 0, "", null, undefined, NaN
console.log(Boolean(0));             // false
console.log(Boolean(""));            // false
console.log(Boolean("0"));           // true (non-empty string is always truthy)
console.log(Boolean(" "));           // true (string with space is truthy)