"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";


import styles from "./page.module.css";



export default function CreerEspaceAdherentPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");

    const response = await fetch(
      "/api/adherent/create-account",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token,
          pseudo,
          password,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    setMessage(data.message);

    if (response.ok) {
      setPseudo("");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (

    

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container text-center">

            <img
              src="/logo-jardin.png"
              alt="Logo Jardin Partagé La Source"
             className={styles.logo}
            />

            <h1 className={styles.title}>
              Créer votre espace adhérent
            </h1>

            <p className={styles.subtitle}>
              Choisissez un pseudo et un mot de passe pour accéder
              à votre espace réservé aux adhérents.
            </p>
          </div>
        </section>

        <section className="container py-5">
          <form
            className={styles.formCard}
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className={styles.label}>
                Pseudo
              </label>

              <input
                type="text"
                required
                className={styles.input}
                placeholder="Exemple : Potager78"
                value={pseudo}
                onChange={(event) =>
                  setPseudo(event.target.value)
                }
              />
            </div>

            <div className="mb-4">
              <label className={styles.label}>
                Mot de passe
              </label>

              <input
                type="password"
                required
                className={styles.input}
                placeholder="Minimum 8 caractères"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />
            </div>

            <div className="mb-4">
              <label className={styles.label}>
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                required
                className={styles.input}
                placeholder="Confirmez votre mot de passe"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className={styles.button}
            >
              Créer mon espace adhérent
            </button>

            {message && (
              <p className={styles.feedback}>
                {message}
              </p>
            )}
          </form>
        </section>
      </main>

     
    
  );
}