import { useLocation } from 'react-router-dom'



function DetailsType() {
    const { state } = useLocation();
    return (
        <>

            {state.data.map((data) => (
                <div className="detail-container" key={data.id}>
                    <h2 className="detail-name"> {data.nom}</h2>
                    <img src={data.url} alt="pokemon" />
                    <h3>pv : {data.pv}</h3>
                    <h3>attaque : {data.attaque}</h3>
                    <h3>attaque spé : {data.attaque_spe}</h3>
                    <h3>defense : {data.defense}</h3>
                    <h3>defense spé : {data.defense_spe}</h3>
                    <h3>vitesse : {data.vitesse}</h3>
                </div>
            ))}

            {/* <div className="pokemons"> 
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
        </div> */}
        </>
    )
}

export default DetailsType;