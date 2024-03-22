const express = require('express');
const router = express.Router();

const client = require('../db/dbClient');
const appConstants = require('../constants/appConstants');

// Define authentication routes
router.post('/login', (req, res) => {
    // Handle user login logic

});

router.post('/register', (req, res) => {
    // Handle user registration logic
    console.log('Request Body:', req.body);
    register(req, res);
});

router.get('/listUsers', (req, res) => {
    listUsers(req, res);
});

async function listUsers(req, res) {
    await client.connect();
    console.log('Connected to MongoDB listUsers');

    // Access the database
    const db = client.db(appConstants.mongodbName);

    // Access the collection
    const collection = db.collection('users'); // Replace 'mycollection' with your collection name

    // Query the collection (e.g., find all documents)
    const data = await collection.find({}).toArray();

    // Send response with queried data
    res.status(200).json(data);
}

async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        // Connect to MongoDB
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        await client.connect();

        // Access the database
        const db = client.db(appConstants.mongodbName);

        // Access the users collection
        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user document
        const newUser = {
            username,
            email,
            password // In practice, password should be hashed before saving to the database
        };

        // Insert new user document into the users collection
        const result = await usersCollection.insertOne(newUser);

        // Send response
        res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Close the MongoDB connection
        client.close();
    }
}

module.exports = router;