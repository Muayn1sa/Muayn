const express = require('express');
const app = express();
const port = 3002;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the /api/users endpoint
app.post('/api/users', (req, res) => {
  // Handle user registration logic here
  // For example, save user data to a database
  console.log('User data received:', req.body);

  // Send a success response
  res.status(201).send({ success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});