import { useState, useEffect } from 'react';
import { LoginRequest, saveAuthorization } from "../../requests";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import './Connexion.css'
function Connexion({ setIsLogged, success, setSuccess, setIsActive }) {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [error, setError] = useState("");


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await LoginRequest({ email, password });

            if (response.status === 200) {

                localStorage.setItem("id", response.data.id);
                setSuccess(response.data.success);
                setIsLogged(true);
                setUsername(response.data.username)
                sessionStorage.setItem("token", response.data.token);
                saveAuthorization(response.data.token);
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
        }, [success]);
    return (

        <div className="connexion-container">
            {success ?
                <p className="success">{success}. Bienvenue {username}</p> :
                <>
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
                </>
            }
            {
                error && !success &&
                <p className="error">{error}</p>
            }
        </div>
    )
}

export default Connexion;