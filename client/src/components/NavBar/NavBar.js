import { useEffect } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';



function Navbar({ isLogged, setIsLogged, setSuccess }) {
    console.log("je suis setIsLogged dans la navbar", setIsLogged);

    const Search = styled('div')(({ theme }) => ({
        position: 'right',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const token = sessionStorage.getItem("token");

    // const setIsLogged = useState(false);


    function handleClick() {
        sessionStorage.removeItem("token");
        setIsLogged(false);
        setSuccess("");
    };

    useEffect(() => {
        if (token) {
            setIsLogged(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])

    function handleChange(event) {
        console.log(event.target.value)
    }
    return (
        <nav>
            <ul className='items'>
                <AppBar position="static">
                    <Toolbar>
                        <NavLink className="nav-menu" to="/">Accueil </NavLink>
                        <NavLink className="nav-menu" to="/types">Types </NavLink>

                        {isLogged ?

                            <>
                                <NavLink className="nav-menu" to="/Deck">Deck</NavLink>
                                <NavLink className="nav-menu" to="/Profil"> Profil</NavLink>
                                <button type="button" onClick={handleClick}>Déconnexion</button>
                            </> :
                            <>
                                <NavLink className="nav-menu" to="/Inscription">Inscription</NavLink>
                                <NavLink className="nav-menu" to="/Connexion">Connexion</NavLink>
                            </>

                        }
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <Search>

                            <StyledInputBase
                                onChange={handleChange}
                                placeholder="Recherche…"
                                inputProps={{}}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>


            </ul>
        </nav>
    )

}

export default Navbar;
