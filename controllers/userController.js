
const Users = require('../modal/user');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utility/utility');

// Signup
const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }

    // Create new user
    const user = await Users.create({
        name,
        email,
        password
    });

    if (user) {
        return res.status(201).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            token: generateToken(user._id, user.name)
        });
    }

    return res.status(400).json({
        message: 'Invalid user data'
    });
});

// Login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: 'Invalid email or password'
        });
    }

    // Generate token using the same function as signup
    const token = generateToken(user._id, user.name);

    return res.status(200).json({
        message: 'Login successful',
        name: user.name,
        email: user.email,
        _id: user._id,
        token
    });
});

module.exports = {
    signUp,
    login
};
