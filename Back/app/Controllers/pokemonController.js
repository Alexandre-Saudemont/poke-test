
const { Pokemon, Types, PokemonTypes } = require('../Models')


const pokemonController = {
    getAllPokemon: async (req, res) => {
        try {
            const allPokemon = await Pokemon.findAll();
            return res.status(200).json(allPokemon);

        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: "Un problème est survenu sur la route getAllPokemon" })
        }

    },
    getPokemonById: async (req, res) => {
        try {
            id = parseInt(req.params.id);
            if (!id) {
                return res.status(403).json({ error: "Aucun pokemon correspondant. Veuillez réessayer avec un autre pokemon." })
            }
            const PokemonById = await Pokemon.findByPk(id);
            return res.status(200).json(PokemonById)
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: "Un problème est survenu sur la route getPokemonById" })
        }
    },

    getPokemonByTypes: async (req, res) => {
        try {
            id = parseInt(req.params.id);
            if (!id) {
                return res.status(403).json({ error: "Aucun pokemon correspondant. Veuillez réessayer avec un autre pokemon." })
            }
            const PokemonByType = await Pokemon.findAll({
                include: [
                    {
                        // On associe Pokemon et types par l'alias types
                        association: "types",
                        // Où l'id du type est comparé à l'id de notre paramètre
                        where: {
                            id: id
                        }
                    }
                ]
            })
            return res.status(200).json(PokemonByType)
        } catch (error) {
            console.error(error)
            return res.status(404).json({ error: "Un problème est survenu sur la route getPokemonByTypes" })
        }
    },

}


module.exports = pokemonController;