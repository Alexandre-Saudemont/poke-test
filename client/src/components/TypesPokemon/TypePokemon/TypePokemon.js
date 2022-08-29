import { useNavigate } from 'react-router-dom'
import { PokemonByTypesRequest } from '../../../requests'
import './TypePokemon.css';

function TypePokemon({ id, nom }) {
    const navigate = useNavigate();
    async function handleClick() {
        const response = await PokemonByTypesRequest(id);
        if (response.status === 200) {
            navigate('/detailsType', { state: { data: response.data } })
        }

    }
    return (
        <div className="type-container">
            <button
                className={`type-button type-button-${nom}`}
                onClick={handleClick}
            >
                {nom}
            </button>
        </div>
    )
}

export default TypePokemon;