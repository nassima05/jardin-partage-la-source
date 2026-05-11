"use client";

/*
|--------------------------------------------------------------------------
| use client
|--------------------------------------------------------------------------
|
| Cette page doit fonctionner côté navigateur.
|
| Pourquoi ?
|
| Parce qu'on utilise :
| - useState
| - useSearchParams
| - fetch dynamique
| - window.location.href
|
| Donc :
| cette page est un Client Component.
|
*/


/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

// Hook Next.js
// Permet de lire les paramètres URL
//
// Exemple :
// /paiement?id=18
//
// => récupère "18"
import { useSearchParams } from "next/navigation";


// Hook React
// Permet de stocker un message
// dans la page
import { useState } from "react";



/*
|--------------------------------------------------------------------------
| COMPOSANT PRINCIPAL
|--------------------------------------------------------------------------
*/
export default function PaiementPage() {



  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION PARAMÈTRES URL
  |--------------------------------------------------------------------------
  |
  | useSearchParams lit :
  |
  | ?id=18
  |
  */
  const searchParams = useSearchParams();



  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION ID DEMANDE
  |--------------------------------------------------------------------------
  |
  | Exemple :
  |
  | /paiement?id=18
  |
  | => id = 18
  |
  */
  const id = searchParams.get("id");



  /*
  |--------------------------------------------------------------------------
  | MESSAGE DYNAMIQUE
  |--------------------------------------------------------------------------
  |
  | Sert à afficher :
  |
  | - erreurs Stripe
  | - problèmes API
  |
  */
  const [message, setMessage] = useState("");



  /*
  |--------------------------------------------------------------------------
  | FONCTION CONFIRMER PAIEMENT
  |--------------------------------------------------------------------------
  |
  | Exécutée quand l'utilisateur clique sur :
  |
  | "Confirmer le paiement"
  |
  */
  async function confirmerPaiement() {



    /*
    |--------------------------------------------------------------------------
    | APPEL API CHECKOUT
    |--------------------------------------------------------------------------
    |
    | Appelle :
    |
    | /api/checkout
    |
    | Cette API :
    |
    | - contacte Stripe
    | - crée une session Checkout
    | - génère une URL Stripe
    |
    */
    const response = await fetch(
      "/api/checkout",
      {

        /*
        |--------------------------------------------------------------------------
        | MÉTHODE POST
        |--------------------------------------------------------------------------
        */
        method: "POST",



        /*
        |--------------------------------------------------------------------------
        | HEADERS JSON
        |--------------------------------------------------------------------------
        */
        headers: {
          "Content-Type": "application/json",
        },



        /*
        |--------------------------------------------------------------------------
        | DONNÉES ENVOYÉES
        |--------------------------------------------------------------------------
        |
        | Exemple :
        |
        | {
        |   id_predemande: 18
        | }
        |
        */
        body: JSON.stringify({

          // id récupéré dans l'URL
          id_predemande: id,
        }),
      }
    );



    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION RÉPONSE JSON
    |--------------------------------------------------------------------------
    |
    | Exemple reçu :
    |
    | {
    |   url: "https://checkout.stripe.com/..."
    | }
    |
    */
    const data = await response.json();




    /*
    |--------------------------------------------------------------------------
    | SI STRIPE A BIEN CRÉÉ LA SESSION
    |--------------------------------------------------------------------------
    */
    if (response.ok) {



      /*
      |--------------------------------------------------------------------------
      | REDIRECTION STRIPE CHECKOUT
      |--------------------------------------------------------------------------
      |
      | window.location.href
      |
      | = changer l'URL actuelle du navigateur
      |
      |
      | Exemple :
      |
      | utilisateur actuellement :
      |
      | localhost:3000/paiement?id=18
      |
      |
      | après :
      |
      | checkout.stripe.com/...
      |
      |
      | Donc :
      | le navigateur quitte ton site
      | et ouvre la page Stripe sécurisée.
      |
      */
      window.location.href = data.url;

    } else {



      /*
      |--------------------------------------------------------------------------
      | SI ERREUR
      |--------------------------------------------------------------------------
      |
      | Affiche :
      |
      | - message API
      | OU
      | - message par défaut
      |
      */
      setMessage(

        data.message ||

        "Erreur lors de la création du paiement."
      );
    }
  }



  /*
  |--------------------------------------------------------------------------
  | AFFICHAGE PAGE
  |--------------------------------------------------------------------------
  */
  return (

    /*
    |--------------------------------------------------------------------------
    | CONTENU PRINCIPAL
    |--------------------------------------------------------------------------
    */
    <main style={{ padding: "2rem" }}>



      {/* TITRE */}
      <h1>
        Paiement de la cotisation
      </h1>



      {/* MESSAGE INFORMATION */}
      <p>
        Votre demande a été acceptée.
      </p>



      {/* TEXTE UTILISATEUR */}
      <p>
        Vous pouvez désormais procéder
        au règlement de votre cotisation
        afin de finaliser votre adhésion
        au Jardin Partagé.
      </p>



      {/* MONTANT */}
      <p>
        Montant :
        {" "}
        <strong>
          20 €
        </strong>
      </p>



      {/* BOUTON PAIEMENT */}
      <button onClick={confirmerPaiement}>

        Confirmer le paiement

      </button>



      {/* MESSAGE ERREUR SI BESOIN */}
      {message && (

        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>

      )}

    </main>
  );
}