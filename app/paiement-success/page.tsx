"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

// Hook Next.js
// Permet de récupérer les paramètres URL
import { useSearchParams } from "next/navigation";

// Hooks React
import { useEffect, useState } from "react";

// Import CSS module
import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE PAIEMENT SUCCESS
|--------------------------------------------------------------------------
*/
export default function PaiementSuccessPage() {

  /*
  |--------------------------------------------------------------------------
  | PARAMÈTRES URL
  |--------------------------------------------------------------------------
  |
  | Exemple :
  |
  | /paiement-success?id=18
  |
  */
  const searchParams = useSearchParams();


  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION ID DEMANDE
  |--------------------------------------------------------------------------
  */
  const id = searchParams.get("id");


  /*
  |--------------------------------------------------------------------------
  | MESSAGE AFFICHÉ
  |--------------------------------------------------------------------------
  */
  const [message, setMessage] = useState(
    "Confirmation du paiement..."
  );


  /*
  |--------------------------------------------------------------------------
  | useEffect
  |--------------------------------------------------------------------------
  |
  | Exécuté au chargement de la page
  |
  */
  useEffect(() => {

    /*
    |--------------------------------------------------------------------------
    | FONCTION CONFIRMATION PAIEMENT
    |--------------------------------------------------------------------------
    */
    async function confirmerPaiement() {

      try {

        /*
        |--------------------------------------------------------------------------
        | APPEL API /api/paiement
        |--------------------------------------------------------------------------
        |
        | Met à jour :
        |
        | statut = adhesion_finalisee
        |
        */
        const response = await fetch(
          "/api/paiement",
          {

            method: "PATCH",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({

              id_predemande: id,
            }),
          }
        );


        /*
        |--------------------------------------------------------------------------
        | RÉCUPÉRATION JSON
        |--------------------------------------------------------------------------
        */
        const data = await response.json();


        /*
        |--------------------------------------------------------------------------
        | SI SUCCÈS
        |--------------------------------------------------------------------------
        */
        if (response.ok) {

          setMessage(
            "Paiement confirmé. Votre adhésion est désormais finalisée."
          );

        } else {

          /*
          |--------------------------------------------------------------------------
          | SI ERREUR API
          |--------------------------------------------------------------------------
          */
          setMessage(
            data.message ||
            "Erreur lors de la confirmation du paiement."
          );
        }

      } catch (error) {

        /*
        |--------------------------------------------------------------------------
        | SI ERREUR SERVEUR
        |--------------------------------------------------------------------------
        */
        setMessage(
          "Erreur serveur."
        );
      }
    }


    /*
    |--------------------------------------------------------------------------
    | SI ID EXISTE
    |--------------------------------------------------------------------------
    */
    if (id) {

      confirmerPaiement();

    } else {

      /*
      |--------------------------------------------------------------------------
      | SI ID ABSENT
      |--------------------------------------------------------------------------
      */
      setMessage(
        "Paiement introuvable."
      );
    }

  }, [id]);


  /*
  |--------------------------------------------------------------------------
  | AFFICHAGE PAGE
  |--------------------------------------------------------------------------
  */
  return (

    <main className={styles.container}>

      <h1 className={styles.title}>
        Paiement Stripe
      </h1>

      <p className={styles.message}>
        {message}
      </p>

    </main>
  );
}