const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.get('/readQuote', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, 'secretKey');
        const email = decoded.email;
        const user = await User.findOne({
            email: email
        });
        if (user) {
            res.json({ status: 'ok', quote: user.quote });
        }
        else {
            res.json({ status: 'error', quote: false });
        }
    } catch (error) {
        res.json({ status: 'error', quote: false });
    }
});

router.post('/updateQuote', async (req, res) => {
    try {
        const token = req.headers['authorization'];
        const decoded = jwt.verify(token, 'secretKey');
        const email = decoded.email;
        await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        );
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error' });
    }
});

module.exports = router;