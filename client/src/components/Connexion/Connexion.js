import { useState } from 'react';
import { LoginRequest, saveAuthorization } from "../../requests";


function Connexion({ setIsLogged, success, setSuccess }) {
   

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

    return (

        <div className="Connexion">
            {success ?
                <p className="success">{success}. Bienvenue {username}</p> :
                <><h3>Se connecter</h3><form
                    action="submit"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Adresse Email
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="pikachu@gmail.com"
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Mot de passe
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="*******"
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Envoyer</button>
                </form></>

            }

            {error && !success &&
                <p className="error">{error}</p>
            }
        </div>
    )
}

export default Connexion;