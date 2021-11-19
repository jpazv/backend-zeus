const mongoose = require('mongoose');

const RacaoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    price: {
        type: Number,
        required: true
    },
    
    quantity: {
        type: Number,
        required: true
    },

    // createdAt: {
    //     type: Date
    // }
},
    {timestamps: true}

);


const Racao = mongoose.model('Racao', RacaoSchema);

module.exports = Racao;