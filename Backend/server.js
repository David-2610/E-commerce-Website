const express = require('express');// Express framework for building web applications
const cors = require('cors');// CORS middleware to allow cross-origin requests
const dotenv = require('dotenv');// Load environment variables from .env file
const connectDB = require('./Config/DB');// Connect to MongoDB database
const UserRoutes = require('./Routes/UserRoutes');// User routes for handling user-related operations





const app = express();// Create an instance of the Express application
app.use(cors());// Enable CORS for all routes
app.use(express.json());// Parse incoming JSON requests
dotenv.config();// Load environment variables from .env file
const PORT = process.env.PORT || 5000;






// Connect to MongoDB
connectDB();












app.get('/', (req, res) => {
    res.send('WELCOME TO THE BACKEND SERVER');
})


//API ROUTES

app.use('/api/users', UserRoutes);












app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

})