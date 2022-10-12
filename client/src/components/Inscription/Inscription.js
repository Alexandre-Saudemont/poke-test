import { useState, useEffect } from 'react';
import { RegisterRequest } from '../../requests'
import {useNavigate} from "react-router-dom"
import { FormHelperText, InputLabel, Input, Box, Button } from '@mui/material';
import Swal from 'sweetalert2';

import './Inscription.css';

function Inscription({setIsActive}) {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    
      const styleBox={
        bgcolor: 'lightgrey',
        p:"2rem",
        textAlign:"center"
      }

    const timeOutFunction = () => {
        navigate('/Connexion');
    }
    
    async function handleSubmit(e) {

        e.preventDefault()
        try {
            const response = await RegisterRequest({ email, password, username, lastname, firstname });
            console.log(response);
            console.log(response.status===201)
            if (response.status === 200) {
                setError(response.data.error)
            }

            if (response.status === 201) {
                console.log(response.data.success)
                setSuccess(response.data.success);                
                setIsActive(false);
                setTimeout(timeOutFunction, 5000)    
                
                console.log(success);
                Swal.fire({
                    text:`Bravo ${username} a bien été créé avec succès`,
                    icon:"success",
                    timer: 5000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    customClass:{
                        timerProgressBar: '.inscription-swal-timer'
                    }
                })     
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
            
            {
                error && !success &&
                <p className="error">{error}</p>
            }
        </div>
    )
}

export default Inscription;