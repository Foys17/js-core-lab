/**
 * ====================================================================
 * MODERN JAVASCRIPT ESSENTIALS FOR BACKEND (NODE.JS & EXPRESS)
 * ====================================================================
 * 
 * ফোল্ডার: 02-es6-and-backend-prep/
 * ফাইল: 01-core-summary.js
 * 
 * সূচিপত্র:
 * 1. Arrow Functions (সংক্ষিপ্ত সিনট্যাক্স)
 * 2. Array Methods (.map() & .filter()) এবং Method Chaining
 * 3. Object & Array Destructuring (ডাটা সহজে বের করা)
 * 4. Spread Operator (...) (ইমিউটেবল কপি ও আপডেট)
 * 5. Asynchronous JavaScript (Promises, async/await, try...catch)
 * 6. Module System (CommonJS: require & module.exports)
 */

console.log("=== আধুনিক জাভাস্ক্রিপ্ট সামারি শুরু ===\n");

// --------------------------------------------------------------------
// ১. ARROW FUNCTIONS 🏹
// --------------------------------------------------------------------
// সাধারণ নিয়ম:
const addTraditional = function (a, b) {
  return a + b;
};

// Arrow Function: বডিতে এক লাইন থাকলে কার্লি ব্রেস {} ও return বাদ দেওয়া যায়
const addArrow = (a, b) => a + b;

console.log("১. Arrow Function যোগফল:", addArrow(5, 10)); // ১৫


// --------------------------------------------------------------------
// ২. ARRAY METHODS: .filter() এবং .map() 🔄
// --------------------------------------------------------------------
// .filter(): শর্ত যাচাই করে নতুন অ্যারে দেয় (দৈর্ঘ্য কম বা সমান হতে পারে)
// .map(): প্রতিটি উপাদান রূপান্তর করে সমদৈর্ঘ্যের নতুন অ্যারে দেয়

const products = [
  { id: 1, name: "Keyboard", price: 1200, inStock: true },
  { id: 2, name: "Mouse", price: 600, inStock: false },
  { id: 3, name: "Mousepad", price: 300, inStock: true },
];

// মেথড চেইনিং: স্টকে থাকা পণ্যের নাম বের করা
const availableProductNames = products
  .filter((product) => product.inStock === true) // ফিল্টার
  .map(({ name }) => name);                     // প্যারামিটারে ডিস্ট্রাকচারিং ও ম্যাপ

console.log("২. স্টকে থাকা পণ্যসমূহ:", availableProductNames);
// আউটপুট: ["Keyboard", "Mousepad"]


// --------------------------------------------------------------------
// ৩. DESTRUCTURING 📦
// --------------------------------------------------------------------
// ৩.১ Object Destructuring
const reqBody = {
  username: "karim99",
  email: "karim@test.com",
  role: "user"
};

// অবজেক্টের কী (key) ধরে ভ্যারিয়েবল আলাদা করা
const { username, email } = reqBody;
console.log("৩.১ ইউজারনেম:", username, "| ইমেইল:", email);

// নাম পরিবর্তন (Renaming) করা: key: newVariableName
const { role: userRole } = reqBody;
console.log("৩.১ পরিবর্তিত নামে রোল:", userRole);

// ৩.২ Array Destructuring (অবস্থান বা ইনডেক্স অনুযায়ী)
const coordinates = [23.8103, 90.4125];
const [latitude, longitude] = coordinates;
console.log("৩.২ কো-অর্ডিনেট:", latitude, longitude);


// --------------------------------------------------------------------
// ৪. SPREAD OPERATOR (...) 🌟
// --------------------------------------------------------------------
// মূল অবজেক্টকে অপরিবর্তিত রেখে নতুন ফিল্ড যোগ বা আপডেট (Immutability)
const originalUser = {
  id: 101,
  name: "Rahim",
  isVerified: false
};

const updatedUser = {
  ...originalUser,       // আগের সব ফিল্ড ছড়িয়ে দেওয়া হলো
  isVerified: true,      // আগের মান ওভাররাইট হলো
  role: "admin"          // নতুন ফিল্ড যোগ হলো
};

console.log("৪. মূল অবজেক্ট:", originalUser);
console.log("৪. আপডেটেড অবজেক্ট:", updatedUser);


// --------------------------------------------------------------------
// ৫. ASYNCHRONOUS JS: ASYNC/AWAIT & TRY...CATCH ⏳
// --------------------------------------------------------------------
// ডাটাবেজ বা এপিআই কলের জন্য অ্যাসিনক্রোনাস ফাংশন ব্যবহার হয়
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Farhan", status: "Active" });
      } else {
        reject(new Error("ভুল ইউজার আইডি!"));
      }
    }, 500);
  });
};

const handleGetUser = async () => {
  try {
    console.log("৫. ডাটা লোড হচ্ছে...");
    const user = await fetchUserData(1);
    console.log("৫. ডাটা সফলভাবে পাওয়া গেছে:", user);
  } catch (error) {
    console.error("৫. ত্রুটি:", error.message);
  }
};

handleGetUser();


// --------------------------------------------------------------------
// ৬. MODULE SYSTEM (CommonJS) 🔗
// --------------------------------------------------------------------
// ১টি ফাইল থেকে এক্সপোর্ট করার নিয়ম:
// module.exports = { addArrow, products };

// অন্য ফাইলে ইমপোর্ট করার নিয়ম:
// const { addArrow } = require("./01-core-summary.js");
// পাথ নির্দেশিকা:
// "./"  = বর্তমান ফোল্ডার
// "../" = এক ধাপ পেছনের ডিরেক্টরি