import {useEffect, useState} from "react";
import {NavLink, useNavigate}  from "react-router-dom";
import {PokemonRequest} from "../../requests";

import "./NavBar.css";

import {AppBar, 
        Toolbar, 
        IconButton, 
        Input, 
        InputLabel, 
        Button, 
        Typography} 
        from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Navbar({ isLogged, setIsLogged, setSuccess, setPokedex, isActive }) {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const [value, setValue] = useState("");    

    function handleClick() {
        sessionStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("deck");
        setIsLogged(false);
        setSuccess("");
        navigate("/");
    };

    useEffect(() => {
       
        if (token) {
            setIsLogged(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogged])

    function handleChange(event) {
        console.log(value)
        setValue(event.target.value);
        requestForFilteredPokemon(event.target.value);
    }

    async function requestForFilteredPokemon(pokemonSearched) {

        try {
            const response = await PokemonRequest();
            const searchPokemonFiltered = response.data.filter((pokemon) => {
                const pokemonToLowerCase = pokemon.nom.toLowerCase();
                return pokemonToLowerCase.includes(pokemonSearched);
            })
            console.log("filtré", searchPokemonFiltered);
            setPokedex(searchPokemonFiltered)

        } catch (error) {
            console.error(error)
        }
    }
    const theme = createTheme({
        typography: {
            "fontFamily": `"Alumni Sans Collegiate One", sans-serif`,
        }
    })
    return (
        <nav id="navbar">
            
                <AppBar  >
                    <Toolbar id="navbar-toolbar">
                        <div>
                            <Button>
                                <NavLink className="nav-menu" to="/">Accueil </NavLink>
                            </Button>
                            <Button>
                                <NavLink className="nav-menu" to="/types">Types </NavLink>
                            </Button>
                            {isLogged ?
                                <>
                                <Button>
                                    <NavLink className="nav-menu" to="/Deck">Deck</NavLink>
                                </Button>
                                <Button>  
                                    <NavLink className="nav-menu" to="/Profil"> Profil</NavLink>
                                </Button> 
                                    <Button sx={{ ":hover": { bgcolor: "lightblue" } }} className="nav-menu" type="button" onClick={handleClick}>Déconnexion</Button>
                                </> :
                                <>
                                    <Button >
                                        <NavLink className="nav-menu" to="/Inscription">Inscription</NavLink>
                                    </Button>
                                    <Button sx={{ ":hover": { bgcolor: "lightblue" } }}>
                                        <NavLink className="nav-menu " to="/Connexion">Connexion</NavLink>
                                    </Button>
                                </>
                            }
                        </div>
                        <div className="nav-pokedex">
                           
                            <img className="nav-logo" src="/img/pokeball.png" alt="logo pokeball" />
                            <ThemeProvider theme={theme}>
                            <Typography variant="h2" id="nav-pokedex-typo">
                                Pokedex
                            </Typography>
                            </ThemeProvider>
                        </div>
                        {isActive ?
                       
                        <div className="nav-element-right">
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                            </IconButton>
                            <InputLabel htmlFor="search" />
                            <Input sx={{ display: "inline-flex", paddingLeft: "2rem", width: "80%" }}
                                className="nav-search"
                                id="search"
                                type="search"
                                value={value}
                                onChange={handleChange}
                                placeholder="Rechercher..."
                            />
                        </div> : 
                        <div className="nav-element-right-empty"></div>
                         }
                    </Toolbar>
                </AppBar>
            
        </nav >
    )

}

export default Navbar;
