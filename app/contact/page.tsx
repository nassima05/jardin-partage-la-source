/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
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

  return (

    <>
      <Navbar />

      <main className={styles.main}>

        {/* HERO */}
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



        {/* FORMULAIRE + IMAGE */}
<section className="container py-5">

  <div className={styles.formCard}>

    <Image
      src="/photo-plantation-19.jpg"
      alt="Plantation au jardin"
      width={900}
      height={350}
      className={styles.contactImage}
    />



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



    <div className="mb-4">

      <label className={styles.label}>
        Objet de la demande
      </label>

      <select className={styles.input} defaultValue="">

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



    <div className="mb-4">

      <label className={styles.label}>
        Message
      </label>

      <textarea
        className={styles.textarea}
        placeholder="Votre message..."
      />

    </div>



    <button className={styles.button}>
      Envoyer le message
    </button>

  </div>

</section>
      </main>

      <Footer />
    </>
  );
}