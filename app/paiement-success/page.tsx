"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useSearchParams :
| permet de récupérer l'id de la pré-demande dans l'URL.
|
| useEffect :
| permet de confirmer le paiement au chargement de la page.
|
| useState :
| permet d'afficher un message dynamique.
|
*/
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE PAIEMENT CONFIRMÉ
|--------------------------------------------------------------------------
*/
export default function PaiementSuccessPage() {

  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION PARAMÈTRE URL
  |--------------------------------------------------------------------------
  */
  const searchParams = useSearchParams();



  /*
  |--------------------------------------------------------------------------
  | ID DE LA PRÉ-DEMANDE
  |--------------------------------------------------------------------------
  */
  const id = searchParams.get("id");



  /*
  |--------------------------------------------------------------------------
  | MESSAGE AFFICHÉ
  |--------------------------------------------------------------------------
  */
  const [message, setMessage] = useState(
    "Confirmation du paiement en cours..."
  );



  /*
  |--------------------------------------------------------------------------
  | CONFIRMATION DU PAIEMENT
  |--------------------------------------------------------------------------
  |
  | Lorsque la page se charge après le paiement,
  | on appelle /api/paiement.
  |
  | Cette API met à jour :
  | - le statut
  | - la date d'adhésion
  | - la date d'expiration
  |
  */
  useEffect(() => {

    async function confirmerPaiement() {

      try {

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

        const data = await response.json();

        if (response.ok) {

          setMessage(
            "Merci, votre adhésion est désormais finalisée. Votre cotisation annuelle est valable pendant un an à compter de la date du paiement."
          );

        } else {

          setMessage(
            data.message ||
            "Erreur lors de la confirmation du paiement."
          );
        }

      } catch (error) {

        setMessage(
          "Erreur serveur."
        );
      }
    }



    if (id) {

      confirmerPaiement();

    } else {

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
        Paiement confirmé
      </h1>

      <p className={styles.message}>
        {message}
      </p>

    </main>
  );
}