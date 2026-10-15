# 🛡️ Express.js Middleware System, Error Handling & Third-Party Packages

> Ei module-e amra Express.js-er **Middleware Pipeline** kivabe kaj kore (top-to-bottom), Built-in, Custom (Application-level & Route-level), Third-party (`cors`, `morgan`), **404 Catch-all**, ebong **Global Error Handling Middleware** bistarito vabe shikhechi.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)

---

## 📑 Table of Contents

**Part 1: Middleware Fundamentals**
1. [Middleware Ki? (Introduction)](#-1-middleware-ki-introduction)
2. [Sequential Pipeline & `next()`](#-2-sequential-pipeline--next)
3. [Early `return` Rule (Double Response Bug)](#-3-early-return-rule-double-response-bug)

**Part 2: Types of Middleware**

4. [Built-in Middleware (`express.json()`)](#-4-built-in-middleware-expressjson)
5. [Application-Level Custom Middleware (Logger)](#-5-application-level-custom-middleware-logger)
6. [Route-Level Custom Middleware (`checkAge`)](#-6-route-level-custom-middleware-checkage)
7. [Safe Destructuring & Fallback (`||`)](#-7-safe-destructuring--fallback-)
8. [Third-Party Middleware (`cors` & `morgan`)](#-8-third-party-middleware-cors--morgan)

**Part 3: Error Handling & Architecture**

9. [404 Catch-All Middleware](#-9-404-catch-all-middleware)
10. [Global Error Handling Middleware (4 Parameters)](#-10-global-error-handling-middleware-4-parameters)
11. [4XX & 5XX HTTP Status Codes Cheat Sheet](#-11-4xx--5xx-http-status-codes-cheat-sheet)
12. [Middleware Order / Architecture](#-12-middleware-order--architecture)
13. [API Testing (Postman / cURL)](#-13-api-testing-postman--curl)
14. [Best Practices & Common Mistakes](#-14-best-practices--common-mistakes)
15. [Complete Working Code (`index.js`)](#-15-complete-working-code-indexjs)
16. [Next Step: PostgreSQL Database Integration](#-16-next-step-postgresql-database-integration)

---

# 🧱 Part 1: Middleware Fundamentals

## 🧩 1. Middleware Ki? (Introduction)

Middleware holo emon ekta function ja Client-er **Request (`req`)** ashar por ebong Server theke final **Response (`res`)** pathanor majhkhane kaj kore.

Eke ekta office building-er **Security Checkpost** ba **Filter Pipeline**-er shathe tulona kora jay.

### 🛠️ Middleware-er 3-ti Parameter

```javascript
const myMiddleware = (req, res, next) => {
  // Logic ekhane thakbe
  next(); // Porer step-e jawar onumoti
};
```

| Parameter | Kaj |
|-----------|-----|
| `req` (Request Object) | Client-er pathano shob data (body, params, headers) |
| `res` (Response Object) | Client-ke data ba error ferot pathanor tool |
| `next` (Function) | Request-ke porer middleware ba route handler-e pathanor switch |

---

## ⏬ 2. Sequential Pipeline & `next()`

Express.js file-er upor theke niche (**Top-to-Bottom**) line-by-line code execute kore:

1. Request prothom middleware-e dhuke.
2. Jodi middleware `next()` call kore, taholei shudhu request porer step-e jay.
3. Jodi `next()` call na kora hoy ebong kono `res.json()`-o na pathano hoy, tahole Postman/Browser **infinite loading (hang)** hoye thakbe!

---

## 🛑 3. Early `return` Rule (Double Response Bug)

Middleware ba route-er vitore `res.status(...).json(...)` dile response client-er kache chole jay, kintu JavaScript function thamay na — nicher line-gulo execute korte thake!

```javascript
// ❌ Vul Poddhoti (Crash korbe)
if (!age) {
  res.status(400).json({ message: "Please enter an age" });
}
// Niche giye abar res.status(403) ba next() call korar cheshta korbe!
```

Eki request-e duibar response pathate gele Express terminal-e ei error dey:

```text
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
```

```javascript
// ✅ Shothik Poddhoti (return babohar kora)
if (!age) {
  return res.status(400).json({ message: "Please enter an age" });
}
```

> 💡 `return` dile response pathanor shathe shathe function shekhanei puro-puri theme jay. (`break` shudhu loop/switch-e kaj kore, function-e `return` lage.)

---

# ⚙️ Part 2: Types of Middleware

## 📦 4. Built-in Middleware (`express.json()`)

Client jokhon `POST` ba `PUT` request-e JSON data pathay, Node.js sheta **Raw Stream** hishebe pay. `express.json()` shei raw data parse kore JavaScript Object baniye `req.body`-te boshay.

```javascript
app.use(express.json());
```

> ⚠️ **Mone rakhte hobe:** Eta oboshshoi shob route-er **upore** likhte hobe. Na dile `req.body` hobe `undefined`.

---

## 📝 5. Application-Level Custom Middleware (Logger)

`app.use()` diye kono middleware likhle sheta **Application-level** hoy — mane server-er protiti route-e request jawar age eta run korbe.

```javascript
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

---

## 🛡️ 6. Route-Level Custom Middleware (`checkAge`)

Shob route-e na chalie shudhu nirdishto kono route-e security ba validation dite chaile **Route-level middleware** babohar kora hoy.

### 💻 Middleware Definition

```javascript
const checkAge = (req, res, next) => {
  const { age } = req.body || {};

  // 1. Validation: Age field pathano hoyeche kina (400 Bad Request)
  if (!age) {
    return res.status(400).json({ message: "Please enter an age" });
  }

  // 2. Authorization/Eligibility: Age 18+ kina (403 Forbidden)
  if (age >= 18) {
    return next(); // Shob thik thakle main route-e jabe
  } else {
    return res.status(403).json({ message: "You are not eligible for license" });
  }
};
```

### 🔗 Route-e Jure Deya

Route path (`'/license'`) ebong final callback `(req, res) => {}`-er majhkhane middleware-ti boshano hoy:

```javascript
app.post("/license", checkAge, (req, res) => {
  const { age } = req.body;
  res.status(201).json({ message: "Your license was created", data: age });
});
```

> ⚠️ **Variable Scope Note:** `checkAge` function-er vitore declare kora `const { age }` shudhu `checkAge`-er vitorei simaboddho. Tai `app.post`-er callback-e `age` pete hole shekhaneo `const { age } = req.body;` likhte hoy.

---

## 🧰 7. Safe Destructuring & Fallback (`||`)

### 🔹 Object Destructuring (`{}`)

`const { age } = req.body;` ebong `const age = req.body.age;` ekdom eki kaj kore. Object theke shorashori property ber kore variable banate `{}` babohar hoy.

### 🔹 `req.body || {}` Keno Dorkar?

Client jodi Postman theke ekdom faka body (none) pathay, tahole `req.body` hoye jay `undefined`. Tokhon `const { age } = undefined` likhle JavaScript **TypeError** diye server crash koray (500 Internal Server Error)!

```javascript
const { age } = req.body || {};
```

Ekhane `req.body` jodi `undefined` (Falsy) hoy, `||` (OR operator) default hishebe faka object `{}` beche ney. Fole server crash kore na!

---

## 🌐 8. Third-Party Middleware (`cors` & `morgan`)

NPM theke install kore babohar kora middleware-ke **Third-party middleware** bole.

```bash
npm install cors morgan
```

### 1️⃣ `cors` (Cross-Origin Resource Sharing) — Office-er Security Guard 👮‍♂️

- **Shomoshsha:** Backend cholche `localhost:3000`-e, ar React Frontend cholbe `localhost:5173`-e. Duto alada port (Origin) dekhe Browser security-r karone data atke dey (**CORS Error**).
- **Shomadhan:** `app.use(cors())` browser-ke onumoti dey jate onno port/domain thekeo data neya jay.

### 2️⃣ `morgan` — Office-er Entry Khata / CCTV 📹

Amader custom logger-er professional version. Protiti request-er method, URL, status code, ebong koto millisecond shomoy legeche ta terminal-e rongin kore dekhay.

`morgan('dev')`: `'dev'` holo predefined format ja development-er shomoy colorful log dey:

- 🟢 **Green:** 2xx (Success)
- 🟡 **Yellow:** 4xx (Client Error)
- 🔴 **Red:** 5xx (Server Error)

```javascript
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
```

---

# 🛑 Part 3: Error Handling & Architecture

## 🔍 9. 404 Catch-All Middleware

Client jodi emon kono URL-e hit kore ja amader code-e nei (jemon: `GET /unknown-route`), tokhon Express-er default HTML error na dekhiye sundor **JSON 404** pathanor jonno eta babohar hoy.

```javascript
// Shob valid route-er NICHE boshbe
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});
```

---

## 🚨 10. Global Error Handling Middleware (4 Parameters)

Server-er jekono route ba middleware-e unexpected crash ba error hole puro server jate bondho na hoye jay, shejonno shobar sheshe ekta **Safety Net** rakha hoy.

### 🔑 4-ti Parameter-er Rohoshyo

Normal middleware-e 3-ti parameter `(req, res, next)` thake. Kintu 4-ti parameter `(err, req, res, next)` dekhlei Express bujhe ney eta **Global Error Handler**!

```javascript
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
```

### ⚡ Route theke Error Trigger Kora (`next(error)`)

`next()` khali call korle porer shadharon route-e jay. Kintu `next(error)`-er vitore kichu pass korle Express majhkhaner shob shadharon route skip kore shoja 4-parameter-er Global Error Handler-e jump kore!

```javascript
app.get("/test-error", (req, res, next) => {
  const error = new Error("Database connection failed!");
  error.status = 500;
  next(error); // Shorashori Global Error Handler-e pathabe
});
```

---

## 📋 11. 4XX & 5XX HTTP Status Codes Cheat Sheet

| Status Code | Name | Meaning & Use Case |
|-------------|------|--------------------|
| **200 OK** | Success | Normal GET/PUT/DELETE request shofol hole |
| **201 Created** | Created | POST request-e notun resource (jemon License) toiri hole |
| **400 Bad Request** | Client Error | Client proyojoniyo data (jemon `age`) na pathale ba vul format dile |
| **401 Unauthorized** | Unauthenticated | Login chara ba Token chara request korle |
| **403 Forbidden** | Not Allowed | User-ke chena geche kintu onumoti nei (jemon age < 18) |
| **404 Not Found** | Not Found | Route ba khoja data server-e na thakle |
| **500 Internal Server Error** | Server Error | Code crash, database fail ba unexpected server bug hole |

---

## 🏗️ 12. Middleware Order / Architecture

Express file-e code shajano-r **Strict Order** (upor theke niche):

```text
1. Imports (express, cors, morgan)
       ⬇️
2. Global & Built-in Middleware (cors, morgan, express.json)
       ⬇️
3. Custom Middleware Definitions (checkAge)
       ⬇️
4. All Application Routes (GET /, POST /license, GET /test-error)
       ⬇️
5. 404 Catch-All Middleware (kono route match na korle ekhane ashbe)
       ⬇️
6. Global Error Handler (err, req, res, next) — Shobar sheshe!
       ⬇️
7. app.listen(PORT)
```

---

## 🧪 13. API Testing (Postman / cURL)

```bash
# 1. Valid License Request (201 Created)
curl -X POST http://localhost:3000/license \
  -H "Content-Type: application/json" \
  -d '{"age": 22}'

# 2. Underage Request (403 Forbidden)
curl -X POST http://localhost:3000/license \
  -H "Content-Type: application/json" \
  -d '{"age": 16}'

# 3. Missing Age Request (400 Bad Request)
curl -X POST http://localhost:3000/license \
  -H "Content-Type: application/json" \
  -d '{}'

# 4. Trigger Global Error Handler (500 Internal Server Error)
curl http://localhost:3000/test-error

# 5. Unknown Route (404 Not Found)
curl http://localhost:3000/does-not-exist
```

---

## 🧠 14. Best Practices & Common Mistakes

| ❌ Common Mistake | ✅ Best Practice Fix |
|-------------------|----------------------|
| Middleware-e `next()` call korte bhule jawa | Request forward korte oboshshoi `next()` call koro |
| `if (!age) { res.status(400)... }` (`return` chara) | Shobshomoy `return res.status(400)...` likho jate niche-r code run na kore |
| `const { age } = req.body` (faka body-te crash) | `const { age } = req.body \|\| {}` babohar koro |
| 404 Middleware-ke route-gulor upore rakha | 404 shobshomoy boidho route-gulor niche ebong Global Error Handler-er upore rakho |
| Error Handler-e 3-ti parameter `(err, req, res)` deya | Oboshshoi 4-ti parameter `(err, req, res, next)` dite hobe, nahole Express eke chinbe na |

---

## 💻 15. Complete Working Code (`index.js`)

Shompurno code-ti [`index.js`](./index.js) file-e deya ache.

---

## 🐘 16. Next Step: PostgreSQL Database Integration

Step 2 (Middleware System) shompurno shesh! Porer module-e amra **PERN stack**-er PostgreSQL database setup korbo ebong Express-er shathe real database connect kore permanent CRUD toiri korbo.

---

📌 *Notes by [@Foys17](https://github.com/Foys17), part of the `js-core-lab` learning journey.*