import { DeckRequest, saveAuthorization, deleteAllPokemons, deletePokemon } from '../../requests';
import {useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function Deck({setIsActive}) {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const [deck, setDeck] =useState([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    // const deck = JSON.parse(localStorage.getItem("deck"));
    
    
    async function RequestForDeck(){

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
    async function handleDeleteDeck () {
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
    async function handleDeletePokemon(e){
        try {
            console.log(Number(e.target.value))
            saveAuthorization(token);
            const response = await deletePokemon(userId, {pokemon_id : e.target.value});
            console.log(response);
            if (response.status === 200) {
                console.log("dans le if response.status===200")
                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== Number(e.target.value)));
                console.log("filter deck", newDeckFiltered)
                setSuccess(response.data.success);
                setDeck(newDeckFiltered);  
                console.log("dans la réponse de la requête",deck.length)             
                localStorage.setItem("deck", JSON.stringify(newDeckFiltered))
            } 
        } catch (error) {
            console.error(error)
        }
    }
  
    useEffect(()=>{
        console.log("dans le useeffect",deck.length)
        console.log("montage du composant")
        RequestForDeck();
        setIsActive(false)
    }, [deck.length])

    return (
        <div>
            <h1>Votre deck</h1>
            <Button 
            onClick={handleDeleteDeck}
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
                    <button
                    onClick={handleDeletePokemon}
                    value={pokemon.id}> 
                        Supprimer {pokemon.nom} de votre Deck 
                    </button>
                </div>

            ))
            
            }

        </div>
    );
}

export default Deck;