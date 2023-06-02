const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const isRegistered = await User.findOne({
            email: req.body.email
        });
        
        if (isRegistered) {
            res.json({ status: 'already exists', message: "user with this email address already exists" });
        }
        else {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: encryptedPassword
            });
            res.json({ status: 'ok', message: "user registered" })
        }
    } catch (error) {
        res.json({ status: 'error', message: "user not registered" });
    }
});

module.exports = router;