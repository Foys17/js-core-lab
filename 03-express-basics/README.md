# 🚀 Express.js Basics, Routing & In-Memory CRUD

> Ei module-e amra Express.js diye server, routing, dynamic route, error handling shikhe **memory-te (JavaScript Array)** data rekhe shompurno **CRUD** (Create, Read, Update, Delete) API baniyechi, ebong **Nodemon** diye developer workflow setup korechi.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Status](https://img.shields.io/badge/Status-Learning-blue)

---

## 📑 Table of Contents

**Part 1: Basics & Routing**
1. [ভূমিকা (Introduction)](#-১-ভূমিকা-introduction)
2. [Request-Response Cycle](#-2-request-response-cycle)
3. [Basic Server Setup](#-3-basic-server-setup)
4. [Static Routing & Response Methods](#-4-static-routing--response-methods)
5. [Dynamic Routing (req.params)](#-5-dynamic-routing-reqparams)
6. [Array Data Search (.find())](#-6-array-data-search-arrayfind)
7. [Error Handling (404)](#-7-error-handling-404-status-code)

**Part 2: In-Memory CRUD**

8. [In-Memory Data Storage](#-8-in-memory-data-storage)
9. [Middleware: express.json()](#-9-middleware-expressjson)
10. [GET all & POST (Create)](#-10-get-all--post-create)
11. [PUT (Update)](#-11-put-method-put-userid)
12. [DELETE](#-12-delete-method-delete-userid)
13. [HTTP Status Codes Cheat Sheet](#-13-http-status-codes-cheat-sheet)

**Part 3: Workflow & Practice**

14. [Nodemon Setup](#-14-developer-workflow-nodemon-setup)
15. [API Testing](#-15-api-testing)
16. [Best Practices & Common Mistakes](#-16-best-practices--common-mistakes)
17. [Practice Tasks](#-17-practice-tasks)
18. [Complete Working Code](#-18-complete-working-code-indexjs)
19. [Next Step: PostgreSQL](#-next-step-postgresql--nodejs)

---

# 🧱 Part 1: Basics & Routing

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

> ⚠️ `1 === "1"` JavaScript-e `false`. Convert na korle `find()` kichui khuje pabe na.

---

## 🎯 6. Array Data Search (`Array.find()`)

Array theke specific object khujte `.find()` method babohar kora hoy. Match na pele `undefined` return kore.

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

> 💡 Ei `GET /user/:id` route-i CRUD-er **R (Read one)**. Tai porer part-e eta abar likhchi na.

---

# 🗄️ Part 2: In-Memory CRUD

## 📌 8. In-Memory Data Storage

Database chara shuru korar shomoy amra memory-te ekta array baniye data rakhi.

```javascript
let users = [
  { id: 1, name: "Rahim", role: "Admin" },
  { id: 2, name: "Karim", role: "Editor" },
];
```

> ⚠️ **Key Note:** Ekhane `const`-er poriborte `let` use kora hoyeche, karon DELETE-e `users = users.filter(...)` kore **array-ke notun kore assign** korte hoy. `const` hole re-assignment error dey.
> (`const` diye `push()` ba `splice()` kora jay, kintu `users = ...` kora jay na.)

> ⚠️ **Limitation:** Memory-r data server restart hole **hariye jay**. Tai eta shudhu shekhar jonno. Real project-e database lage (porer module: PostgreSQL).

---

## 🧩 9. Middleware: `express.json()`

POST ba PUT-e client JSON body pathay. Express default-e sei body porte pare na. Tai app-er shuru-te eta lagate hoy:

```javascript
app.use(express.json());
```

`express.json()` na dile `req.body` hobe `undefined`. Ar eta **route-gulor age** likhte hobe.

---

## 📖 10. GET all & POST (Create)

### GET /users: shob user dekha

```javascript
app.get("/users", (req, res) => {
  res.json(users);
});
```

### POST /user: notun user create

```javascript
app.post("/user", (req, res) => {
  const { name, role } = req.body;

  // Validation: name & role dutoi lagbe
  if (!name || !role) {
    return res.status(400).json({ message: "name and role are required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    role,
  };

  users.push(newUser);
  res.status(201).json({ message: "User created", data: newUser });
});
```

> 💡 **Tip:** `users.length + 1` diye id banano risky, karon kono user delete korle duplicate id hote pare. Tai **shesh user-er id + 1** use kora hoyeche.

---

## 🔄 11. PUT Method (`PUT /user/:id`)

Kono user-er tothyo update korar jonno.

### 💡 Core Concepts

Duto source theke data ase:

| Source | Kaj |
|--------|-----|
| `req.params.id` | Kake update korbo (User ID) |
| `req.body` | Notun ki tothyo boshbe (name, role) |

- **Destructuring:** `const { name, role } = req.body;`
- **Partial Update / Fallback (`||`):** Client jodi shudhu `role` pathay, `name` hobe `undefined`. Ager data jate muche na jay, tai `user.name = name || user.name` use kora hoy.

### 💻 Code

```javascript
app.put("/user/:id", (req, res) => {
  const userId = Number(req.params.id);

  // 1. User ache kina check
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User was not found" });
  }

  // 2. Notun data thakle boshabe, na thakle ager tai thakbe
  const { name, role } = req.body;
  user.name = name || user.name;
  user.role = role || user.role;

  // 3. Updated user return
  res.json({ message: "User updated successfully", data: user });
});
```

> 📝 **PUT vs PATCH:** Technically **PUT** mane puro object replace kora, ar **PATCH** mane shudhu kichu field update kora. Amader code-ta partial update kore, tai eta aschole **PATCH-er moto** kaj kore. Real project-e `app.patch(...)` use kora bhalo. Interview-te eta jiggesh kora hoy!

> ⚠️ **`||` vs `??`:** `||` falsy value (`""`, `0`, `false`) ke-o ignore kore. Jodi `0` ba empty string valid hoy, tahole `??` (nullish coalescing) use koro: `user.name = name ?? user.name`.

---

## 🗑️ 12. DELETE Method (`DELETE /user/:id`)

Nirdishto id-r user-ke array theke remove korar jonno.

### 💡 Core Concepts

- **`req.params.id`**: URL theke dynamic id capture kore. Eta **shobshomoy string**, tai `Number()` diye convert korte hoy.
- **`.find()`**: Age dekhte hoy user ache kina. Na thakle `404 Not Found`.
- **`.filter()` vs `.pop()`**: `.pop()` shudhu **shesh item** muche. Nirdishto item baad dite `.filter()` use kora hoy.

### 💻 Code

```javascript
app.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);

  // 1. User ache kina
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found in users" });
  }

  // 2. filter diye matching user baad
  users = users.filter((u) => u.id !== userId);

  res.json({
    message: "User deleted successfully",
    remainingUsers: users,
  });
});
```

---

## 📋 13. HTTP Status Codes Cheat Sheet

| Code | Meaning | Kokhon babohar kori |
|------|---------|---------------------|
| `200 OK` | Success | GET, PUT, DELETE shothik bhabe complete hole |
| `201 Created` | Created | POST diye notun item create hole |
| `204 No Content` | Success, kono body nei | DELETE-e kichu return na korte chaile |
| `400 Bad Request` | Client Error | Vul ba faka data pathale |
| `404 Not Found` | Not Found | Requested ID-r user khuje na pele |
| `500 Internal Server Error` | Server Error | Server-e unexpected bug hole |

---

# ⚙️ Part 3: Workflow & Practice

## ⚙️ 14. Developer Workflow: Nodemon Setup

Barbar `Ctrl + C` diye server off/on na kore, code save korlei jate server nije restart hoy, tar jonno **nodemon**.

**Step 1: devDependency hishebe install**

```bash
npm install -D nodemon
```

> `devDependency` mane eta shudhu development-e dorkar, production server-e lage na.

**Step 2: `package.json`-er scripts update**

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

**Step 3: Server run**

```bash
npm run dev
```

Ekhon `Ctrl + S` chaplei nodemon auto restart nibe ⚡

| Command | Kokhon |
|---------|--------|
| `npm run dev` | Development-e (auto restart) |
| `npm start` | Production-e (normal run) |

---

## 🧪 15. API Testing

Postman / Thunder Client (VS Code extension) ba terminal-e `curl` diye test korte paro.

```bash
# Shob user
curl http://localhost:3000/users

# Ekjon user
curl http://localhost:3000/user/1

# Notun user
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Salma","role":"Editor"}'

# Update
curl -X PUT http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -d '{"role":"Super Admin"}'

# Delete
curl -X DELETE http://localhost:3000/user/2
```

> 💡 POST/PUT-e `Content-Type: application/json` header **na dile** `req.body` empty ashbe.

---

## 🧠 16. Best Practices & Common Mistakes

### ✅ Best Practices

- **Type Casting:** `req.params` shob shomoy string. Compare-er age `Number()` ba `parseInt()`.
- **Variable Shadowing erano:** `find`/`filter`-er callback-e alada naam rakho (`u => u.id !== userId`), jate baire-r `user` variable-er sathe clash na hoy.
- **Graceful Error Handling:** Age data ache kina check koro, tahole software crash korbe na.
- **Early `return`:** Error response-e `return res.status(...)` likho, nahole code niche cholte thakbe.
- **Validation:** POST/PUT-e client-er data kokhono blindly bishshash koro na.

### ❌ Common Mistakes

| Mistake | Fix |
|---------|-----|
| `req.body` undefined | `app.use(express.json())` lagao |
| `users.find(u => u.id === req.params.id)` kaj kore na | `Number(req.params.id)` kore nao (`1 !== "1"`) |
| `const users = [...]` diye delete-e reassign error | `let` use koro |
| Ekta route-e duibar `res.json()` | `return` use koro, "Cannot set headers after they are sent" error ashbe na |
| Arrow function-e `{}` diye `return` bhule jawa | Implicit return (`{}` chara) ba explicit `return` likho |

---

## 🎯 17. Practice Tasks

1. `GET /users?role=Admin`: query string diye filter koro (`req.query.role`).
2. POST-e duplicate name check koro, thakle `409 Conflict` pathao.
3. DELETE-e `204 No Content` return koro.
4. `PUT`-ke `PATCH`-e convert koro.
5. Ekta `GET /health` route banao jeta `{ status: "ok" }` dey.

---

## 💻 18. Complete Working Code (`index.js`)

```javascript
const express = require("express");
const app = express();
const PORT = 3000;

// JSON body parse korar jonno (route-gulor AGE)
app.use(express.json());

// In-memory data (DELETE-e reassign hoy, tai let)
let users = [
  { id: 1, name: "Rahim", role: "Admin" },
  { id: 2, name: "Karim", role: "Editor" },
];

// ---------- Basic & Static Routes ----------
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("This is the about page");
});

app.get("/user", (req, res) => {
  res.json({ id: 101, name: "Rahim", role: "admin" });
});

// ---------- CRUD ----------

// READ: shob user
app.get("/users", (req, res) => {
  res.json(users);
});

// READ: ekjon user (dynamic route + error handling)
app.get("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

// CREATE: notun user
app.post("/user", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "name and role are required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    role,
  };

  users.push(newUser);
  res.status(201).json({ message: "User created", data: newUser });
});

// UPDATE
app.put("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User was not found" });
  }

  const { name, role } = req.body;
  user.name = name || user.name;
  user.role = role || user.role;

  res.json({ message: "User updated successfully", data: user });
});

// DELETE
app.delete("/user/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found in users" });
  }

  users = users.filter((u) => u.id !== userId);

  res.json({
    message: "User deleted successfully",
    remainingUsers: users,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

---

## 🐘 Next Step: PostgreSQL + Node.js

Memory-r array-r jaygay ekhon real database lagbe. Porer module-e shikhbo:

- PostgreSQL install ebong setup
- `pg` package diye Node.js connect kora
- SQL query diye CRUD (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)

---

> 📌 *Notes by [@Foys17](https://github.com/Foys17), part of the `js-core-lab` learning journey.*