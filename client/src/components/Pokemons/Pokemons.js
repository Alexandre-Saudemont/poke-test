import Pokemon from './Pokemon/Pokemon.js';
import { useEffect}  from 'react';
import { PokemonRequest } from '../../requests/index.js';


function Pokemons ({setPokedex, pokedex, isLogged, setIsActive}){
    

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
        <Pokemon key={pokemon.id} {...pokemon} isLogged={isLogged} />
        ))
        }
        </div>
        </>
    )
}

export default Pokemons;