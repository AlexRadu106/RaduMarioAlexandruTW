import { useState } from 'react';
import { destinatii as destinatiiInitiale } from './data/destinatii.js';
import ListaDestinatii from './components/ListaDestinatii.jsx';
import Rezumat from './components/Rezumat.jsx';
import FormularDestinatie from './components/FormularDestinatie.jsx';
import { getNevizitate, totalZile, marcheazaVizitat, adaugaDestinatie } from './utils/destinatii.js';
import './App.css';

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale);

  // Handler pentru schimbarea stării de vizitare a unui card
  function handleToggle(id) {
    setDestinatii((curent) => marcheazaVizitat(curent, id));
  }

  // Handler pentru adăugarea unei destinații noi din formular
  function handleAdd(nouaDestinatie) {
    setDestinatii((curent) => adaugaDestinatie(curent, nouaDestinatie));
  }

  const total = destinatii.length;
  const nevizitate = getNevizitate(destinatii).length;
  const zile = totalZile(getNevizitate(destinatii));

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat total={total} nevizitate={nevizitate} zile={zile} />
      <FormularDestinatie onAdd={handleAdd} />
      <ListaDestinatii destinatii={destinatii} onToggle={handleToggle} />
    </main>
  );
}