import { DeckRequest, saveAuthorization, deleteAllPokemons, deletePokemon } from '../../requests';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Deck.css';
import Button from '@mui/material/Button';
import { Modal, Box } from '@mui/material';

function Deck({ setIsActive }) {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const [deck, setDeck] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose= () => {
        setOpen(false);
    };
    const styledelete = {    
          
        "&:hover": {
            backgroundColor: "lightgrey",
            color: "green"
          }, 
    }
    const style = {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "20rem",
        maxheigth: "500px",
        bgcolor: 'rgba(54, 89, 89, 0.65)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #000',
        color: "#C7C7C7",
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        fontWeigth: 'bold',
    };

    async function RequestForDeck() {

        try {
            saveAuthorization(token);
            const response = await DeckRequest(userId);
            console.log(response)
            if (response.status === 200) {
                setDeck(response.data);
                localStorage.setItem("deck", JSON.stringify(response.data));                
            }
            setError(response.data.error)
           
        } catch (error) {
            console.error(error);
            setError(error.response.data.error);
            
        }
    }
    async function handleDeleteDeck() {
        try {
            const response = await deleteAllPokemons(userId);
            if (response.status === 200) {
                setSuccess(response.data.success);
                setDeck([]);
                localStorage.setItem("deck",)                
            }
            setError(response.data.error);
            setOpen(true)

        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setOpen(true)
        }
    }
    async function handleDeletePokemon(e) {
        try {

            saveAuthorization(token);
            const response = await deletePokemon(userId, { pokemon_id: e.target.value });

            if (response.status === 200) {

                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== Number(e.target.value)));
                setSuccess(response.data.success);
                setDeck(newDeckFiltered);
                localStorage.setItem("deck", JSON.stringify(newDeckFiltered));
                
            }
            setOpen(true);
            setError(response.data.error)
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setOpen(true)
        }
    }

    useEffect(() => {
        RequestForDeck();
        setIsActive(false)
    }, [deck.length])

    return (
        <>
            <h1 className="deck-title">
                Votre deck de Pokemons
            </h1>
            {deck.length === 0 ?
            <p id="deck-nodeck-text">Vous n'avez pas encore de deck. Vous pouvez ajouter des Pokemons à votre deck sur la <Link to="/" id="deck-nodeck-link"> Page d'Accueil</Link></p> :
            <div className="deck-button">
                <Button
                    sx={styledelete}
                    justify="center"
                    onClick={handleDeleteDeck}
                >
                    Réinitaliser mon deck
                </Button>
            </div>
            }

            <div className="deck-container">
                <Modal
                open={open}
                onClose={handleClose}
                >
                    <Box
                    sx={style}
                    >
                        {success &&
                            <p>{success}
                            </p>
                        }
                        {error &&
                            <p>{error}
                            </p>
                        }
                    </Box>
                </Modal>
                {deck && deck.map((pokemon) => (
                    <>
                        <div key={pokemon.id} className="deck-pokemon">
                            <p className="deck-pokemon-nom">{pokemon.nom}</p>
                            <div className='deck-image'>
                                <img src={pokemon.url} alt={pokemon.nom}></img>
                                    <Box>
                                    <h3 className="deck-type-comp">Pv : {pokemon.pv}</h3>
                                    <h3 className="deck-type-comp">Attaque : {pokemon.attaque}</h3>
                                    <h3 className="deck-type-comp">Attaque spéciale : {pokemon.attaque_spe}</h3>
                                    <h3 className="deck-type-comp">Défense : {pokemon.defense}</h3>
                                    <h3 className="deck-type-comp">Défense spéciale : {pokemon.defense_spe}</h3>
                                    <h3 className="deck-type-comp">Vitesse : {pokemon.vitesse}</h3>
                                    </Box>
                            </div>
                            <Button
                                sx={styledelete}
                                className="deck-buttonDelete-pokemon"
                                onClick={handleDeletePokemon}
                                value={pokemon.id}
                            >
                                Supprimer {pokemon.nom} de votre Deck
                            </Button>
                        </div>
                    </>
                ))

                }

            </div>
        </>
    );
}

export default Deck;