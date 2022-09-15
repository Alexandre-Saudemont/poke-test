import { useState, useEffect } from 'react';
import { RegisterRequest } from '../../requests'
import {useNavigate} from "react-router-dom"
import { FormHelperText, InputLabel, Input, Modal, Box, Button } from '@mui/material';

import './Inscription.css';

function Inscription({setIsActive}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(5)
    const navigate = useNavigate();

    const styleModal = {
        position: 'relative',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:"13rem",
        heigth:"10rem",
        bgcolor: 'rgba(54, 89, 89, 0.65)',
        textAlign: 'center',
        border: '2px solid #000',
        color: "#C7C7C7",
        boxShadow: 24,
        p: 4,
        mt: 10,
        borderRadius:'15px',
        fontWeigth:'bold',
      };
    
      const styleBox={
        bgcolor: 'lightgrey',
        p:"2rem",
        textAlign:"center"
      }

    const timeOutFunction = () => {
        navigate('/Connexion');
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    async function handleSubmit(e) {

        e.preventDefault()
        try {
            const response = await RegisterRequest({ email, password, username, lastname, firstname });
            if (response.status === 200) {
                setError(response.data.error)
            }

            if (response.status === 201) {
                setSuccess(response.data.success);                
                setIsActive(false);
                setTimeout(timeOutFunction, 5000)    
                setOpen(true); 
                setInterval(() => {
                    setNumber(prev=>prev-1); 
                }, 1000)       
            }

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        
        setIsActive(false);
        }, []);
    return (
        <div className="inscription-container">
            {success ?
                <Modal 
                    open={open} 
                    onClose={handleClose} 
                    className="inscription-modal"
                    sx={styleModal}
                >
                    <div>
                         {success} 
                         <p>Redirection vers Connexion dans {number}...</p>
                    </div>
                    
                         
                </Modal> :
                <>
                    <Box sx={styleBox}>
                        <h2 className="inscription-title">Inscription</h2>
                        <form
                            action="submit"
                            onSubmit={handleSubmit}
                        >
                            <InputLabel 
                            htmlFor='username'
                            className="inscription-input-label"
                            >
                                Pseudo
                            </InputLabel>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                placeholder="DarkSasukedu92"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputLabel 
                            htmlFor='email'
                            className="inscription-input-label"
                            >
                                Adresse Email
                            </InputLabel>
                            <Input
                            i   id="email"
                                type="email"                               
                                name="email"
                                value={email}
                                placeholder="pikachu@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputLabel 
                            htmlFor='lastname'
                            className="inscription-input-label"
                            >
                                Nom
                            </InputLabel>
                            <Input
                                id="lastname"
                                type="text"
                                name="lastname"
                                value={lastname}
                                placeholder="Dubois"
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <InputLabel 
                            htmlFor='firstname'
                            className="inscription-input-label"
                            >
                                Prénom
                            </InputLabel>
                            <Input
                                id="firstname"
                                type="text"
                                name="username"
                                value={firstname}
                                placeholder="Jean-Eude"
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <InputLabel 
                            htmlFor='password'
                            className="inscription-input-label"
                            >
                                Mot de passe
                            </InputLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                aria-describedby="password-text"
                                placeholder="*********"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormHelperText
                                id="password-text"
                            >
                                8 caractères requis
                            </FormHelperText>
                            <Button 
                            type="submit"
                            >
                                Envoyer
                            </Button>

                        </form>
                    </Box>
                </>
            }
            {
                error && !success &&
                <p className="error">{error}</p>
            }
        </div>
    )
}

export default Inscription;