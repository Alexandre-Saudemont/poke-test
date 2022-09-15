
import {TypesRequest} from '../../requests'
import TypePokemon from './TypePokemon/TypePokemon.js';
import "./TypesPokemon.css"
import { useState, useEffect } from 'react';


function TypesPokemon ({setIsActive}) {
   
    const [types, setTypes] = useState([]);

    async function RequestForTypes(){
        try {
            const response = await TypesRequest();
            setTypes(response.data)  
            setIsActive(false)          
        } catch (error) {
          console.error(error); 
        }
    }

    useEffect(()=>{
        RequestForTypes();
        // setIsActive(false);
    }, []);

    return (
        <>
        
        <h2 className="types-title">Types de Pokemon </h2>
        <div className="types-pokemon">
            
            
            {types.length > 0 && types.map((type)=>(
               <TypePokemon key ={type.id} {...type} />
            )
            )}

        </div>
        </>


    )
}

export default TypesPokemon;