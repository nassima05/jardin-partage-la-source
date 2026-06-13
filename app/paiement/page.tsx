"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useSearchParams :
| permet de récupérer l'id de la pré-demande dans l'URL.
|
| Exemple :
| /paiement?id=18
|
| useState :
| permet d'afficher un message d'erreur si besoin.
|
*/
import { useSearchParams } from "next/navigation";
import { useState } from "react";



/*
|--------------------------------------------------------------------------
| PAGE PAIEMENT
|--------------------------------------------------------------------------
*/
export default function PaiementPage() {

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
  | MESSAGE DYNAMIQUE
  |--------------------------------------------------------------------------
  */
  const [message, setMessage] = useState("");



  /*
  |--------------------------------------------------------------------------
  | CONFIRMER LE PAIEMENT
  |--------------------------------------------------------------------------
  |
  | Cette fonction appelle l'API /api/checkout.
  |
  | L'API crée une session de paiement sécurisée
  | et renvoie une URL de paiement.
  |
  */
  async function confirmerPaiement() {

    const response = await fetch(
      "/api/checkout",
      {
        method: "POST",

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
    | RÉPONSE API
    |--------------------------------------------------------------------------
    */
    const data = await response.json();



    /*
    |--------------------------------------------------------------------------
    | REDIRECTION VERS LE PAIEMENT SÉCURISÉ
    |--------------------------------------------------------------------------
    */
    if (response.ok) {

      window.location.href = data.url;

    } else {

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

    <main style={{ padding: "2rem" }}>

      <h1>
        Finaliser votre adhésion
      </h1>

      <p>
        Votre demande a été acceptée.
      </p>

      <p>
        Pour confirmer votre adhésion au Jardin Partagé La Source,
        vous pouvez régler votre cotisation annuelle de 40 €.
      </p>

      <p>
        Le paiement est sécurisé. Aucune donnée bancaire
        n’est stockée par l’association.
      </p>

      <p>
        Montant :
        {" "}
        <strong>
          40 €
        </strong>
      </p>

      <button onClick={confirmerPaiement}>
        Payer ma cotisation de 40 €
      </button>

      {message && (

        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>

      )}

    </main>
  );
}