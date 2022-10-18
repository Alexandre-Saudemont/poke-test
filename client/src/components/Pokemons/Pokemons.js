import { useEffect}  from 'react';
import { PokemonRequest } from '../../requests/index.js';
import Pokemon from './Pokemon/Pokemon.js';
import './Pokemons.css'; 


function Pokemons ({setPokedex, pokedex, isLogged, setIsActive, deck, setDeck}){
    
    async function requestForPokemon(){
        try {
            const response = await PokemonRequest();
            setPokedex(response.data);
            setIsActive(true)            
        } catch (error){
            console.error(error)         
        }          
    }   
    useEffect(() => {       
       requestForPokemon();           
    }, []);

    return (
        <>        
        <div className="pokemons">
        {pokedex.length > 0 && pokedex.map((pokemon)=>(
        <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} setDeck={setDeck} deck={deck} />
        ))
        }
        </div>
        </>
    )
}

export default Pokemons;