import './App.css';

import Pokemons from './components/Pokemons/Pokemons.js'
import DetailsPokemon from './components/DetailsPokemon/DetailsPokemon.js';
import TypesPokemon from './components/TypesPokemon/TypesPokemon.js';
import Inscription from './components/Inscription/Inscription.js';
import Connexion from './components/Connexion/Connexion.js';
import DetailsType from './components/DetailsType/DetailsType.js'
import Navbar from './components/NavBar/NavBar.js';
import Deck from './components/Deck/Deck';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [success, setSuccess] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  console.log("set dans app", setIsLogged)
  return (
    <div className="App">
      <Navbar setSuccess={setSuccess} isLogged={isLogged} setIsLogged={setIsLogged} />
      <Routes>
        <Route path="/" element={<Pokemons />} />
        <Route path="/detailsPokemon" element={<DetailsPokemon />} />
        <Route path="/detailsType" element={<DetailsType />} />
        <Route path="/types" element={<TypesPokemon />} />
        <Route path="Inscription" element={<Inscription />} />
        <Route path="Connexion" element={<Connexion success={success} setSuccess={setSuccess} isLogged={isLogged} setIsLogged={setIsLogged} />} />
        <Route path="/Deck" element={<Deck />} />
      </Routes>
    </div>
  );
}

export default App;
