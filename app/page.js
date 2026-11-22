"use client";
import { useState } from "react";

export default function Home() {
  const [objet, setObjet] = useState("");
  const [etat, setEtat] = useState("");
  const [fourni, setFourni] = useState("");
  const [prixNeuf, setPrixNeuf] = useState("");
  const [plateforme, setPlateforme] = useState("Leboncoin");
  const [urgence, setUrgence] = useState("");
  const [resultat, setResultat] = useState("");
  const [chargement, setChargement] = useState(false);

  async function generer(e) {
    e.preventDefault();
    setChargement(true);
    setResultat("");
    try {
      const rep = await fetch("/api/generer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objet, etat, fourni, prixNeuf, plateforme, urgence }),
      });
      const data = await rep.json();
      setResultat(data.texte || data.erreur || "Une erreur est survenue.");
    } catch (err) {
      setResultat("Une erreur est survenue, réessaie dans un instant.");
    }
    setChargement(false);
  }

  const champ = { width: "100%", padding: 12, margin: "6px 0 16px", borderRadius: 8, border: "1px solid #C9D3DC", fontSize: 16, boxSizing: "border-box" };

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1 style={{ color: "#0B1F3A" }}>Revend<span style={{ color: "#2ED8A3" }}>IA</span></h1>
      <p>Décris ton objet, reçois l'annonce complète, le prix et la négociation.</p>
      <form onSubmit={generer}>
        <label>Objet (marque, modèle, taille ou contenance)</label>
        <input style={champ} value={objet} onChange={(e) => setObjet(e.target.value)} required />
        <label>État réel</label>
        <input style={champ} value={etat} onChange={(e) => setEtat(e.target.value)} required />
        <label>Ce qui est fourni (boîte, facture, accessoires)</label>
        <input style={champ} value={fourni} onChange={(e) => setFourni(e.target.value)} />
        <label>Prix du neuf si tu le connais</label>
        <input style={champ} value={prixNeuf} onChange={(e) => setPrixNeuf(e.target.value)} />
        <label>Plateforme</label>
        <select style={champ} value={plateforme} onChange={(e) => setPlateforme(e.target.value)}>
          <option>Leboncoin</option>
          <option>Vinted</option>
        </select>
        <label>Urgence de vendre, mode de remise</label>
        <input style={champ} value={urgence} onChange={(e) => setUrgence(e.target.value)} />
        <button type="submit" disabled={chargement} style={{ background: "#2ED8A3", color: "#0B1F3A", border: 0, padding: "14px 24px", borderRadius: 8, fontSize: 18, fontWeight: 700, cursor: "pointer" }}>
          {chargement ? "Génération en cours..." : "Générer mon annonce"}
        </button>
      </form>
      {resultat && (
        <pre style={{ whiteSpace: "pre-wrap", background: "white", padding: 20, borderRadius: 8, marginTop: 24, fontFamily: "inherit", lineHeight: 1.5 }}>{resultat}</pre>
      )}
    </main>
  );
}
