import { DeckRequest, saveAuthorization } from '../../requests';
import {useState, useEffect } from 'react';

function Deck() {
    const token = sessionStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const [deck, setDeck] =useState([]);
    
    
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
    console.log("deck", deck)
    useEffect(()=>{
        RequestForDeck();
    }, [])

    return (
        <div>
            <h1>Votre deck</h1>
            
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