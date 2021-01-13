const { Customers, validateCustomer } = require('../models/customers');
const express = require('express');
const router = express.Router();
const consola = require('consola');


async function getCustomers() {
    try {
        const result = await Customers.find();
        consola.info('getCustomers()');   
        return result;
    } catch (error) {
        consola.error('getCustomers Error: ',error);   
    }
}
async function getCustomerById(id) {
    try {
        const result = await Customers.findById(id);
        consola.info('getCustomerById()');   

        return result;
    } catch (error) {
        consola.error('getCustomerById Error: ',error);   
    }
}
async function createCustomer(customer) {
    try {
        // const { name, phone, isGold } = req.body;

        consola.info('create Customer()', customer);

        return await Customers.create(new Customers(customer));
    } catch (error) {
        consola.error('createCustomer Error: ',error);   

        for (field in error.errors) {
            consola.error('createCustomer Error: ',error.errors[field].message);   
        }

    }
}

async function deleteCustomer(id) {
    try {

        consola.info('deleteCustomer()', id);   
        return await Customers.deleteOne({_id: id});
    } catch (error) {
        
        for (field in error.errors) {
            consola.error('deleteCustomer Error: ',error.errors[field].message);   
        }

    }
}
async function updateCustomer(id, body) {

    const { name, phone, isGold } = body;
    try {
        consola.log('updateCustomer()', body);

        return await Customers.findByIdAndUpdate({_id: id}, {name: name, phone: phone, isGold: isGold}, {
            new: true,
            useFindAndModify: true
          });
         
    } catch (error) {
        consola.log(error);
        for (field in error.errors) {
            consola.error('updateCustomer Error: ',error.errors[field].message);   
        }
    }
   

}

router.get('/', async (req, res) => {
    res.send(await Customers.find().sort('name'));
});

router.get('/:id', async (req, res) => {
    res.send(await getCustomerById(req.params.id));
});


router.post('/', async (req, res) => {
   
   const { error } = validateCustomer(req.body);
   if (error) res.status(400).send(error);
   
   res.send(await createCustomer(req.body));

});


router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) res.status(400).send(error.details[0].message);
    
    res.send(await updateCustomer(req.params.id, req.body));

  
});

router.delete('/:id', async (req, res) => {
    res.send(await deleteCustomer(req.params.id));
   
});

module.exports = router;
