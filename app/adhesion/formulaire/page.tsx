"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useState :
| permet de stocker les valeurs saisies dans le formulaire.
|
| useSearchParams :
| permet de récupérer le type de demande dans l’URL.
|
| Exemple :
| /adhesion/formulaire?type=demande-parcelle
|
*/
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE FORMULAIRE ADHÉSION / PARCELLE
|--------------------------------------------------------------------------
*/
export default function FormulaireAdhesionPage() {

  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION DU PARAMÈTRE URL
  |--------------------------------------------------------------------------
  */
  const searchParams = useSearchParams();



  /*
  |--------------------------------------------------------------------------
  | TYPE DANS L'URL
  |--------------------------------------------------------------------------
  |
  | Dans l’URL, on reçoit :
  | adhesion-simple
  | demande-parcelle
  |
  */
  const type = searchParams.get("type");



  /*
  |--------------------------------------------------------------------------
  | SAVOIR SI C'EST UNE DEMANDE DE PARCELLE
  |--------------------------------------------------------------------------
  */
  const isParcelle = type === "demande-parcelle";



  /*
  |--------------------------------------------------------------------------
  | TYPE POUR L'API
  |--------------------------------------------------------------------------
  |
  | Ton API /api/pre-demandes attend :
  |
  | adhesion_simple
  | demande_parcelle
  |
  | Donc on transforme le type de l’URL au bon format.
  |
  */
  const typeDemande = isParcelle
    ? "demande_parcelle"
    : "adhesion_simple";



  /*
  |--------------------------------------------------------------------------
  | STATES FORMULAIRE
  |--------------------------------------------------------------------------
  |
  | Chaque state correspond à un champ envoyé à l’API.
  |
  */
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [motivation, setMotivation] = useState("");



  /*
  |--------------------------------------------------------------------------
  | MESSAGE RETOUR UTILISATEUR
  |--------------------------------------------------------------------------
  */
  const [feedback, setFeedback] = useState("");

   /*
  |--------------------------------------------------------------------------
  | FORMAT TÉLÉPHONE
  |--------------------------------------------------------------------------
  |
  | Cette fonction garde uniquement les chiffres,
  | limite à 10 chiffres,
  | puis ajoute un espace tous les 2 chiffres.
  |
  | Exemple :
  | 0612345678
  | devient :
  | 06 12 34 56 78
  |
  */
  function formatPhone(value: string) {

    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 10);

    return numbers.replace(
      /(\d{2})(?=\d)/g,
      "$1 "
    );
  }




  /*
  |--------------------------------------------------------------------------
  | TITRE DYNAMIQUE
  |--------------------------------------------------------------------------
  */
  const pageTitle = isParcelle
    ? "Demande de parcelle"
    : "Demande d’adhésion";



  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION DYNAMIQUE
  |--------------------------------------------------------------------------
  */
  const pageText = isParcelle
    ? "Remplissez ce formulaire afin de transmettre votre demande de parcelle au Jardin Partagé La Source."
    : "Remplissez ce formulaire afin de rejoindre l’association et participer à la vie du jardin.";



  /*
  |--------------------------------------------------------------------------
  | ENVOI FORMULAIRE
  |--------------------------------------------------------------------------
  |
  | Cette fonction relie :
  |
  | FRONT :
  | app/adhesion/formulaire/page.tsx
  |
  | BACK :
  | app/api/pre-demandes/route.ts
  |
  */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    /*
    |--------------------------------------------------------------------------
    | EMPÊCHE LE RECHARGEMENT PAGE
    |--------------------------------------------------------------------------
    */
    event.preventDefault();



    /*
    |--------------------------------------------------------------------------
    | RESET MESSAGE
    |--------------------------------------------------------------------------
    */
    setFeedback("");



    /*
    |--------------------------------------------------------------------------
    | APPEL API PRÉ-DEMANDES
    |--------------------------------------------------------------------------
    |
    | On envoie les données vers :
    | /api/pre-demandes
    |
    */
    const response = await fetch(
      "/api/pre-demandes",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nom,
          prenom,
          email,
          telephone,
          adresse,
          ville,
          type_demande: typeDemande,

          
          motivation,
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
    | AFFICHAGE MESSAGE UTILISATEUR
    |--------------------------------------------------------------------------
    */
    setFeedback(data.message);



    /*
    |--------------------------------------------------------------------------
    | VIDAGE FORMULAIRE SI SUCCÈS
    |--------------------------------------------------------------------------
    */
    if (response.ok) {

      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setAdresse("");
      setVille("");
      setMotivation("");
    }



    /*
    |--------------------------------------------------------------------------
    | DEBUG NAVIGATEUR
    |--------------------------------------------------------------------------
    */
    console.log(data);
  }



  /*
  |--------------------------------------------------------------------------
  | AFFICHAGE PAGE
  |--------------------------------------------------------------------------
  */
  return (

    <>
      <Navbar />

      <main className={styles.main}>

        {/*
        |--------------------------------------------------------------------------
        | HERO
        |--------------------------------------------------------------------------
        */}
        <section className={styles.hero}>

          <div className="container text-center">

            <h1 className={styles.title}>
              {pageTitle}
            </h1>

            <p className={styles.subtitle}>
              {pageText}
            </p>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | FORMULAIRE
        |--------------------------------------------------------------------------
        */}
        <section className="container py-5">

          <form
            className={styles.formCard}
            onSubmit={handleSubmit}
          >

            {/* NOM */}
            <div className="mb-4">

              <label className={styles.label}>
                Nom
              </label>

              <input
                type="text"
                className={styles.input}
                placeholder="Votre nom"
                value={nom}
                onChange={(event) =>
                  setNom(event.target.value)
                }
              />

            </div>



            {/* PRÉNOM */}
            <div className="mb-4">

              <label className={styles.label}>
                Prénom
              </label>

              <input
                type="text"
                className={styles.input}
                placeholder="Votre prénom"
                value={prenom}
                onChange={(event) =>
                  setPrenom(event.target.value)
                }
              />

            </div>



            {/* EMAIL */}
            <div className="mb-4">

              <label className={styles.label}>
                Adresse email
              </label>

              <input
                type="email"
                className={styles.input}
                placeholder="email@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>



            {/* TÉLÉPHONE */}
            <div className="mb-4">

              <label className={styles.label}>
                Téléphone
              </label>

              <input
                type="tel"
                className={styles.input}
                placeholder="Votre numéro"
                value={telephone}
                onChange={(event) =>
                  setTelephone(
                    formatPhone (event.target.value)
                )
               }
              />

            </div>



            {/* ADRESSE */}
            <div className="mb-4">

              <label className={styles.label}>
                Adresse
              </label>

              <input
                type="text"
                className={styles.input}
                placeholder="Votre adresse"
                value={adresse}
                onChange={(event) =>
                  setAdresse(event.target.value)
                }
              />

            </div>



            {/* VILLE */}
            <div className="mb-4">

              <label className={styles.label}>
                Ville
              </label>

              <input
                type="text"
                className={styles.input}
                placeholder="Votre ville"
                value={ville}
                onChange={(event) =>
                  setVille(event.target.value)
                }
              />

            </div>



            {/* MOTIVATION / PROJET */}
            <div className="mb-4">

              <label className={styles.label}>
                Motivation / projet
              </label>

              <textarea
                className={styles.textarea}
                placeholder={
                  isParcelle
                    ? "Expliquez votre projet de culture, vos motivations ou votre expérience en jardinage..."
                    : "Expliquez pourquoi vous souhaitez rejoindre l’association..."
                }
                value={motivation}
                onChange={(event) =>
                  setMotivation(event.target.value)
                }
              />

            </div>



            {/* BOUTON */}
            <button
              type="submit"
              className={styles.button}
            >
              Envoyer la demande
            </button>



            {/* MESSAGE RETOUR */}
            {feedback && (

              <p className={styles.feedback}>
                {feedback}
              </p>

            )}



            {/* RETOUR */}
            <div className="mt-4">

              <Link
                href="/adhesion"
                className={styles.backLink}
              >
                ← Retour à la page adhésion
              </Link>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>

  );
}