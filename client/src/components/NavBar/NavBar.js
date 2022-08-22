import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { PokemonRequest } from "../../requests";
import "./NavBar.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

// const test = ({ value, handleChange, StyledInputBase }) => (

//     <div>
//         <StyledInputBase
//             value={value}
//             onChange={handleChange}
//             placeholder="Pikachu..."
//         />
//     </div>

// )


function Navbar({ isLogged, setIsLogged, setSuccess }) {


    const token = sessionStorage.getItem("token");
    const [searchPokemon, setSearchPokemon] = useState("");
    const [value, setValue] = useState("");

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
        console.log(value)
        setValue(event.target.value);

        requestForFilteredPokemon();

    }
    async function requestForFilteredPokemon() {

        try {

            const response = await PokemonRequest();
            const searchPokemonFiltered = response.data.filter((pokemon) => {
                const pokemonToLowerCase = pokemon.nom.toLowerCase();
                return pokemonToLowerCase.includes(value);
            })
            console.log("filtré", searchPokemonFiltered);
            setSearchPokemon(searchPokemonFiltered)

        } catch (error) {
            console.error(error)
        }
    }
    // const searchPokemonFiltered = searchPokemon.filter(pokemon => {
    //     const toLowerCase = pokemon.nom.toLowerCase();
    //     return toLowerCase.includes(event.target.value);
    // });

    // console.log("filtré", searchPokemonFiltered)
    // setSearchPokemon(searchPokemonFiltered)


    // async function requestForPokemon() {
    //     try {
    //         const response = await PokemonRequest()
    //         setSearchPokemon(response.data)

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }
    // console.log(searchPokemon);

    // useEffect(() => {
    //     requestForPokemon()
    // }, [])

    return (
        <nav>
            <ul className='items'>
                <AppBar position="static" >
                    <Toolbar className="navbar">
                        <div>

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
                        </div>
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
                            <Input sx={{ display: "inline-flex" }}
                                className="nav-search"
                                id="search"
                                type="search"
                                value={value}
                                onChange={handleChange}
                                placeholder="Pikachu..."
                            />
                        </div>

                    </Toolbar>
                </AppBar>

            </ul>
        </nav>
    )

}

export default Navbar;
