import './DetailsPokemon.css';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';


function DetailsPokemon() {

    const { state } = useLocation();

    return (
        <>
            <div className="pokemons">
                <div className="detail-container">         
                   <div>
                     <Typography variant="h3" className="detail-name"> {state.nom}</Typography>
                   </div>           
                    <div id="detail-pokemon-comp"> 
                        <img src={state.url} alt="pokemon" className="detail-pokemon-img"/>
                        <div id="detail-pokemon-list-stats">
                            <p><span className='detail-pokemon-stats'>Pv : {state.pv}</span></p>
                            <p><span className='detail-pokemon-stats'>Attaque : {state.attaque}</span></p>
                            <p><span className='detail-pokemon-stats'>Attaque spé : {state.attaque_spe}</span></p>
                            <p><span className='detail-pokemon-stats'>Defense : {state.defense}</span></p>
                            <p><span className='detail-pokemon-stats'>Defense spé : {state.defense_spe}</span></p>
                            <p><span className='detail-pokemon-stats'>Vitesse : {state.vitesse}</span></p>
                        </div>                      
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsPokemon;