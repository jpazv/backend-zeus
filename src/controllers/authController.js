const express = require('express');

const User = require('../models/auth');

const router = express.Router();

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return  jwt.sign({ params}, authConfig.secret, {
        expiresIn: 86400,
    } )
}

router.post('/create', async (req, res) => {
    
    try {
        const user = await User.create(req.body);

        return res.send({ user, token: generateToken({id: user.id})});
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.post('/authenticate', async (req, res) => {
    
    const {email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user){
        return res.status(400).send({error: 'User not found'});
    }

    if(! await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'Invalid password'});
    }

    user.password = undefined;


    res.send({ user, token: generateToken({id: user.id})});
});




module.exports = app => app.use('/user', router)