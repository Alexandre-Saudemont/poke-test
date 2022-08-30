import './App.css';

import Pokemons from './components/Pokemons/Pokemons.js'
import DetailsPokemon from './components/DetailsPokemon/DetailsPokemon.js';
import TypesPokemon from './components/TypesPokemon/TypesPokemon.js';
import Inscription from './components/Inscription/Inscription.js';
import Connexion from './components/Connexion/Connexion.js';
import DetailsType from './components/DetailsType/DetailsType.js'
import Navbar from './components/NavBar/NavBar.js';
import Deck from './components/Deck/Deck';
import Profil from './components/Profil/Profil';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [success, setSuccess] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="App">
      <Navbar setSuccess={setSuccess} isLogged={isLogged} setIsLogged={setIsLogged} setPokedex={setPokedex} isActive={isActive} />
      <Routes>
        <Route path="/" element={<Pokemons pokedex={pokedex} setPokedex={setPokedex} isLogged={isLogged} setIsActive={setIsActive}/>} />
        <Route path="/detailsPokemon" element={<DetailsPokemon setIsActive={setIsActive}/>} />
        <Route path="/detailsType" element={<DetailsType setIsActive={setIsActive}/>} />
        <Route path="/types" element={<TypesPokemon setIsActive={setIsActive}/>} />
        <Route path="Inscription" element={<Inscription setIsActive={setIsActive}/>} />
        <Route path="Connexion" element={<Connexion success={success} setSuccess={setSuccess} isLogged={isLogged} setIsLogged={setIsLogged} setIsActive={setIsActive}/>} />
        <Route path="/Deck" element={<Deck setIsActive={setIsActive}/>} />
        <Route path="/Profil" element={<Profil setIsLogged={setIsLogged} setIsActive={setIsActive} /> }/>
      </Routes>
    </div>
  );
}

export default App;
