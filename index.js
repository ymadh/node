
const config = require('config');
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const consola = require('consola');
const { databaseUrl } = require('./config');

const products = require('./routes/products');
const home = require('./routes/home');

const app = express();

// doesn't need to be required
app.set('view engine', 'pug');
// path for templates: optional default ./views
app.set('views', './views');

//middleware
app.use(express.json());
// so url encoding works - form posts
app.use(express.urlencoded({ extended: true}));
// static assets
app.use(express.static('public'));
// headers
app.use(helmet());

mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
})
.catch((err) => {
    consola.error('database error ', err);
});


app.use('/api/products/', products);
app.use('/api/', home);

//or process.env.NODE_ENV == undefined
if (app.get('env') === 'development') {
    // logging of requests
    // app.use(morgan('tiny'));
};



const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ...', port));
