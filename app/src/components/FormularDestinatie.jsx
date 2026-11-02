import { useState } from 'react';

export default function FormularDestinatie({ onAdd }) {
  const [oras, setOras] = useState('');
  const [tara, setTara] = useState('');
  const [zile, setZile] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!oras.trim() || !tara.trim()) return;

    const nouaDestinatie = {
      id: crypto.randomUUID(),
      oras: oras.trim(),
      tara: tara.trim(),
      zile: Number(zile) || 1,
      vizitat: false,
    };

    onAdd(nouaDestinatie);

    // Golirea câmpurilor
    setOras('');
    setTara('');
    setZile('');
  }

  return (
    <form className="formular" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Oraş" 
        value={oras} 
        onChange={(e) => setOras(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Ţară" 
        value={tara} 
        onChange={(e) => setTara(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Zile" 
        value={zile} 
        onChange={(e) => setZile(e.target.value)} 
        min="1"
      />
      <button type="submit">Adaugă</button>
    </form>
  );
}