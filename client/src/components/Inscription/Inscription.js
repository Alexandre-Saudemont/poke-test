import { useState } from 'react';
import { RegisterRequest } from '../../requests'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import { FormHelperText } from '@mui/material';
import './Inscription.css';

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
        <div className="inscription-container">
            {success ?
                <p className="success">{success}</p> :
                <>
                    <div>
                        <h2 className="inscription-title">Inscription</h2>
                        <form
                            action="submit"
                            onSubmit={handleSubmit}
                        >
                            <InputLabel htmlFor='username'>
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
                            <InputLabel htmlFor='email'>
                                Adresse Email
                            </InputLabel>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="pikachu@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputLabel htmlFor='lastname'>
                                Nom
                            </InputLabel>
                            <Input
                                type="text"
                                name="lastname"
                                value={lastname}
                                placeholder="Dubois"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputLabel htmlFor='firstname'>
                                Prénom
                            </InputLabel>
                            <Input
                                id="prénom"
                                type="text"
                                name="username"
                                value={firstname}
                                placeholder="Jean-Eude"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputLabel htmlFor='password'>
                                Mot de passe
                            </InputLabel>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                aria-describedby="password-text"
                                placeholder="*********"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormHelperText
                                id="password-text">
                                8 caractères requis
                            </FormHelperText>
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

export default Inscription;