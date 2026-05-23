/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useSearchParams :
| permet de récupérer le type de demande dans l’URL.
|
| Exemple :
| /adhesion/formulaire?type=demande-parcelle
|
*/
"use client";

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
  | TYPE DE FORMULAIRE
  |--------------------------------------------------------------------------
  |
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

          <div className={styles.formCard}>

            {/* NOM */}
            <div className="mb-4">

              <label className={styles.label}>
                Nom
              </label>

              <input
                type="text"
                className={styles.input}
                placeholder="Votre nom"
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
              />

            </div>



            {/* BOUTON */}
            <button className={styles.button}>

              Envoyer la demande

            </button>



            {/* RETOUR */}
            <div className="mt-4">

              <Link
                href="/adhesion"
                className={styles.backLink}
              >
                ← Retour à la page adhésion
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>

  );
}