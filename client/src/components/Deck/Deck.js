import { DeckRequest, saveAuthorization, deleteAllPokemons } from '../../requests';
import {useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function Deck() {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const [deck, setDeck] =useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    
    
    async function RequestForDeck(){

        try {
            saveAuthorization(token);
            const response = await DeckRequest(userId);
            if (response.status === 200) {
            setDeck(response.data);
            localStorage.setItem("deck", JSON.stringify(response.data));
            }            
        } catch (error) {
            console.error(error)
        }
    } 
    async function handleDelete () {
        try {
            const response = await deleteAllPokemons(userId);
            if (response.status === 200) {
                setSuccess(response.data.success);
            }
            setError(response.data.error);
                
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
        }
    }
    console.log("deck", deck)
    useEffect(()=>{
        RequestForDeck();
    }, [])

    return (
        <div>
            <h1>Votre deck</h1>
            <Button 
            onClick={handleDelete}
            >
                Réinitaliser votre deck
            </Button>
            {success && 
            <p>{success}
            </p>
            }
            {error && 
            <p>{error}
            </p>
            }
            {deck && deck.map((pokemon)=>(
                <div key={pokemon.id}>
                    <p>{pokemon.nom}</p>
                    <img src= {pokemon.url} alt={pokemon.nom}></img>
                </div>

            ))
            
            }

        </div>
    );
}

export default Deck;