// toome Reactist useState hooki, et hallata muutuvat väärtust komponendi sees
import { useState } from "react";

// default eksport - selle komponendi saab mujale importida kui <App />
export default function App() {

  // 'name' hoiab input väljal olevat väärtust
  // 'setName' on funktsioon, mis uuendab seda väärtust
  const [name, setName] = useState("");

  // 'message' on tekst, mida ekraanile näitame
  // seda kuvame ainult peale nupuvajutust
  const [message, setMessage] = useState("");

  // funktsioon, mis käivitu inputi muutumisel
  // e => event objekt (HTML input muudatus)
  function handleInputChange(e) {
    setName(e.target.value); // uuendab Reacti state'i inputist tuleva väärtusega
  }

  // funktsioon, mis käivitub nupuvajutusel
  // siin otsustame, mida kasutajale näidata
  function handleSubmit() {

    // .trim() eemaldab tühikud algusest ja lõpust
    // .toLowerCase() muudab sisendi väikesteks tähtedeks võrdlemiseks
    if (name.trim().toLowerCase() === "egert") {
      setMessage("Tere tulemast tagasi, Egert!");
    } 
    else if (name.trim() !== "") {
      // kasutad charAt + slice, et panna esimene täht automaatselt suureks
      setMessage("Hei, " + name.charAt(0).toUpperCase() + name.slice(1) + "!");
    } 
    else {
      setMessage(""); // kui tühi, siis ei kuva midagi
    }
  }

  // JSX – see on UI (HTML + JavaScript koos)
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <h1>Sisesta nimi</h1>

      {/* Controlled input: väärtus tuleb Reacti state'ist */}
      <input
        type="text"
        value={name}                 // kontrollime inputit Reactiga
        onChange={handleInputChange} // sisendi muutus
        placeholder="Sisesta nimi..."
        style={{ padding: "8px", marginRight: "8px" }}
      />

      {/* Kui vajutatakse nuppu -> handleSubmit tööle */}
      <button onClick={handleSubmit}>Sisesta</button>

      {/* Näita message ainult siis, kui olemas */}
      {message && <h2>{message}</h2>}
    </main>
  );
}