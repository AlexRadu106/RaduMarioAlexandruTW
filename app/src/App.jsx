import { useState, useEffect } from 'react';
import { getDestinatii, postDestinatie, patchVizitat } from './api/destinatii.js';
import ListaDestinatii from './components/ListaDestinatii.jsx';
import FormularDestinatie from './components/FormularDestinatie.jsx';
import Rezumat from './components/Rezumat.jsx';
import Cautare from './components/Cautare.jsx';
import { getNevizitate, totalZile } from './utils/destinatii.js';
import './App.css';
import PanouStatistici from './components/PanouStatistici.jsx';

export default function App() {
  const [destinatii, setDestinatii] = useState([]);
  const [incarcare, setIncarcare] = useState(true);
  const [eroare, setEroare] = useState(null);
  const [cautare, setCautare] = useState('');
  const [seTrimite, setSeTrimite] = useState(false);

  useEffect(() => {
    async function incarcaDate() {
      try {
        const date = await getDestinatii();
        setDestinatii(date);
      } catch (err) {
        setEroare(err.message);
      } finally {
        setIncarcare(false);
      }
    }
    incarcaDate();
  }, []);

  async function handleToggle(id) {
    const cardCurent = destinatii.find((d) => d.id === id);
    if (!cardCurent) return;
    try {
      const salvata = await patchVizitat(id, !cardCurent.vizitat);
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)));
    } catch (err) {
      alert(`Eroare la actualizare: ${err.message}`);
    }
  }

  async function handleAdd(nouaDestinatie) {
    try {
      setSeTrimite(true);
      const salvata = await postDestinatie(nouaDestinatie);
      setDestinatii((curent) => [...curent, salvata]);
    } catch (err) {
      alert(`Eroare la adăugare: ${err.message}`);
    } finally {
      setSeTrimite(false);
    }
  }

  const nevizitate = getNevizitate(destinatii);
  const textCautare = cautare.trim().toLowerCase();
  const afisate = destinatii.filter(
    (d) =>
      d.oras.toLowerCase().includes(textCautare) ||
      d.tara.toLowerCase().includes(textCautare)
  );

  if (incarcare) {
    return <p className="stare">Se încarcă destinațiile...</p>;
  }

  if (eroare) {
    return <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>;
  }

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <PanouStatistici />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={(e) => setCautare(e.target.value)} />

      {destinatii.length === 0 ? (
        <p className="gol">Nu există nicio destinație. Adaugă prima din formular.</p>
      ) : afisate.length === 0 ? (
        <p className="gol">Niciun rezultat pentru &laquo;{cautare}&raquo;.</p>
      ) : (
        <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
      )}
    </main>
  );
}