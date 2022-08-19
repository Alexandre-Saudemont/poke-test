import './DetailsPokemon.css';
import { useLocation } from 'react-router-dom';


function DetailsPokemon() {

    const { state } = useLocation();

    return (
        <>

            <div className="pokemons">
                <div className="detail-container">
                    <h2 className="detail-name"> {state.nom}</h2>
                    <img src={state.url} alt="pokemon" />
                    <h3>pv : {state.pv}</h3>
                    <h3>attaque : {state.attaque}</h3>
                    <h3>attaque spé : {state.attaque_spe}</h3>
                    <h3>defense : {state.defense}</h3>
                    <h3>defense spé : {state.defense_spe}</h3>
                    <h3>vitesse : {state.vitesse}</h3>
                </div>
            </div>
        </>
    )

}

export default DetailsPokemon;