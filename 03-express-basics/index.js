/* =====================================================
   📦 Express.js In-Memory CRUD (Foysal's version)
   -----------------------------------------------------
   Routes:
     GET    /           → Hello World
     GET    /about      → About page
     GET    /user       → Static JSON user
     GET    /users      → Shob user
     GET    /user/:id   → Ekjon user
     POST   /user       → Notun user create
     PUT    /user/:id   → User update
     DELETE /user/:id   → User delete
   ===================================================== */

// ─────────────────────────────────────────────
// 1️⃣  Setup
// ─────────────────────────────────────────────
const express = require("express");
const app = express();

// ─────────────────────────────────────────────
// 2️⃣  In-Memory Data (database er poriborte array)
// ─────────────────────────────────────────────
// 'let' use korechi, karon DELETE-e array reassign hoy (users = users.filter(...))
let users = [
    { id: 1, name: "Rahim", role: "Admin" },
    { id: 2, name: "Karim", role: "Editor" }
];

// ─────────────────────────────────────────────
// 3️⃣  Middleware
// ─────────────────────────────────────────────
// Client-er pathano JSON body ke read korar jonno (req.body).
// Eta route-gulor AGE thakte hobe, nahole req.body undefined hobe.
app.use(express.json());

// ─────────────────────────────────────────────
// 4️⃣  Basic / Static Routes
// ─────────────────────────────────────────────

// Home route: plain text response
app.get("/", (req, res) => {
    res.send("Hello World testing nodemon");
});

// About route: plain text response
app.get("/about", (req, res) => {
    res.send("This is the about page");
});

// Static user: fixed JSON object pathay
app.get("/user", (req, res) => {
    res.json({ id: 101, name: "Rahim", role: "admin" });
});

// ─────────────────────────────────────────────
// 5️⃣  READ: Ekjon user (Dynamic Route)
// ─────────────────────────────────────────────
// URL: GET /user/1  →  req.params.id = "1" (string)
app.get("/user/:id", (req, res) => {
    // URL theke asha id shobshomoy string, tai Number() diye convert
    const userId = Number(req.params.id);

    // Array theke matching user khuje ber kora (na pele undefined)
    const user = users.find(u => u.id === userId);

    if (user) {
        // User paoa gele: 200 OK + user data
        res.json(user);
    } else {
        // User na paoa gele: 404 Not Found
        res.status(404).json({ message: "User not found" });
    }
});

// ─────────────────────────────────────────────
// 6️⃣  CREATE: Notun user (POST)
// ─────────────────────────────────────────────
// Body example: { "name": "Salma", "role": "Editor" }
app.post("/user", (req, res) => {
    // Notun user object toiri
    const newUser = {
        id: users.length + 1,   // Notun id (ekhon array-r length + 1)
        name: req.body.name,    // Client-er pathano name
        role: req.body.role     // Client-er pathano role
    };

    // Array-te notun user add kora
    users.push(newUser);

    // 201 Created: notun item toiri hole ei status code
    res.status(201).json({ message: "New User created", data: newUser });
});

// ─────────────────────────────────────────────
// 7️⃣  READ: Shob user
// ─────────────────────────────────────────────
app.get("/users", (req, res) => {
    res.json(users);
});

// ─────────────────────────────────────────────
// 8️⃣  DELETE: User muche fela
// ─────────────────────────────────────────────
// URL: DELETE /user/1
app.delete("/user/:id", (req, res) => {
    const userId = Number(req.params.id);

    // Age check: user ache kina
    const user = users.find(u => u.id === userId);

    if (user) {
        // filter(): matching user bade baki shobai rakhe, notun array toiri kore
        users = users.filter(user => user.id !== userId);

        res.json({
            message: "User is Deleted and the remaining users are: ",
            data: users
        });
    } else {
        // User na thakle 404
        res.status(404).json({ message: "User not found in users" });
    }
});

// ─────────────────────────────────────────────
// 9️⃣  UPDATE: User er tothyo poriborton (PUT)
// ─────────────────────────────────────────────
// URL: PUT /user/1   Body example: { "role": "Super Admin" }
app.put("/user/:id", (req, res) => {
    const userId = Number(req.params.id);

    // Age check: user ache kina
    const user = users.find(u => u.id === userId);

    if (user) {
        // Body theke name & role alada kore neya (destructuring)
        const { name, role } = req.body;

        // Notun value thakle boshbe, na thakle ager value-i thakbe
        user.name = name || user.name;
        user.role = role || user.role;

        // Updated user ferot pathano
        res.json(user);
    } else {
        res.status(404).json({ message: "User was not found" });
    }
});

// ─────────────────────────────────────────────
// 🔟  Server Start
// ─────────────────────────────────────────────
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});