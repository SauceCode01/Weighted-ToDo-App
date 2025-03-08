const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Allow cross-origin requests

const users = [
    { id: 1, name: "John Doeafasdasdfasd" },
    { id: 2, name: "Jane Doe" },
];


app.get("/", (req, res) => {
  res.json(users);
});


// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// GET a specific user
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// POST - Add a new user
app.post("/users", (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Update user
app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    user.name = req.body.name;
    res.json(user);
});

// DELETE - Remove user
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
