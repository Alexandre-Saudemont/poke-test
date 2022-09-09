import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { LoginRequest} from "../../requests";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import './Connexion.css'
function Connexion({ setIsLogged, setIsActive }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await LoginRequest({ email, password });

            if (response.status === 200) {

                localStorage.setItem("id", response.data.id);
                setIsLogged(true);
                setUsername(response.data.username)
                sessionStorage.setItem("token", response.data.token);
                navigate("/")
            }

        } catch (error) {

            console.error("erreur:", error);
            setError(error.response.data.error);
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
            <p className="error">{error}</p>
            }
        </div>
    )
}

export default Connexion;