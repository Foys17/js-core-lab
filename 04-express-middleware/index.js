/* =====================================================
   🛡️ Express.js Middleware & Error Handling (Foysal's version)
   -----------------------------------------------------
   Features & Routes:
     - Global Middleware : cors(), morgan('dev'), express.json()
     - Custom Middleware : checkAge (Route-level validation)
     - GET  /            → Welcome message
     - POST /license     → Protected by checkAge middleware
     - GET  /test-error  → Triggers Global Error Handler
     - 404 Catch-All     → Handles unknown routes
     - Global Error Net  → 4-parameter error handler
   ===================================================== */

// ─────────────────────────────────────────────
// 1️⃣  Imports & Setup
// ─────────────────────────────────────────────
const express = require("express");
const cors = require("cors");       // 🌐 Cross-Origin Resource Sharing (Frontend connect korar jonno)
const morgan = require("morgan");   // 📊 Terminal-e colorful HTTP request log dekhanor jonno

const app = express();
const PORT = 3000;

// ─────────────────────────────────────────────
// 2️⃣  Built-in & Third-Party Global Middleware
// ─────────────────────────────────────────────
// ⚠️ Egulo shob route-er UPORE thakte hobe, karon Express upor theke niche kaj kore.

app.use(cors());            // Onno port/domain (jemon React) theke request ashar onumoti dey
app.use(morgan("dev"));     // Terminal-e log print kore (e.g., POST /license 201 4.5ms)
app.use(express.json());    // Client-er pathano JSON body parse kore req.body-te boshay

// (Optional) Custom Application-Level Logger Middleware
// Morgan use koray etar ar dorkar nei, tobuo shekhar jonno comment kore rakha holo:
/*
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
*/

// ─────────────────────────────────────────────
// 3️⃣  Route-Level Custom Middleware (checkAge)
// ─────────────────────────────────────────────
const checkAge = (req, res, next) => {
    // Safe destructuring: body faka (undefined) holeo jate crash na kore tai || {}
    const { age } = req.body || {};

    // Check 1: Age field-ti adou pathano hoyeche kina (400 Bad Request)
    if (!age) {
        // 'return' deya joruri, nahole nicher line-gulo-o execute hoye double response error dibe
        return res.status(400).json({ message: "Please enter an age" });
    }

    // Check 2: Boyosh 18 ba tar beshi kina
    if (age >= 18) {
        return next(); // Shob thik ache, ebar main route handler-e jao
    } else {
        // 403 Forbidden: Client-ke chena geche kintu boyosh kom haway onumoti nei
        return res.status(403).json({ message: "You are not eligible for license" });
    }
};

// ─────────────────────────────────────────────
// 4️⃣  Application Routes
// ─────────────────────────────────────────────

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Express Middleware & Error Handling Lab!");
});

// Protected Route: 'checkAge' middleware pass korlei shudhu vitore dhukbe
// Body example: { "age": 22 }
app.post("/license", checkAge, (req, res) => {
    const { age } = req.body;
    res.status(201).json({
        message: "Your license was created",
        data: age
    });
});

// Error Simulation Route: Global Error Handler test korar jonno
app.get("/test-error", (req, res, next) => {
    const error = new Error("Database connection failed!");
    error.status = 500;

    // next()-er vitore argument dile Express shob normal route skip kore
    // shorashori 4-parameter Global Error Handler-e chole jay
    next(error);
});

// ─────────────────────────────────────────────
// 5️⃣  404 Catch-All Middleware
// ─────────────────────────────────────────────
// Uporer kono route-er shathe URL match na korle request ekhane eshe atke jabe
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

// ─────────────────────────────────────────────
// 6️⃣  Global Error Handling Middleware (4 Params)
// ─────────────────────────────────────────────
// ⚠️ Express-e (err, req, res, next) ei 4-ti parameter thaklei shetake Error Handler hishebe chene.
// Eta shobshomoy shob route ebong 404 handler-er NICHE thakbe.
app.use((err, req, res, next) => {
    // Custom status thakle sheta nibe, na thakle default 500 (Logical OR fallback)
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// ─────────────────────────────────────────────
// 7️⃣  Server Listen
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});