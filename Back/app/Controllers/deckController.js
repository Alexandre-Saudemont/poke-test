// const Deck = require('../Models/deckModel');
// const Pokemon = require('../Models/pokemonModel');
// const DeckPokemon = require('../Models/deck_pokemonModel');
const {Deck, Pokemon, DeckPokemon} = require('../Models');


const deckController = {
    getDeck: async (req, res) => {
        try {
            const id = req.params.id;          
            const pokemonDeck = await Pokemon.findAll({
                include:{
                    association:"pokeDeck",                    
                    where: {
                       id: id
                    }
                }
            });   
           
           return res.status(200).json(pokemonDeck);          

        } catch (error) {
            console.error(error);
            return res.status(404).json({
                error: "Problème survenu sur la méthode getDeck"
            })
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
            
            /*
            Je veux ajouter un pokemon dans la table d'association entre deck et pokemon en fonction de l'id du deck
            qui est lui-même lié à l'id de l'utilisateur connecté
            Si il y a déjà 5 pokemon pour ce deck, alors je rentre dans une erreur
            Sinon, je créé une ligne dans ma table deckPokemon
            */
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
    },

    deleteOnePokemonToDeck: async (req,res) =>{
        try {

           /*
           Je veux aller chercher le deck correspondant à mon utilisateur dans la table Deck
           avec l'id du deck je vais aller chercher les instances existantes pour cet utiliseur           
           puis aller vérifier si l'id du pokemon que je veux supprimer est présent dans une de ces instances
           Si oui, je supprime l'instance correspondant (id, deck_id, pokemon_id)
           Sinon je ne fais rien
           */
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
           const  {pokemon_id } = req.body;           

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
            });    
           

            if (deckPokemon.length >1){
                deckPokemon.forEach((pokemon) =>{
                    
                    if (pokemon.dataValues.pokemon_id === Number(pokemon_id)){
                        pokemon.destroy();
                        return res.status(200).json({
                            success: `${pokemonIdCheck.dataValues.nom} a bien été supprimé de votre deck`
                        })
                }})
            } else {

                deckPokemon.destroy();
                return res.status(200).json({
                    success: `${pokemonIdCeck.dataValues.nom} a bien été supprimé de votre deck`
                })
            }

        } catch (error) {
           console.error(error);
        }        
    },

    deleteAllPokemonsToDeck: async (req,res) =>{
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
           
           const deckPokemon = await DeckPokemon.findAll({
                where: {
                    deck_id: deckId
                }
            });
            console.log(deckPokemon)
            if (!deckPokemon){
                return res.status(404).json({
                    error: "Votre deck est déjà vide"
                })
            }
            deckPokemon.forEach(pokemon=>{
                pokemon.destroy();
            })
            
            return res.status(200).json({
                success: "Votre deck a été réinitialisé avec succès"
            })
            /*
            Je veux aller chercher le deck correspondant à mon utilisateur comme dans la méthode getDeck
            Supprimer toutes les instances de pokemon_deck correspondant à cet utilisateur
            */
        } catch (error) {
            console.error(error);
        }
    }
    // fonctionne mais a un bug important. Malgré la présence du jwtVerify, avec le même token, j'ai pu supprimé les informations de deckPokemon pour 2 deck_id différents, le 10 et le 12
                        

}

module.exports = deckController;