
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');

const genres = require('./routes/genres');
const home = require('./routes/home');

const app = express();

// configuration
startupDebugger('application name', config.get('name'));

// doesn't need to be required
app.set('view engine', 'pug');
// path for ttemplates: optional default ./views
app.set('views', './views');

//middleware
app.use(express.json());
// so url encoding works - form posts
app.use(express.urlencoded({ extended: true}));
// static assets
app.use(express.static('public'));
// headers
app.use(helmet());

// for any routes, use this module

app.use('/api/genres', genres);
app.use('/api/', home);

//or process.env.NODE_ENV == undefined
//export NODE_ENV=production
// npm config or npm rc
if (app.get('env') === 'development') {
    // logging of requests
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
};


 
app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ...', port));
