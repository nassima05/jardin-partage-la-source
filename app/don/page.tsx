"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

// Hook React
// Permet de stocker des valeurs dynamiques
import { useState } from "react";

// Import du fichier CSS module
import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE DON
|--------------------------------------------------------------------------
*/
export default function DonPage() {

  /*
  |--------------------------------------------------------------------------
  | MONTANT DU DON
  |--------------------------------------------------------------------------
  |
  | Valeur par défaut :
  | 5 €
  |
  */
  const [montant, setMontant] = useState("5");


  /*
  |--------------------------------------------------------------------------
  | MESSAGE ERREUR
  |--------------------------------------------------------------------------
  |
  | Sert à afficher :
  | - erreurs montant
  | - erreurs Stripe
  |
  */
  const [message, setMessage] = useState("");



  /*
  |--------------------------------------------------------------------------
  | FONCTION FAIRE DON
  |--------------------------------------------------------------------------
  |
  | Exécutée quand l'utilisateur clique
  | sur "Faire un don"
  |
  */
  async function faireDon() {



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION MONTANT
    |--------------------------------------------------------------------------
    |
    | Empêche :
    | 0 €
    | montant négatif
    |
    */
    const montantNumber = Number(
  montant.replace(",", ".")
);

if (!montantNumber || montantNumber < 1) {
  setMessage(
    "Le montant minimum est de 1 €."
  );

  return;
}



    /*
    |--------------------------------------------------------------------------
    | APPEL API STRIPE
    |--------------------------------------------------------------------------
    |
    | Appelle :
    |
    | /api/don
    |
    | Envoie :
    |
    | {
    |   montant: 10
    | }
    |
    */
    const response = await fetch(
      "/api/don",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          montant: montantNumber,
        }),
      }
    );



    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION RÉPONSE
    |--------------------------------------------------------------------------
    */
    const data = await response.json();



    /*
    |--------------------------------------------------------------------------
    | SI SESSION STRIPE CRÉÉE
    |--------------------------------------------------------------------------
    */
    if (response.ok) {



      /*
      |--------------------------------------------------------------------------
      | REDIRECTION STRIPE
      |--------------------------------------------------------------------------
      |
      | Ouvre la page sécurisée Stripe Checkout
      |
      */
      window.location.href = data.url;

    } else {



      /*
      |--------------------------------------------------------------------------
      | SI ERREUR
      |--------------------------------------------------------------------------
      */
      setMessage(

        data.message ||

        "Erreur lors du paiement."
      );
    }
  }



  /*
  |--------------------------------------------------------------------------
  | AFFICHAGE PAGE
  |--------------------------------------------------------------------------
  */
  return (

    <main className={styles.container}>



      {/* TITRE */}
      <h1 className={styles.title}>
        Faire un don
      </h1>



      {/* TEXTE */}
      <p className={styles.text}>
        Soutenez le Jardin Partagé La Source.
      </p>



      {/* TEXTE */}
      <p className={styles.text}>
        Choisissez un montant
        ou indiquez le montant de votre choix.
      </p>



      {/* BOUTONS MONTANTS RAPIDES */}
      <div className={styles.amounts}>

        <button onClick={() => setMontant("5")}>5 €</button>
        <button onClick={() => setMontant("10")}>10 €</button>
        <button onClick={() => setMontant("20")}>20 €</button>
        <button onClick={() => setMontant("50")}>50 €</button>
      </div>



      {/* INPUT MONTANT LIBRE */}
      <input

         type="text"
         inputMode="decimal"
        placeholder="Montant de votre choix"
        value={montant}
        onChange={(event) =>
        setMontant(event.target.value)
       }
        className={styles.input}
      />



      {/* BOUTON DON */}
      <button
        onClick={faireDon}
        className={styles.button}
      >
        Faire un don
      </button>



      {/* MESSAGE ERREUR */}
      {message && (

        <p className={styles.error}>
          {message}
        </p>

      )}

    </main>
  );
}