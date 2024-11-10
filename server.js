import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// In-memory array to store users
let users = [
    { id: 1, "name": "John Doe", "email": "john@example.com" },
    { id: 2, "name": "Suresh", "email": "surba@example.com" },
];

// Routes

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});



// Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1, // Basic ID generation
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.json({message: "User added successfully", user: newUser});
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

// Update a user by ID
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// Delete a user by ID
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "User not found" });

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
