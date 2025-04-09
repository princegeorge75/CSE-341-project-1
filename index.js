const express = require('express');
const app = express();
const connectDB = require('./db'); // Connect to database
const contactsRoute = require('./routes/contacts'); // Our new route

require('dotenv').config(); // Load .env variables
const port = process.env.PORT || 3000;

app.use(express.json()); // So we can read JSON from the client

// Connect to DB
connectDB();

// Use contacts route when someone goes to /contacts
app.use('/contacts', contactsRoute);

// Basic home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
