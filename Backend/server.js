const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient } = require('mongodb');
const path = require('path');

// Middleware to parse JSON
app.use(express.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Connect to the database

(async () => {
  try {
    const client = await MongoClient.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const blogdb = client.db('blogdb');

    // Get collection objects
    const userCollection = blogdb.collection('userscollection');
    const articlesCollection = blogdb.collection('articlescollection');
    const authorsCollection = blogdb.collection('authorscollection');

    // Make collections available to the app
    app.set('usercollection', userCollection);
    app.set('articlescollection', articlesCollection);
    app.set('authorscollection', authorsCollection);

    console.log("DB connection successful");
  } catch (err) {
    console.error("Error in DB connection", err);
  }
  
})();

// Import the API routes
const userApp = require('./APIs/user-api');
const authorApp = require('./APIs/author-api');
const adminApp = require('./APIs/admin-api');

// Route API requests
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);

// Handle any other requests with the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Express error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An error occurred", payload: err.message });
});

// Define the port
const PORT = process.env.PORT || 4000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
