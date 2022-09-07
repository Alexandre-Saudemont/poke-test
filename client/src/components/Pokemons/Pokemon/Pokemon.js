import './Pokemon.css';
import { PokemonRequestByID,addPokemonToDeck, saveAuthorization, deletePokemon } from '../../../requests/index.js'
import { useNavigate } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useState } from 'react';
import  Modal  from '@mui/material/Modal';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



function Pokemon({ nom, url, id, isLogged }) {

    const navigate = useNavigate();
    const UserId= localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const [errorPokemonAdded, setErrorPokemonAdded] = useState("");
    const [successPokemonAdded, setSuccessPokemonAdded] = useState("");
    const [open, setOpen] = useState(false);
    const [buttonAddPokemon, setButtonAddPokemon] = useState(true);
    const deck = JSON.parse(localStorage.getItem('deck'));
    console.log(typeof deck)
    
    const deckFilter = deck.filter((pokemon => pokemon.id === id))
    console.log(deckFilter)
   
    console.log("deck", deck)
    const handleClose = () => {
        setOpen(false);
    }

    async function handleClick() {
        const response = await PokemonRequestByID(id);

        if (response.status === 200) {
            navigate('/detailsPokemon', {
                state:
                {
                    id: response.data.id,
                    nom: response.data.nom,
                    url: response.data.url,
                    pv: response.data.pv,
                    attaque: response.data.attaque,
                    attaque_spe: response.data.attaque_spe,
                    defense: response.data.defense,
                    defense_spe: response.data.defense_spe,
                    vitesse: response.data.vitesse
                }
            })
        }
    }

    async function handleAdd() {
        try {
            
            saveAuthorization(token);
            const response = await addPokemonToDeck(UserId, {pokemon_id : id});
            console.log(response);
            if (response.status === 200) {
                setSuccessPokemonAdded(response.data.success);                
                setButtonAddPokemon(false)
                setOpen(true)               
            }
            setErrorPokemonAdded(response.data.error);
                setOpen(true)


        } catch (error) {
            console.error(error)
            setErrorPokemonAdded(error.response.data.error);
            setOpen(true)
        }
    }

    async function handleDelete(){
        
        
        try {
            console.log(id)
            saveAuthorization(token);
            const response = await deletePokemon(UserId, {pokemon_id : id});
            console.log(response);
            if (response.status === 200) {
                setSuccessPokemonAdded(response.data.success);  
                setOpen(true)
            }
            setErrorPokemonAdded(response.data.error);
            setOpen(true)

        } catch (error) {
            console.error(error)
            setErrorPokemonAdded(error.response.data.error);
            setOpen(true)
        }
    }
    
    return (
        <div className="pokemon-container">
            <div className="pokemon-header"></div>

            <button onClick={handleClick}>
                <img className="pokemon-img" src={url} alt="pokemon" />
            </button>
                <div className="pokemon-title">
                    <h1 className="pokemon-nom">{nom}</h1>


                    {/* Est que mon state isLogged est vide ou plein ? Si il est rempli, alors j'ai un utilisateur connecté et j'affiche le bouton  */}
                    {isLogged && 
                        <div className="pokemon-button">
                            { buttonAddPokemon && deckFilter.length===0&&
                            <button 
                            className="pokemon-icon"
                            onClick={handleAdd}>
                                <ControlPointRoundedIcon />
                            </button>
                            }

                            {deckFilter.length>0 && 
                             <button 
                             className="pokemon-icon"
                            //  name="pokemon_id"
                            //  value={id}
                             onClick={handleDelete}
                            >
                                <RemoveCircleOutlineIcon />
                            </button>
                    }   
                        </div>

}
                </div>
        <Modal
        open={open}
        onClose={handleClose}
        > 
        <div>
        {errorPokemonAdded && 
        <p>{errorPokemonAdded}</p>
        }
         {successPokemonAdded && 
        <p>{successPokemonAdded}</p>
        }
        </div>
        </Modal>
        </div>
    )
}

export default Pokemon;