const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
dotenv.config();

const app = express();
const PORT = 3000; 

// Connect to db 
mongoose.connect(process.env.DB_CONNECT, () => console.log('connected to mongodb'));

// Import routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login'); 
const dashboardRoute = require('./routes/dashboard');

// Middlewares
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Route middlewares
app.use('/api/user', registerRoute);
app.use('/api/user', loginRoute);
app.use('/api', dashboardRoute);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}...`)); 