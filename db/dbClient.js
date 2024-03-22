const { MongoClient } = require('mongodb');
const appConstants = require('../constants/appConstants');

// MongoDB connection URI
// const uri = 'mongodb://localhost:27017/mydatabase'; // Replace 'mydatabase' with the name of your database

// Create a new MongoClient
const client = new MongoClient(appConstants.mongodbUri);

module.exports = client;