const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');
const app = express();

// connection with database
connectToMongo();

// middleware
app.use(express.json());
app.use(cors());

// available routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api', require('./routes/quote'));

const port = 5000;
app.listen(port, () => {
    console.log("Server is running on port 5000.");
});