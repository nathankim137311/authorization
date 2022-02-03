const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    // Input fields
    const { email, password } = req.body;

    // Validate data before we login 
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Checking if user already exists 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Email doesn\'t exist' }); 

    // Password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send({ error: 'Invalid password' });

    // // Create and assign a token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('x-access-token', token).send({ token }); 
});

module.exports = router;