import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { LoginRequest} from "../../requests";
import {Input, InputLabel, Button, Modal, Box} from '@mui/material';
import './Connexion.css'

function Connexion({ setIsLogged, setIsActive }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose=()=> {
        setOpen(false)
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


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await LoginRequest({ email, password });

            if (response.status === 200) {

                localStorage.setItem("id", response.data.id);
                setIsLogged(true);
                sessionStorage.setItem("token", response.data.token);
                navigate("/")
            }

        } catch (error) {

            console.error("erreur:", error);
            setError(error.response.data.error);
            setOpen(true)
            setEmail("");
            setPassword("");
        }
    }
    useEffect(() => {
        setIsActive(false);
        }, []);
    return (

        <div className="connexion-container">           
            <div className="connexion-subcontainer">
                <h2 className="connexion-title">Se connecter</h2>
                <form
                    action="submit"
                    onSubmit={handleSubmit}
                >
                    <InputLabel htmlFor="email">
                        Adresse Email
                    </InputLabel>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="pikachu@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputLabel htmlFor="password">
                        Mot de passe
                    </InputLabel>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="*******"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">
                        Envoyer
                    </Button>

                </form>
            </div>
             
            {
            error && 
            <Modal 
            open={open}
            onClose={handleClose}
           >
            <Box
            sx={style}>
                {error}
            </Box>
            
            </Modal>
            }
        </div>
    )
}

export default Connexion;