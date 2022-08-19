const express = require('express');
const router = express.Router();
const pokemonController = require('./Controllers/pokemonController');
const typesController = require('./Controllers/typesController');
const usersController=require('./Controllers/usersController');
const deckController = require('./Controllers/deckController');
const jwtVerify = require ('./Middleware/Middleware');

router.get('/', (_, res) => {
    res.send('We are in homepage')
})
// GET
router.get('/Pokemon', pokemonController.getAllPokemon);
router.get(`/Pokemon/:id`, pokemonController.getPokemonById);
router.get('/Types', typesController.getAllTypes);
router.get(`/Types/:id`, pokemonController.getPokemonByTypes);
router.get('/Users', usersController.getAllUser);
router.get('/Deck/:id',  jwtVerify, deckController.getDeck);

// POST
router.post(`/Inscription`, usersController.createUser);
router.post('/Connexion', usersController.connectUser);

//PUT
router.put('/Users/:id', jwtVerify, usersController.updateUser);
// router.put('/Deck/:id', jwtVerify, deckController.updateDeck);

//DELETE
router.delete('/Users/:id', jwtVerify, usersController.deleteUser);



module.exports = router;