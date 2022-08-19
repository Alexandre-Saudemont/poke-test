import './Pokemon.css';
import {PokemonRequestByID} from '../../../requests/index.js'
import { useNavigate } from 'react-router-dom';

function Pokemon ({nom, url, id}){
    
    const navigate = useNavigate();

    async function handleClick() {        
        const response = await PokemonRequestByID(id);      
        
        if (response.status===200){
            navigate('/detailsPokemon', {state : 
                {
                    id:response.data.id,
                    nom:response.data.nom, 
                    url:response.data.url, 
                    pv:response.data.pv, 
                    attaque:response.data.attaque, 
                    attaque_spe: response.data.attaque_spe, 
                    defense: response.data.defense, 
                    defense_spe:response.data.defense_spe, 
                    vitesse:response.data.vitesse 
                }})
        }
    }
   
    return (
        <div className="pokemon-container">
            <button  onClick={handleClick}>            
            <img src={url} alt="pokemon" />  
            <p >{nom}</p>
            </button>
        </div>
    )
}

export default Pokemon;