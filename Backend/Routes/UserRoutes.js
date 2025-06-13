const express = require('express');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const {protect} = require('../middleware/authmiddleware'); // Import the authentication middleware

const router = express.Router();
// ---------------------------------------------------------------------------------------
// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //register logic
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password
        });
        await user.save();


        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        // Sign the token with a secret key and set expiration time
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '20h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    token, // Send the token in the response
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }); // Send the token in the response
            }
        );






    } catch (error) {
        res.status(500).send("Server Error", error.message);
    }
});

//-----------------------------------------------------------------------------------

// @route POST /api/users/login
// @desc aUthenticate user 
// @access Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        //login logic
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }
        const isMatch = await user.matchPassword(password); // Compare entered password with hashed password
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });


        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        // Sign the token with a secret key and set expiration time
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '20h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({
                    token, // Send the token in the response
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }); // Send the token in the response
            }
        );

    } catch (error) {
        return res.status(500).send("Server Error", error.message);
    }

})
//-----------------------------------------------------------------------------------
// @route GET /api/users/profile
// @desc Get user profile
// @access Private
router.get('/profile',protect, async (req, res) => {
    res.json(req.user);

})


//-----------------------------------------------------------------------------------

module.exports = router;