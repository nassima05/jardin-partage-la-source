/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| "use client" :
| Permet d’utiliser useState et les événements React côté client.
|
*/
"use client";



/*
|--------------------------------------------------------------------------
| IMPORTS NEXT / REACT
|--------------------------------------------------------------------------
*/
import { useState } from "react";
import Image from "next/image";



/*
|--------------------------------------------------------------------------
| COMPONENTS
|--------------------------------------------------------------------------
*/
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";



/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/
import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE DON
|--------------------------------------------------------------------------
*/
export default function DonPage() {



  /*
  |--------------------------------------------------------------------------
  | MONTANT SÉLECTIONNÉ
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
  */
  const [message, setMessage] = useState("");



  /*
  |--------------------------------------------------------------------------
  | FONCTION STRIPE
  |--------------------------------------------------------------------------
  |
  | Envoie le montant à l’API Stripe
  | puis redirige vers la page de paiement.
  |
  */
  async function faireDon() {



    /*
    |--------------------------------------------------------------------------
    | CONVERSION DU MONTANT
    |--------------------------------------------------------------------------
    |
    | Remplace les virgules par des points.
    |
    */
    const montantNumber = Number(
      montant.replace(",", ".")
    );



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION MINIMUM
    |--------------------------------------------------------------------------
    */
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
    */
    const response = await fetch("/api/don", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        montant: montantNumber,
      }),

    });



    /*
    |--------------------------------------------------------------------------
    | RÉPONSE API
    |--------------------------------------------------------------------------
    */
    const data = await response.json();



    /*
    |--------------------------------------------------------------------------
    | REDIRECTION STRIPE
    |--------------------------------------------------------------------------
    */
    if (response.ok) {

      window.location.href = data.url;

    } else {

      setMessage(
        data.message || "Erreur lors du paiement."
      );
    }
  }



  /*
  |--------------------------------------------------------------------------
  | RENDER PAGE
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

          <div className="container">

            <h1 className={styles.title}>
              Soutenir le jardin
            </h1>

            <p className={styles.subtitle}>
              Chaque contribution aide concrètement
              le jardin à continuer de grandir
              et à accueillir habitants, familles
              et visiteurs dans un espace de partage
              et de convivialité.
            </p>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | SECTION DON
        |--------------------------------------------------------------------------
        */}
        <section className={styles.donationSection}>

          <div className="container">

            <div className={styles.donationCard}>



              {/*
              |--------------------------------------------------------------------------
              | TITRE
              |--------------------------------------------------------------------------
              */}
              <h2 className={styles.cardTitle}>
                Faire un don
              </h2>

              <p className={styles.text}>
                Vous pouvez choisir un montant prédéfini
                ou indiquer le montant de votre choix.
              </p>



              {/*
              |--------------------------------------------------------------------------
              | IMAGE
              |--------------------------------------------------------------------------
              */}
              <Image
                src="/photo-enfant-jardin-18.jpg"
                alt="Participants du Jardin Partagé La Source"
                width={900}
                height={350}
                className={styles.donationImage}
              />



              {/*
              |--------------------------------------------------------------------------
              | BOUTONS MONTANTS
              |--------------------------------------------------------------------------
              */}
              <div className={styles.amounts}>



                <button
                  className={styles.amountButton}
                  onClick={() => setMontant("5")}
                >
                  5 €
                </button>



                <button
                  className={styles.amountButton}
                  onClick={() => setMontant("10")}
                >
                  10 €
                </button>



                <button
                  className={styles.amountButton}
                  onClick={() => setMontant("20")}
                >
                  20 €
                </button>



                <button
                  className={styles.amountButton}
                  onClick={() => setMontant("50")}
                >
                  50 €
                </button>



                <button
                  className={styles.amountButton}
                  onClick={() => setMontant("100")}
                >
                  100 €
                </button>

              </div>



              {/*
              |--------------------------------------------------------------------------
              | MONTANT PERSONNALISÉ
              |--------------------------------------------------------------------------
              */}
              <div className={styles.customAmount}>



                <input
                  type="text"
                  placeholder="Montant au choix"
                  value={montant}
                  onChange={(event) =>
                    setMontant(event.target.value)
                  }
                  className={styles.input}
                />



                <button
                  onClick={faireDon}
                  className={styles.submitButton}
                >
                  Faire un don
                </button>

              </div>



              {/*
              |--------------------------------------------------------------------------
              | MESSAGE ERREUR
              |--------------------------------------------------------------------------
              */}
              {message && (

                <p className={styles.error}>
                  {message}
                </p>

              )}



              {/*
              |--------------------------------------------------------------------------
              | UTILITÉ DES DONS
              |--------------------------------------------------------------------------
              */}
              <div className={styles.projectBox}>

                <h3>
                  À quoi servent les dons ?
                </h3>

                <ul>

                  <li>
                    Réparer la clôture du jardin
                  </li>

                  <li>
                    Acheter des récupérateurs d’eau de pluie
                  </li>

                  <li>
                    Acheter un cabanon pour les outils
                  </li>

                  <li>
                    Développer les espaces de culture
                  </li>

                  <li>
                    Organiser des événements et ateliers
                  </li>

                  <li>
                    Aménager un espace d’accueil
                    pour les familles
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </section>

      </main>



      <Footer />
    </>
  );
}