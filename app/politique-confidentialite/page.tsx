import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>

        <section className={styles.hero}>

          <div className="container text-center">

            <h1 className={styles.title}>
              Politique de confidentialité
            </h1>

            <p className={styles.subtitle}>
              Cette politique explique comment les données personnelles
              sont collectées et utilisées par l'association Jardin
              Partagé La Source.
            </p>

          </div>

        </section>



        <section className="container py-5">

          <div className={styles.contentCard}>

            <h2>1. Responsable du traitement</h2>

            <p>
              Les données personnelles collectées sur ce site sont
              traitées par l'association Jardin Partagé La Source.
            </p>



            <h2>2. Données collectées</h2>

            <p>
              Les formulaires du site peuvent collecter les données
              suivantes :
            </p>

            <ul>

              <li>Nom et prénom</li>

              <li>Adresse e-mail</li>

              <li>Numéro de téléphone</li>

              <li>Adresse postale</li>

              <li>Ville de résidence</li>

              <li>Contenu des messages envoyés</li>

            </ul>



            <h2>3. Finalités du traitement</h2>

            <p>
              Les données sont utilisées uniquement pour :
            </p>

            <ul>

              <li>Répondre aux demandes de contact</li>

              <li>Gérer les adhésions</li>

              <li>Gérer les demandes de parcelles</li>

              <li>Communiquer avec les adhérents</li>

              <li>Assurer le suivi administratif de l'association</li>

            </ul>



            <h2>4. Dons en ligne</h2>

            <p>
              Les paiements réalisés sur le site sont traités par Stripe.
            </p>

            <p>
              Les informations bancaires ne sont jamais stockées par
              l'association Jardin Partagé La Source.
            </p>



            <h2>5. Durée de conservation</h2>

            <p>
              Les données sont conservées uniquement pendant la durée
              nécessaire à la gestion des demandes et aux obligations
              administratives de l'association.
            </p>



            <h2>6. Destinataires des données</h2>

            <p>
              Les données sont accessibles uniquement aux personnes
              habilitées au sein de l'association.
            </p>



            <h2>7. Sécurité des données</h2>

            <p>
              L'association met en œuvre des mesures techniques et
              organisationnelles destinées à protéger les données
              personnelles contre tout accès non autorisé.
            </p>



            <h2>8. Vos droits</h2>

            <p>
              Conformément au Règlement Général sur la Protection des
              Données (RGPD), vous disposez notamment :
            </p>

            <ul>

              <li>D'un droit d'accès</li>

              <li>D'un droit de rectification</li>

              <li>D'un droit d'effacement</li>

              <li>D'un droit d'opposition</li>

              <li>D'un droit à la limitation du traitement</li>

            </ul>



            <h2>9. Contact</h2>

            <p>
              Pour toute question concernant vos données personnelles,
              vous pouvez contacter l'association à l'adresse :8 rue Andre Campra,78000 Versailles
            </p>

            <p>
              Email de l'association:jardinpartage.lasource@gmail.com
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}