"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useState :
| permet de stocker les valeurs saisies dans le formulaire.
|
| Image :
| permet d'afficher l'image optimisée par Next.js.
|
| Navbar / Footer :
| composants communs du site.
|
| styles :
| fichier CSS Module de la page contact.
|
*/
import { useState } from "react";
import Image from "next/image";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE CONTACT
|--------------------------------------------------------------------------
*/
export default function ContactPage() {

  /*
  |--------------------------------------------------------------------------
  | STATES FORMULAIRE
  |--------------------------------------------------------------------------
  |
  | Chaque state correspond à un champ du formulaire.
  |
  | Exemple :
  | - nom contient ce que l'utilisateur écrit dans le champ Nom.
  | - email contient ce que l'utilisateur écrit dans le champ Email.
  |
  */
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");



  /*
  |--------------------------------------------------------------------------
  | MESSAGE RETOUR UTILISATEUR
  |--------------------------------------------------------------------------
  |
  | Ce state permettra d'afficher un message après l'envoi :
  | - succès
  | - erreur
  |
  */
  const [feedback, setFeedback] = useState("");



  /*
  |--------------------------------------------------------------------------
  | ENVOI FORMULAIRE
  |--------------------------------------------------------------------------
  |
  | Cette fonction est appelée quand l'utilisateur clique
  | sur "Envoyer le message".
  |
  | Ici, on relie le front au back :
  |
  | FRONT :
  | formulaire de contact visible par l'utilisateur
  |
  | BACK :
  | route API /api/contact
  |
  */
  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    /*
    |--------------------------------------------------------------------------
    | EMPÊCHE LE RECHARGEMENT DE LA PAGE
    |--------------------------------------------------------------------------
    |
    | Par défaut, un formulaire HTML recharge la page.
    | Ici, on bloque ce comportement pour envoyer les données avec fetch.
    |
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
    | APPEL API CONTACT
    |--------------------------------------------------------------------------
    |
    | fetch("/api/contact") appelle le fichier :
    |
    | app/api/contact/route.ts
    |
    | C'est ici que le front envoie les données au back.
    |
    */
    const response = await fetch(
      "/api/contact",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nom,
          prenom,
          email,
          objet,
          message,
        }),
      }
    );



    /*
    |--------------------------------------------------------------------------
    | RÉPONSE DE L'API
    |--------------------------------------------------------------------------
    |
    | L'API renvoie un message JSON.
    | Exemple :
    |
    | {
    |   message: "Message envoyé avec succès."
    | }
    |
    */
    const data = await response.json();



    /*
    |--------------------------------------------------------------------------
    | AFFICHAGE RETOUR UTILISATEUR
    |--------------------------------------------------------------------------
    */
    setFeedback(data.message);

    if (response.ok) {
    setNom("");
    setPrenom("");
    setEmail("");
    setObjet("");
    setMessage("");
    }

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
              Contact
            </h1>

            <p className={styles.subtitle}>
              Nous répondons personnellement à tous les e-mails
              que nous recevons. Pour toute question, demande d’information
              ou échange concernant le jardin et la vie de l’association,
              vous pouvez nous contacter via ce formulaire.
            </p>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | FORMULAIRE CONTACT
        |--------------------------------------------------------------------------
        |
        | onSubmit={handleSubmit}
        | signifie :
        | quand l'utilisateur envoie le formulaire,
        | on exécute la fonction handleSubmit.
        |
        */}
        <section className="container py-5">

          <form
            className={styles.formCard}
            onSubmit={handleSubmit}
          >

            {/*
            |--------------------------------------------------------------------------
            | IMAGE
            |--------------------------------------------------------------------------
            */}
            <Image
              src="/photo-plantation-19.jpg"
              alt="Plantation au jardin"
              width={900}
              height={350}
              className={styles.contactImage}
            />



            {/*
            |--------------------------------------------------------------------------
            | NOM
            |--------------------------------------------------------------------------
            */}
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



            {/*
            |--------------------------------------------------------------------------
            | PRÉNOM
            |--------------------------------------------------------------------------
            */}
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



            {/*
            |--------------------------------------------------------------------------
            | EMAIL
            |--------------------------------------------------------------------------
            */}
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



            {/*
            |--------------------------------------------------------------------------
            | OBJET
            |--------------------------------------------------------------------------
            */}
            <div className="mb-4">

              <label className={styles.label}>
                Objet de la demande
              </label>

              <select
                className={styles.input}
                value={objet}
                onChange={(event) =>
                  setObjet(event.target.value)
                }
              >

                <option value="" disabled>
                  Sélectionnez un objet
                </option>

                <option value="parcelle">
                  Renseignement sur une parcelle
                </option>

                <option value="adhesion">
                  Adhésion
                </option>

                <option value="evenement">
                  Événement
                </option>

                <option value="don">
                  Don
                </option>

                <option value="autre">
                  Autre
                </option>

              </select>

            </div>



            {/*
            |--------------------------------------------------------------------------
            | MESSAGE
            |--------------------------------------------------------------------------
            */}
            <div className="mb-4">

              <label className={styles.label}>
                Message
              </label>

              <textarea
                className={styles.textarea}
                placeholder="Votre message..."
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
              />

            </div>



            {/*
            |--------------------------------------------------------------------------
            | BOUTON
            |--------------------------------------------------------------------------
            */}
            <button
              type="submit"
              className={styles.button}
            >
              Envoyer le message
            </button>



            {/*
            |--------------------------------------------------------------------------
            | MESSAGE RETOUR
            |--------------------------------------------------------------------------
            */}
            {feedback && (

              <p className={styles.feedback}>
                {feedback}
              </p>

            )}

          </form>

        </section>

      </main>

      <Footer />
    </>

  );
}