import { DeckRequest, saveAuthorization } from '../../requests';
import { useState, useEffect } from 'react';

function Deck() {
    const token = sessionStorage.getItem("token");
    const [deck, setDeck] = useState();
    const id = localStorage.getItem("id");

    async function RequestForDeck(){

        try {
            saveAuthorization(token);
            const response = await DeckRequest(id);
            setDeck(response.data);
            
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
            <h1>Bonjour je suis dans le deck</h1>
            
            {deck && 
            <p>{deck.user_id}</p>
            }
        </div>
    );
}

export default Deck;