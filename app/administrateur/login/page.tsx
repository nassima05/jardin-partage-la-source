"use client";

// Import de useState
// Il permet de stocker la valeur tapée dans le champ mot de passe
import { useState } from "react";

export default function LoginAdminPage() {
  // password contient le mot de passe tapé par l'admin
  const [password, setPassword] = useState("");

  // Cette fonction est appelée quand l'admin clique sur "Se connecter"
  async function handleLogin() {
    // On envoie le mot de passe à l'API /api/admin/login
    const response = await fetch("/api/admin/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password: password,
      }),
    });

    // On récupère la réponse de l'API
    const data = await response.json();

    // Si le mot de passe est correct
    if (response.ok) {
      // On redirige vers l'espace administrateur
      window.location.href = "/administrateur";
    } else {
      // Sinon on affiche un message d'erreur
      alert(data.message || "Mot de passe incorrect");
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Connexion administrateur</h1>

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Se connecter
      </button>
    </main>
  );
}