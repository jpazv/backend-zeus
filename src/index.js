const express = require('express');
const cors = require('cors');
const connection = require('./database/index');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
connection();
app.use('*', cors());

app.get ('/', (req, res) => {
    res.send('Ok')
});

require('../src/controllers/racaoController')(app);

app.listen(3001);