const express = require('express');
const router = express.Router();

let lastId = 3;

const genres = [
    { id: 1, name: 'a'},
    { id: 2, name: 'b'},
    { id: 3, name: 'c'},
];


router.get('/', (req, res) => {
   res.send(genres);
});

router.get('/:id', (req, res) => {
    const genreIndex = genres.findIndex((item) => item.id === parseInt(req.params.id));
    if (genreIndex === -1) return res.status(404).send("The genre with the given ID was not found.");
    res.send(genres[genreIndex]);

});


router.post('/', (req, res) => {
   
   const { error } = validateGenre(req.body);
   if (error) res.status(400).send(error);
   
   const newGenre = { id: ++lastId, name: req.body.name};

   genres.push(newGenre);
   
   res.send(newGenre);
   

});

router.put('/:id', (req, res) => {
    const genre = genres.find((item) => item.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given ID was not found.");
    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send("Invalid data");

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find((item) => item.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The genre with the given ID was not found.");
    
    const genreIndex = genres.indexOf(genre);
    genres.splice(genreIndex, 1);
    res.send(genre);
});

function validateGenre(item) {
   const schema = Joi.object({
      name: Joi.string()
          .alphanum()
          .max(30)
          .required()
   });
   
   return schema.validate(item);
}

module.exports = router;
