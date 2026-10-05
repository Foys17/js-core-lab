const express = require("express");
const app = express();

const users = [
    { id: 1, name: "Rahim", role: "Admin" },
    { id: 2, name: "Karim", role: "Editor" }
];

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/about",(req,res) =>{
    res.send("This is the about page");
});

app.get("/user",(req,res) =>{
    res.json({ id: 101, name: "Rahim", role: "admin" });
});

app.get("/user/:id",(req,res) =>{
    const userId = Number(req.params.id);
    const user = users.find(u => u.id === userId);
    if(user)
        {res.json(user);}
    else{
        res.status(404).json({message: "User not found"});
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});