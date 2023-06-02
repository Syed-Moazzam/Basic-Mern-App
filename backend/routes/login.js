const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            const password = await bcrypt.compare(req.body.password, user.password);
            if (password) {
                const token = jwt.sign({
                    name: user.name,
                    email: user.email
                }, 'secretKey');
                res.json({ message: 'ok', token: token });
            }
            else {
                res.json({ message: 'invalid password', token: false })
            }
        }
        else {
            res.json({ message: 'user not found', token: false })
        }
    } catch (error) {
        res.json({ message: 'invalid email or password', token: false });
    }
});

module.exports = router;