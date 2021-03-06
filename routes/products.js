const express = require('express');
const router = express.Router();
const consola = require('consola');
const { Product, validate } = require('../models/product');

router.get('/', async (req, res) => {
    try {

        res.send(await Product.find().sort('name'));

    } catch (error) {
        res.send(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        res.status(404).send('Product not found');
    }
    res.send(product);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, imgUrl, price } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send('Product not found');
        }

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        product.title = title;
        product.imgUrl = imgUrl;
        product.price = price;

        const result = await product.save();
        consola.info('update product()', product);

        res.send(result);
    } catch (error) {
        res.send(error);

    }

});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        imgUrl: req.body.imgUrl
    });

    try {
    const result = await product.save();
    consola.info('post product()', product);

    res.send(result);

    } catch (error) {
        res.send(error);
    }
});


module.exports = router;
