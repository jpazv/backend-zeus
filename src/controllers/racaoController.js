const express = require('express');

const Racao = require('../models/racao');

const router = express.Router();


router.post('/register', async (req, res) => {
    
    try {
        const racao = await Racao.create(req.body);

        return res.send(racao);
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Registration failed'})
    }
});

router.get('/get/:id', async (req, res) => {
    
    try {
        const racao = await Racao.findById(req.params.id);
        
        return res.json(racao);
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Get failed'})
    }
});

router.get('/get', async (req, res) => {
    
    try {
        const racao = await Racao.find();
        
        return res.json(racao);
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Get failed'})
    }
});

router.delete('/delete/:id', async (req, res) => {
    
    try {
        const racao = await Racao.findByIdAndDelete(req.params.id);
        
        return res.json(racao);
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Deletion failed'})
    }
});

router.delete('/delete/', async (req, res) => {
    
    try {
        const racao = await Racao.deleteMany(req.body);
        
        return res.json(racao);
    } catch (err) {
        console.log(err);
        return res.status(400).send({error: 'Deletion failed'})
    }
});

router.patch('/change/:id', async (req, res) => {
   
    const {name ,price, quantity} = req.body

    const next = {
        name,
        price,
        quantity,
    }

    try {
        const novaracao = await Racao.updateOne({_id:req.params.id}, next);

        return res.json(next); 

    } catch (err) {
        console.log(err);
        return res.status(404).send({error: 'Change failed'})
    }
});

router.get('/', async (req, res) => {
    try {
        const racao = await Racao.find()
        let montante = 0;
        for(let i= 0; i <= racao.length -1; i++){
            montante += racao[i].price*racao[i].quantity;
        }
        res.json(montante)
    } catch (err) {
        
    }
})

module.exports = app => app.use('/racao', router)