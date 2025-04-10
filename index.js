const express = require('express');
const app = express();
const connectDB = require('./db'); // Connect to database
const contactsRoute = require('./routes/contacts'); // my new route

require('dotenv').config(); // Load .env variables
const port = process.env.PORT || 3000;

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
        },
    },
    apis: ['./routes/contacts.js'] //Points to the contacts routes file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json()); // used to read JSON from the client

// Connect to DB
connectDB();

// Use contacts route when someone goes to /contacts
app.use('/contacts', contactsRoute);

// Server Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Basic home route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
