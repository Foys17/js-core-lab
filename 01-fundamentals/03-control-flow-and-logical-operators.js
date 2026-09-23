/**
 * Topic: Control Flow, Logical Operators & Nullish Coalescing
 * Source: javascript.info (Chapters 2.10 - 2.14)
 */

// 1. Short-Circuit Evaluation (|| vs &&)
console.log("--- Short-Circuit Evaluation ---");
// Logical OR (||) finds and returns the first truthy value
console.log(null || 0 || "Default User" || "Admin"); // "Default User"

// Logical AND (&&) finds and returns the first falsy value
console.log(1 && "data" && null && 5); // null

// 2. Nullish Coalescing (??) vs Logical OR (||)
console.log("\n--- Nullish Coalescing (??) ---");
let userCount = 0;

// Logical OR treats 0 as falsy, unintentionally falling back to default value
console.log(userCount || 10); // 10

// Nullish coalescing only falls back for null or undefined (0 is treated as defined)
console.log(userCount ?? 10); // 0

// 3. Loops and Labels
console.log("\n--- Loop Labels ---");
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
        break outerLoop; // Breaks out of both loops immediately
    }
    }
}

// 4. Switch Statement (Strict Equality Check)
console.log("\n--- Switch Equality ---");
const arg = "3";
switch (arg) {
    case 3:
        console.log("Number 3");
        break;
    case "3":
    // Matches because switch uses strict equality (===)
        console.log("String '3' matched via strict equality (===)");
        break;
}