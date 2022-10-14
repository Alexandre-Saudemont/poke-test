import './Pokemon.css';
import { PokemonRequestByID, addPokemonToDeck, saveAuthorization, deletePokemon, DeckRequest } from '../../../requests/index.js'
import { useNavigate } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useEffect, useState } from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Swal from 'sweetalert2';



function Pokemon({ nom, url, id, isLogged }) {

    const navigate = useNavigate();
    const UserId = localStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const [deck, setDeck] = useState(JSON.parse(localStorage.getItem('deck')))
    const [errorPokemonAdded, setErrorPokemonAdded] = useState("");
    const [successPokemonAdded, setSuccessPokemonAdded] = useState("");
    const [open, setOpen] = useState(false);
    // let deck = JSON.parse(localStorage.getItem('deck'));

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

    // const handleClose = () => {
    //     setOpen(false);
    // }

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
        console.log("avant ajout", deck)        
        try {
            saveAuthorization(token);
            const response = await addPokemonToDeck(UserId, { pokemon_id: id });  
            console.log(response)          
            if (response.status === 200 && response.data.success) {               
                const res = await DeckRequest(UserId);
                console.log(res);
                if (res.status === 200) {
                    setDeck(res.data);
                    console.log("modification du deck", deck)
                    // setOpen(true);
                    return Swal.fire({
                        icon:"success",
                        text: `${nom} a été ajouté avec succès`
                    })    
                }
                                    
            }   
            //setOpen(true);          
                Swal.fire({
                    icon:"error",
                    text: response.data.error
                })      
                             

        } catch (error) {
            console.error(error)
            
        }
    }

    async function handleDelete() {
        try {
            console.log(id)
            console.log(deck)
            saveAuthorization(token);
            const response = await deletePokemon(UserId, { pokemon_id: id });
            console.log(response);
            if (response.status === 200) {
               
                const newDeckFiltered = deck.filter((pokemon => pokemon.id !== id));
                // localStorage.setItem("deck", JSON.stringify(newDeckFiltered))
                setDeck(newDeckFiltered);
                console.log(newDeckFiltered, deck)
                // setOpen(true);
                return Swal.fire({
                    icon:"success",
                    text:`${nom} supprimé avec succès`
                })                
            }            

        } catch (error) {
            console.error(error)
            
        }
    }
    useEffect(() => {
        console.log("montage du composant", deck)
    }, [deck.length])

    return (
        <div className="pokemon-container">            

            <button onClick={handleClick}>
                <img className="pokemon-img" src={url} alt="pokemon" />
            </button>
            <div className="pokemon-title">
                <h1 className="pokemon-nom">{nom}</h1>


                {/* Est que mon state isLogged est vide ou plein ? Si il est rempli, alors j'ai un utilisateur connecté et j'affiche le bouton  */}
                {isLogged &&
                    <div className="pokemon-button">

                        {deck && deck.some(pokemon => pokemon.id === id) ?
                            <button
                                className="pokemon-icon"                                
                                onClick={handleDelete}
                            >
                                <RemoveCircleOutlineIcon />
                            </button> :
                            <button
                                className="pokemon-icon"
                                onClick={handleAdd}>
                                <ControlPointRoundedIcon />
                            </button>
                        }

                    </div>
                }
            </div>
            {/* <Modal
                open={open}
                onClose={handleClose}                
            >
                <Box
                sx={style}>
                    {errorPokemonAdded &&
                        <p className="pokemon-modal-text">{errorPokemonAdded}</p>
                    }
                    {successPokemonAdded &&
                        <p className="pokemon-modal-text">{successPokemonAdded}</p>
                    }
                </Box>
            </Modal> */}
        </div>
    )
}

export default Pokemon;