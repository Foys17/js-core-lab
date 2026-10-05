# 🚀 Express.js Basics & Routing Guide

## ১. ভূমিকা (Introduction)

Express.js হলো Node.js-এর একটি জনপ্রিয় ও হালকা (minimalist) ওয়েব ফ্রেমওয়ার্ক। এটি সার্ভার তৈরি, রাউটিং এবং এপিআই (API) ডেভেলপমেন্টকে সহজ ও সুশৃঙ্খল করে তোলে।

---

## 🔄 2. Request-Response Cycle

Server-er mul kaj client (browser/app) theke request grohon kora ebong response pathano:

1. **Client:** Server-e HTTP Request pathay.
2. **Server (Express):** Request analyse kore route onujayi process kore.
3. **Response:** Client-er kache HTTP Response (Text/JSON/HTML) pathay.

---

## 🛠️ 3. Basic Server Setup

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// Server start kora
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## 🛣️ 4. Static Routing & Response Methods

- `res.send()`: Plain text ba HTML pathate babohar hoy.
- `res.json()`: JavaScript Object ba Array-ke JSON hishebe pathate babohar hoy.

```javascript
// Plain text response
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

// JSON response
app.get("/user", (req, res) => {
  res.json({ id: 101, name: "Rahim", role: "admin" });
});
```

---

## 🔍 5. Dynamic Routing (`req.params`)

URL-er kono ongsho dynamic ba change hote pare emon hole colon (`:`) babohar kora hoy:

- **Route path:** `"/user/:id"`
- **Client request URL:** `http://localhost:3000/user/1`
- **Data access:** `req.params.id` (Eti shobshomoy **String** hishebe ashe).

### 🔢 Type Conversion

URL parameter string thakay number-er shathe compare korar age convert korte hoy:

```javascript
const userId = Number(req.params.id);
```

---

## 🎯 6. Array Data Search (`Array.find()`)

Array theke specific object khujte `.find()` method babohar kora hoy.

### ⚠️ Arrow Function Return Rule

**Implicit Return:** Curly brackets `{}` chara ek line-e likhle auto-return hoy:

```javascript
const user = users.find(u => u.id === userId);
```

**Explicit Return:** Curly brackets `{}` dile oboshshoi `return` keyword likhte hoy:

```javascript
const user = users.find(u => {
  return u.id === userId;
});
```

---

## 🚫 7. Error Handling (404 Status Code)

Jodi khoja data na paoa jay (`undefined`), tokhon appropriate HTTP status code shoho message pathate hoy:

| Status Code | Meaning |
|-------------|---------|
| `200` | Successful request (Default) |
| `404` | Not Found (Data ba route khuje na pele) |

```javascript
if (user) {
  res.json(user);
} else {
  res.status(404).json({ message: "User not found" });
}
```

---

## 💻 8. Complete Working Code (`index.js`)

```javascript
const express = require("express");
const app = express();

// Dummy in-memory data
const users = [
  { id: 1, name: "Rahim", role: "Admin" },
  { id: 2, name: "Karim", role: "Editor" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.get("/user", (req, res) => {
  res.json({ id: 101, name: "Rahim", role: "admin" });
});

// Dynamic route with error handling
app.get("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```