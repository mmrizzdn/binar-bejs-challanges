// BES2402KM6017
// MUHAMMAD AMMAR IZZUDIN
// BEJS

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

var indexRouter = require('./routes/v1');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const file = fs.readFileSync('./api-docs.yaml', 'utf-8');
const swaggerDocument = YAML.parse(file);

app.use('/v1/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/api/v1', indexRouter);

// 500 error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: err.message,
        data: null
    });
});

// 404 error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: `are you lost? ${req.method} ${req.url} is not registered!`,
        data: null
    });
});

module.exports = app;
