// Import required modules
const express = require('express');
const authRoutes = require('../myapp/routes/authRoute');
const bodyParser = require('body-parser');

// Create an instance of Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }))

// Define a route for the homepage
app.get('/', (req, res) => {
    res.send('Welcome to the backend API!');
});

// Define other routes and middleware here...

// Mount authentication routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});