const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
    // Input fields
    const { email, password } = req.body;
    
    // Validate before adding user 
    const { error } = registerValidation(req.body); 
    if (error) return res.status(400).send({ error: error.details[0].message });

    // Find user in db
    const emailExist = await User.findOne({ email });
    if (emailExist) return res.status(400).send({ error: 'User already exists' });

     // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt); 

    const user = new User({
        email,
        password: hashPassword,
    });

    try {
        await user.save();
        res.status(201).send({ user: user._id }); 
    } catch (error) {
        res.status(400).send({ error: err });
    }
});

module.exports = router;