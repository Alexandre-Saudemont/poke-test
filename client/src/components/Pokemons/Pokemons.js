import Pokemon from './Pokemon/Pokemon.js';
import { useEffect, useState }  from 'react';
import { PokemonRequest } from '../../requests/index.js';


function Pokemons ({setPokedex, pokedex, isLogged}){
    

    async function requestForPokemon(){
        try {
            const response = await PokemonRequest();
            setPokedex(response.data);
            
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
        <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} />
        ))
        }
        </div>
        </>
    )
}

export default Pokemons;