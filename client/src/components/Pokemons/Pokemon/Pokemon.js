import './Pokemon.css';
import { PokemonRequestByID,addPokemonToDeck, saveAuthorization, deletePokemon, DeckRequest } from '../../../requests/index.js'
import { useNavigate } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useEffect, useState } from 'react';
import  Modal  from '@mui/material/Modal';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';



function Pokemon({ nom, url, id, pv, vitesse, attaque_spe, defense_spe, defense, attaque, isLogged }) {

    const navigate = useNavigate();
    const UserId= localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const [errorPokemonAdded, setErrorPokemonAdded] = useState("");
    const [successPokemonAdded, setSuccessPokemonAdded] = useState("");
    const [open, setOpen] = useState(false);
    const [buttonAddPokemon, setButtonAddPokemon] = useState(true);
    const [buttonDeletePokemon, setButtonDeletePokemon] = useState(false);
    const deck = JSON.parse(localStorage.getItem('deck'));
    console.log(typeof deck)
    
    // const deckFilter = deck.filter((pokemon => pokemon.id === id))
    // console.log(deckFilter)
   
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
                const res = await DeckRequest(UserId);
                if (res.status === 200) {
                    
                    localStorage.setItem("deck", JSON.stringify(res.data));
                }   
                        
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
            console.log(deck)
            saveAuthorization(token);
            const response = await deletePokemon(UserId, {pokemon_id : id});
            console.log(response);
            if (response.status === 200) {
                setSuccessPokemonAdded(response.data.success);  
                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== id));
                localStorage.setItem("deck", JSON.stringify(newDeckFiltered))
                setOpen(true);
                setButtonDeletePokemon(true);
            }
            setErrorPokemonAdded(response.data.error);
            setOpen(true)

        } catch (error) {
            console.error(error)
            setErrorPokemonAdded(error.response.data.error);
            setOpen(true)
        }
    }
    useEffect(() => {

    },[deck])

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

                            { deck && deck.some(pokemon=> pokemon.id === id)
                            ?
                            <button 
                             className="pokemon-icon"
                            //  name="pokemon_id"
                            //  value={id}
                             onClick={handleDelete}
                            >
                                <RemoveCircleOutlineIcon />
                            </button>:  
                            <button 
                            className="pokemon-icon"
                            onClick={handleAdd}>
                                <ControlPointRoundedIcon />
                            </button>}

                             {/* buttonAddPokemon && deckFilter.length===0&& 
                            
                            <button 
                            className="pokemon-icon"
                            onClick={handleAdd}>
                                <ControlPointRoundedIcon />
                            </button>
                            */ }
                    
                            { /* deckFilter.length>0 && 
                             <button 
                             className="pokemon-icon"
                            //  name="pokemon_id"
                            //  value={id}
                             onClick={handleDelete}
                            >
                                <RemoveCircleOutlineIcon />
                            </button>
                         */ }   
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