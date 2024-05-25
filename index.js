const express = require("express");
require('dotenv').config()
const bodyParser = require("body-parser");
const app =express();
app.use(bodyParser.json());

const { connectDB } = require('./config/database/db')
connectDB();


// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);


const port= process.env.Port
 app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
})