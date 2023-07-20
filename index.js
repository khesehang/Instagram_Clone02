const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
dotenv.config();
app.use(morgan('dev'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./db_connect.js')

app.use('/api',require('./API_ROUTES'))

app.use((req, res, next) => {
    next({
        msg: 'Not Found',
        status: 404
    })
})

app.use((error, req, res, next) => {
    res.status(error.status || 400)
    res.json({
        msg: error.message || error.msg || error,
        status: error.status || 400
    })
})

const PORT = process.env.PORT || 5000
app.listen((PORT), () => {
    console.log('listening on port', PORT)
})