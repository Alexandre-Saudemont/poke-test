import { useState, useEffect } from 'react';
import { userInfosRequest, saveAuthorization } from '../../requests';
import { useForm } from 'react-hook-form';
import './Profil.css';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel'


function Profil() {

    const [infosUser, setInfosUser] = useState("");
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState('');
    const { register, handleSubmit } = useForm();


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const style = {

        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(54, 89, 89, 0.65)',
        color: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '15px',
        fontWeigth: 'bold',
        ma: '2201pex'
    };


    async function requestInfoUser() {
        try {
            const id = localStorage.getItem("id");
            const token = sessionStorage.getItem("token");
            saveAuthorization(token);
            const response = await userInfosRequest(id)
            setInfosUser(response.data);
            setEmail(response.data.email);
            setUsername(response.data.username);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    async function onSubmit(data) {
        console.log(data)
    }
    useEffect(() => {
        requestInfoUser();

    }, [])

    return (
        <div>
            {infosUser &&
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
                        <Card className="profil-card">
                            <CardHeader title="Page de profil" />

                            <CardContent>
                                <Typography >Pseudo : {username}</Typography>
                                <Typography>Prénom : {firstname}</Typography>
                                <Typography>Nom : {lastname}</Typography>
                                <Typography>Email : {email}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Button onClick={handleOpen}>Modifier vos informations</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        className="profil-modal"
                    >

                        <form className="profil-form" onSubmit={handleSubmit(onSubmit)}>
                            <InputLabel> Pseudo</InputLabel>
                            <Input
                                value={username}
                                {...register('username')}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <InputLabel> Prénom</InputLabel>
                            <Input
                                value={firstname}
                                {...register('firstname')}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <InputLabel> Nom</InputLabel>
                            <Input
                                value={lastname}
                                {...register('lastname')}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <InputLabel> Email</InputLabel>
                            <Input
                                value={email}
                                {...register('email')}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit">Valider </Button>



                        </form >

                    </Modal>
                </>
            }
        </div>
    )
}

export default Profil;