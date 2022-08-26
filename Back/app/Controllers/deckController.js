// const Deck = require('../Models/deckModel');
// const Pokemon = require('../Models/pokemonModel');
// const DeckPokemon = require('../Models/deck_pokemonModel');
const {Deck, Pokemon, DeckPokemon} = require('../Models');


const deckController = {
    getDeck: async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id)

            /*
            Je veux afficher le deck d'un utilisateur qui a l'id correspondant. 
            Je veux donc interroger la table deck en passant par l'association avec la table Pokemon
            Je récupère un tableau vide au lieu de récupérer les informations de la table DeckPokemon (association entre pokemon & deck)
            
            */
            const deck = await Deck.findAll({
                include:{
                    association:"deckPokemon",                    
                    where: {
                       id: id
                    }
                }
            });

            console.log("deck",deck)
            res.status(200).json(deck);
            console.log(deck)

        } catch (error) {
            console.error(error);

        }

    },
    addPokemonToDeck: async (req, res) => {
        try {
            const UserId = req.params.id;
            const deck = await Deck.findOne({
                where: {
                    user_id: UserId
                }
            });

            

            if (!deck) {
                return res.status(404).json({ 
                    error:"Pas de deck pour l'utilisateur demandé"
                })
            }
            const deckId = deck.dataValues.id;

            const { id, pokemon_id } = req.body;           

            const pokemonIdCheck = await Pokemon.findByPk(pokemon_id)

            if (!pokemonIdCheck) {
                return res.status(404).json({
                    error: `Pas de pokemon correspond à l'id ${pokemon_id}`
                })
            }
            
            const deckPokemon = await DeckPokemon.findAll({
                    where: {
                        deck_id: deckId
                    }
            })

            console.log("deckPokemon",deckPokemon)
            if (deckPokemon.length === 5){               
                return res.status(404).json({
                    error: `Vous avez déjà 5 pokemons enregistrés dans votre deck.`
                })
            }
            if (deckPokemon.dataValues.pokemon_id === pokemon_id){
                return res.status(404).json({
                    error:"Vous avez déjà ajouté ce pokemon dans votre Deck"
                })
            }
            const newDeckPokemon = DeckPokemon.build({
                id, 
                deck_id:deckId,
                pokemon_id : pokemon_id
            })
            
            newDeckPokemon.save();
            return res.status(200).json({
            success: `Ajout de ${pokemonIdCheck.nom} effectuée avec succès`
            })

        } catch (error) {
            console.error(error);
            res.status(404).json({
                error: "Problème avec la requête de modification de Deck"
            })
        }
    }
                        

}

module.exports = deckController;