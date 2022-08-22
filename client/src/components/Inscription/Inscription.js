import { useState } from 'react';
import { RegisterRequest } from '../../requests'

function Inscription() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault()
        try {
            const response = await RegisterRequest({ email, password, username, lastname, firstname });
            if (response.status === 200) {
                setError(response.data.error)
            }

            if (response.status === 201) {
                setSuccess(response.data.success);
                console.log(response.data.success);
                setEmail("");
                setFirstname("");
                setLastname("");
                setUsername("");
                setPassword("");
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="Inscription">
            {success ?
                <p className="success">{success}</p> :
                <>
                    <h2>Inscription</h2><form
                        action="submit"
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Pseudo
                            <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="DarkSasukedu92"
                                onChange={(e) => setUsername(e.target.value)} />

                        </label>

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
                            Nom
                            <input
                                type="text"
                                name="lastname"
                                value={lastname}
                                placeholder="Dubois"
                                onChange={(e) => setLastname(e.target.value)} />
                        </label>
                        <label>
                            Prénom
                            <input
                                type="text"
                                name="firstname"
                                value={firstname}
                                placeholder="Jean-Eude"
                                onChange={(e) => setFirstname(e.target.value)} />

                        </label>

                        <label>
                            Mot de passe
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="****"
                                onChange={(e) => setPassword(e.target.value)} />

                        </label>

                        <button
                            type="submit"
                        >Envoyer
                        </button>

                    </form>
                </>


            }
            {error && !success &&

                <p className="error">{error}</p>

            }
        </div>
    )
}

export default Inscription;