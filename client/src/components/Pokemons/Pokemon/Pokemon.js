import './Pokemon.css';
import {PokemonRequestByID} from '../../../requests/index.js'
import { useNavigate } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Button from '@mui/material/Button'

function Pokemon ({nom, url, id, isLogged}){
    
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
        <div className="pokemon-header"></div>
       
            <button  onClick={handleClick}>            
            <img className="pokemon-img" src={url} alt="pokemon" />
            <div className= "pokemon-title">            
            <h1 className="pokemon-nom">{nom}</h1>
            
            
            {/* Est que mon state isLogged est vide ou plein ? Si il est rempli, alors j'ai un utilisateur connecté et j'affiche le bouton  */}
            {isLogged && 
            <div className="pokemon-button"> 
                <button className="pokemon-icon"> 
                <ControlPointRoundedIcon />
                </button>   
            </div>
            
            }
            </div>
            
            </button>
        </div>
    )
}

export default Pokemon;