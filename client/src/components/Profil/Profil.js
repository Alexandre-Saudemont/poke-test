import { useState, useEffect } from 'react';
import { userInfosRequest, saveAuthorization, UpdateUserRequest, UserDeleteRequest } from '../../requests';
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
import {useNavigate} from 'react-router-dom';


function Profil({setIsLogged, setIsActive}) {
    const token = sessionStorage.getItem("token");
    const id = localStorage.getItem("id");
    const [infosUser, setInfosUser] = useState("");
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);    
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState('');
    const [success,setSuccess] = useState("");
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();
    const Navigate = useNavigate();   
    
    const handleOpen = () => {        
        setOpen(true);    
        setError(""); 
        setSuccess("")  
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenDelete = () =>{
        setOpenDelete(true);
    }
    const handleCloseDelete = () => {
        setOpenDelete(false);
    }
    const styleInput={
        textAlign:"center"
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:"500px",
        heigth:"100px",
        bgcolor: 'rgba(54, 89, 89, 0.65)',
        textAlign: 'center',
        border: '2px solid #000',
        color: "#C7C7C7",
        boxShadow: 24,
        p: 4,
        borderRadius:'15px',
        fontWeigth:'bold',
      };


    async function requestInfoUser() {
        try {
            saveAuthorization(token);
            const response = await userInfosRequest(id)
            setInfosUser(response.data);
            setEmail(response.data.email);
            setUsername(response.data.username);
            setFirstname(response.data.firstname);
            setLastname(response.data.lastname);
            
        } catch (error) {
            console.error(error)            
        }
    }
    
    async function onSubmit(data, e) {
        console.log(data);
        console.log(e)
        try {           
            saveAuthorization(token);
            const response = await UpdateUserRequest(id, data);
            console.log(response)
            if (response.status===200 && response.data.success) {
                setEmail(data.email);
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setUsername(data.username);             
                setSuccess(response.data.success);
                setInfosUser(prevState =>({...prevState,email, username, firstname, lastname}));   
                setError("");
                handleClose();  
                return null;                         
            }   
            console.log("je suis dans le else")      
            setEmail(infosUser.email);
            setFirstname(infosUser.firstname);
            setLastname(infosUser.lastname);
            setUsername(infosUser.username);  
            setError(response.data.error);
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setSuccess("");            
        }
    }

    async function handleDelete(){
        try {
            saveAuthorization(token);
            const response = await UserDeleteRequest(id);
            if (response.status===201){
                localStorage.removeItem('id');
                sessionStorage.removeItem('token');
                setIsLogged(false)
                Navigate("/");
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("montage du composant")
        requestInfoUser();
        setIsActive(false);
    }, [])

    return (
        <div id="profil">
            {infosUser &&
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
                        <Card className="profil-card" >
                            <CardHeader title="Page de profil" />

                            <CardContent>
                                
                                <Typography >Pseudo : {infosUser.username}</Typography>
                                <Typography>Prénom : {infosUser.firstname}</Typography>
                                <Typography>Nom : {infosUser.lastname}</Typography>
                                <Typography>Email : {infosUser.email}</Typography>
                            </CardContent>
                            <Button onClick={handleOpen}>Modifier vos informations</Button>

                                {success && !error &&                                
                                <p> {success}</p>
                                }
                                
                            <Button onClick={handleOpenDelete}> Supprimer votre compte </Button>
                        </Card>
                    </Box>

                     <Modal
                     open={openDelete}    
                     onClose={handleCloseDelete}  
                     className="profil-delete-modal">
                        <Box fontWeight="fontWeightBold" sx={style}>
                            <p> Etes vous sur de supprimer votre compte ?</p>
                                <Button style={{fontFamily:'Quantico',backgroundColor:'GREEN',marginTop:'50px',marginLeft:'50px', color:'white'}} onClick={handleDelete}> oui, je valide</Button>
                                <Button style={{fontFamily:'Quantico',backgroundColor:'RED',marginTop:'50px',marginLeft:'50px', color:'white'}} onClick={()=>{setOpenDelete(false)}}> Annuler </Button>

                        </Box> 
                    </Modal>  

                    <Modal
                        keepMounted={true}
                        open={open}
                        onClose={handleClose}
                        className="profil-modal"
                    >

                        <form className="profil-form" onSubmit={handleSubmit(onSubmit)}>
                            <InputLabel> Pseudo</InputLabel>
                            <Input
                                // id='profil-form-input'
                                sx={{textalign:"center"}}
                                value={username}
                                {...register('username')}
                                onChange={(e) => setUsername(e.target.value) }
                                required
                            />
                            <InputLabel> Prénom</InputLabel>
                            <Input
                                value={firstname}
                                {...register('firstname')}
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                            />
                            <InputLabel> Nom</InputLabel>
                            <Input
                                value={lastname}
                                {...register('lastname')}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            />
                            <InputLabel> Email</InputLabel>
                            <Input
                                value={email}                                
                                {...register('email')}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit">Valider </Button>

                            {error && 
                            <p>{error}</p>
                            }

                        </form >

                    </Modal>
                </>
            }
        </div>
    )
}

export default Profil;