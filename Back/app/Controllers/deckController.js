const Deck = require('../Models/deckModel');
const Pokemon = require('../Models/pokemonModel');
const DeckPokemon = require('../Models');

const deckController = {
    getDeck: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)
            const deck = await Deck.findOne({
                where: {
                    user_id: id
                }
            });
            res.status(200).json(deck);

        } catch (error) {
            console.error(error);

        }

    },
    updateDeck: async (req, res) => {
        try {
            const id = req.params.id;
            const deck = await Deck.findOne({
                where: {
                    user_id: id
                }
            });
            console.log(deck);
            const { pokemon_id } = req.body;
            console.log(pokemon_id);

            const array = []
            if (pokemon_id.length > 0) {
                pokemon_id.forEach(async id_pokemon => {
                    const pokemonIdCheck = await Pokemon.findByPk(id_pokemon)

                    if (!pokemonIdCheck) {
                        array.push({ error: `Pas de pokemon correspond à l'id ${id_pokemon}` })
                        // return res.status(404).json({
                        //     error: `Pas de pokemon correspond à l'id ${id_pokemon}`
                        // })
                    } else {
                        const newArray = Number(deck.pokemon_id);

                        deck.pokemon_id = newArray;
                        deck.save();
                        console.log("dans la boucle", deck)
                        //     res.status(200).json({
                        //        success: "Modification mise à jour avec succès",
                        //        deck
                        //    });
                    }
                });
                if (array.length > 0) {
                    return res.status(404).json({
                        error: `Pas de pokemon correspond à l'id ${id_pokemon}`
                    })
                }
                res.status(200).json({
                    success: "Modification mise à jour avec succès",
                    deck
                });
            }

        } catch (error) {
            console.error(error);
            res.status(404).json({
                error: "Problème avec la requête de modification de Deck"
            })
        }
    }
}

module.exports = deckController;