import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import styles from "./page.module.css";

export default function PolitiqueCookiesPage() {

  return (
    <>
      <Navbar />

      <main className={styles.main}>

        <section className={styles.hero}>

          <div className="container text-center">

            <h1 className={styles.title}>
              Politique de cookies
            </h1>

            <p className={styles.subtitle}>
              Cette page explique l'utilisation des cookies sur le site
              du Jardin Partagé La Source.
            </p>

          </div>

        </section>



        <section className="container py-5">

          <div className={styles.contentCard}>

            <h2>1. Qu'est-ce qu'un cookie ?</h2>

            <p>
              Un cookie est un petit fichier enregistré sur votre appareil
              lors de votre navigation sur un site internet.
            </p>

            <p>
              Il permet notamment de mémoriser certaines informations
              afin d'améliorer l'expérience utilisateur.
            </p>



            <h2>2. Cookies utilisés sur ce site</h2>

            <p>
              Le site utilise uniquement les cookies nécessaires à son
              fonctionnement et à sa sécurité.
            </p>

            <ul>

              <li>
                Cookies techniques nécessaires au fonctionnement du site
              </li>

              <li>
                Cookie d'authentification administrateur
              </li>

              <li>
                Cookies liés au service de paiement Stripe
              </li>

            </ul>



            <h2>3. Cookie administrateur</h2>

            <p>
              Lorsqu'un administrateur se connecte à l'espace de gestion,
              un cookie sécurisé est créé afin de maintenir sa session
              ouverte pendant une durée limitée.
            </p>

            <p>
              Ce cookie n'est pas utilisé à des fins publicitaires.
            </p>



            <h2>4. Paiements sécurisés</h2>

            <p>
              Les paiements réalisés sur le site sont traités par Stripe.
            </p>

            <p>
              Stripe peut déposer certains cookies nécessaires à la
              sécurisation des transactions et à la prévention de la fraude.
            </p>



            <h2>5. Gestion des cookies</h2>

            <p>
              Vous pouvez à tout moment configurer votre navigateur afin
              de limiter ou supprimer les cookies.
            </p>

            <p>
              Certaines fonctionnalités du site peuvent toutefois être
              affectées en cas de désactivation des cookies techniques.
            </p>



            <h2>6. Évolution de la politique</h2>

            <p>
              Cette politique peut être mise à jour afin de refléter les
              évolutions du site ou des obligations légales.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}