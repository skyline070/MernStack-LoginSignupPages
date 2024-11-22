const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes);

mongoose.connection.on('connected', () =>{
    console.log("Connection Setup Succcessfully")
})
// Database Connection
mongoose.connect(process.env.MONGO_URI,)
    .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
    .catch(err => console.error(err));
