import { DeckRequest, saveAuthorization, deleteAllPokemons, deletePokemon } from '../../requests';
import { useState, useEffect } from 'react';
import './Deck.css';
import Button from '@mui/material/Button';

function Deck({ setIsActive }) {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const [deck, setDeck] = useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    async function RequestForDeck() {

        try {
            saveAuthorization(token);
            const response = await DeckRequest(userId);
            console.log(response)
            if (response.status === 200) {
                setDeck(response.data);
                localStorage.setItem("deck", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error(error)
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

        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
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
                localStorage.setItem("deck", JSON.stringify(newDeckFiltered))
            }
        } catch (error) {
            console.error(error)
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
            <div className="deck-button">
                <Button
                    sx={{ m: 'auto' }}
                    justify="center"
                    onClick={handleDeleteDeck}
                >
                    Réinitaliser mon deck
                </Button>
            </div>

            <div className="deck-container">
                {success &&
                    <p>{success}
                    </p>
                }
                {error &&
                    <p>{error}
                    </p>
                }
                {deck && deck.map((pokemon) => (
                    <>
                        <div key={pokemon.id} className="deck-pokemon">
                            <p>{pokemon.nom}</p>
                            <div className='deck-image'>
                                <img src={pokemon.url} alt={pokemon.nom}></img>
                            </div>
                            <button
                                className="deck-buttonDelete-pokemon"
                                onClick={handleDeletePokemon}
                                value={pokemon.id}>
                                Supprimer {pokemon.nom} de votre Deck
                            </button>
                        </div>
                    </>
                ))

                }

            </div>
        </>
    );
}

export default Deck;