const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'my app', message: 'hello'});
 });

 module.exports = router;
