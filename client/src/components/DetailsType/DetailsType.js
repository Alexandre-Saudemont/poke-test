import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import {Box, Modal, Button} from '@mui/material'
import {addPokemonToDeck, saveAuthorization, deletePokemon, DeckRequest } from '../../requests/index.js'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import './DetailsType.css';

function DetailsType() {
    const { state } = useLocation();
    const UserId = localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const [errorPokemonAdded, setErrorPokemonAdded] = useState("");
    const [successPokemonAdded, setSuccessPokemonAdded] = useState("");
    const deck = JSON.parse(localStorage.getItem('deck'));
    const [open, setOpen] = useState(false);

    const handleClose= () => {
        setOpen(false);
    }

    const style = {
        display: 'flex',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "20rem",
        maxheigth: "500px",
        bgcolor: 'rgba(54, 89, 89, 0.65)',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #000',
        color: "#C7C7C7",
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        fontWeigth: 'bold',
    };

    async function handleAdd(e) {
        try {

            saveAuthorization(token);
            const response = await addPokemonToDeck(UserId, { pokemon_id: e.target.value });            
            if (response.status === 200) {
                setSuccessPokemonAdded(response.data.success);
                setErrorPokemonAdded("");
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
   

    async function handleDelete(e) {
       
        try {
            console.log(deck)
            saveAuthorization(token);
            const response = await deletePokemon(UserId, { pokemon_id: e.target.value});
            console.log(response);
            if (response.status === 200) {
                setSuccessPokemonAdded(response.data.success);
                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== e.target.value));
                localStorage.setItem("deck", JSON.stringify(newDeckFiltered))
                setOpen(true);
                setErrorPokemonAdded();
            } else {

                setErrorPokemonAdded(response.data.error);
                setOpen(true)
                setSuccessPokemonAdded();
            }

        } catch (error) {
            console.error(error)
            setErrorPokemonAdded(error.response.data.error);
            setOpen(true)
        }
    }
    useEffect(() => {

    }, [deck])

    return (
        <>
        <div className="detail-type">
            {state.data.map((data) => (
                <div className="detail-type-container" key={data.id}>
                    <h2 className="detail-type-name"> {data.nom}</h2>
                    <img src={data.url} alt="pokemon" />
                    <Box>
                    <h3 className="detail-type-comp">Pv : {data.pv}</h3>
                    <h3 className="detail-type-comp">Attaque : {data.attaque}</h3>
                    <h3 className="detail-type-comp">Attaque spéciale : {data.attaque_spe}</h3>
                    <h3 className="detail-type-comp">Défense : {data.defense}</h3>
                    <h3 className="detail-type-comp">Défense spéciale : {data.defense_spe}</h3>
                    <h3 className="detail-type-comp">Vitesse : {data.vitesse}</h3>
                    </Box>
                    <Box sx={{pt:".3em"}}>
                    {deck && deck.some(pokemon => pokemon.id === data.id) ?
                            <Button
                                className="pokemon-icon"                                
                                onClick={(e)=>{
                                    e.target.value=data.id
                                    handleDelete(e)}}
                            >
                                <RemoveCircleOutlineIcon/>
                            </Button>                             
                            :
                 
                            <Button
                                className="pokemon-icon"                                
                                onClick={(e)=>{
                                    e.target.value=data.id
                                    handleAdd(e)}}>
                                <ControlPointRoundedIcon />
                            </Button>
                    }
                    </Box>
                    
                </div>
            ))}
            <Modal
                open={open}
                onClose={handleClose}                
            >
                <Box
                sx={style}>
                    {errorPokemonAdded &&
                        <p className="pokemon-modal-text">{errorPokemonAdded}</p>
                    }
                    {successPokemonAdded && !errorPokemonAdded &&
                        <p className="pokemon-modal-text">{successPokemonAdded}</p>
                    }
                </Box>
            </Modal>    
            
        </div>           
        </>
    )
}

export default DetailsType;