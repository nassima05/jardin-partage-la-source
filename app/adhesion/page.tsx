import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function AdhesionPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <h1 className={styles.title}>
                  Adhésion
                </h1>

                <p className={styles.subtitle}>
                  Deux possibilités : participer à la vie associative
                  ou demander une parcelle.
                </p>

                <p className={styles.text}>
                  Le Jardin Partagé La Source rassemble des habitants
                  du quartier, des passionnés de jardinage et des personnes
                  venues de différents horizons autour d’un projet collectif,
                  écologique et convivial.
                </p>
              </div>

              <div className="col-md-6">
                <Image
                  src="/photo-jardin-3.jpg"
                  alt="Jardin partagé dans le quartier Bernard de Jussieu"
                  width={600}
                  height={400}
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <h2 className={styles.sectionTitle}>
                Rejoindre le jardin partagé
              </h2>

              <p className={styles.text}>
                L’adhésion permet de soutenir le Jardin Partagé La Source,
                de participer à la vie associative, aux événements,
                aux échanges de savoirs et aux projets collectifs.
              </p>

              <p className={styles.feeInfo}>
              La cotisation annuelle est fixée à <strong>40 €</strong>.
              Elle concerne l’adhésion simple ainsi que les demandes de parcelle.
              </p>

            </div>

            <div className="col-md-5">
              <div className={styles.logoZoomWrapper}>
                <Image
                  src="/logo-jardin.png"
                  alt="Logo Jardin Partagé La Source"
                  width={500}
                  height={500}
                  className={styles.logoZoom}
                />

                <div className={styles.valuesAnimation}>
                  <span className={`${styles.word} ${styles.blue}`}>
                    Écologie
                  </span>

                  <span className={`${styles.word} ${styles.white}`}>
                    Citoyenneté
                  </span>

                  <span className={`${styles.word} ${styles.orange}`}>
                    Partage
                  </span>

                  <span className={`${styles.word} ${styles.black}`}>
                    Solidarité
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.lightSection}>
          <div className="container py-5">
            <h2 className={styles.blackTitle}>
              Choisir son type de participation
            </h2>

            <div className="row g-4">
              <div className="col-md-6">
                <div className={styles.card}>
                  <h3>Adhésion simple</h3>

                  <p>
                    Pour les personnes qui souhaitent participer aux événements,
                    échanger avec les adhérents ou contribuer à la vie du jardin
                    sans demander de parcelle.
                  </p>
                  <p className={styles.cardFee}>
                  Cotisation annuelle : <strong>40 €</strong>
                  </p>

                  <ul>
                    <li>Participer aux événements</li>
                    <li>Échanger des savoirs et conseils</li>
                    <li>Soutenir les projets du jardin</li>
                    <li>Rejoindre une dynamique collective</li>
                  </ul>

                 <Link
                    href="/adhesion/formulaire?type=adhesion-simple"
                    className={styles.button}
                 >
                  Faire une demande d’adhésion
                 </Link>
                </div>
              </div>

              <div className="col-md-6">
                <div className={styles.card}>
                  <h3>Demande de parcelle</h3>

                  <p>
                    Pour les personnes résidant à Versailles qui souhaitent
                    cultiver une parcelle individuelle ou participer à une
                    parcelle collective selon les disponibilités.
                  </p>
                  <p className={styles.cardFee}>
                  Cotisation annuelle : <strong>40 €</strong>
                  </p>

                  <ul>
                    <li>Réservé aux habitants de Versailles</li>
                    <li>Adhésion automatique à l’association</li>
                    <li>Attribution selon les disponibilités</li>
                    <li>Parcelles d’environ 9 m² à 50 m²</li>
                  </ul>

                  <Link
                     href="/adhesion/formulaire?type=demande-parcelle"
                     className={styles.button}
                  >
                   Demander une parcelle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <Image
                src="/photo-jardin-1.jpg"
                alt="Vue du jardin partagé"
                width={420}
                height={300}
                className={styles.smallImage}
              />
            </div>

            <div className="col-md-6">
              <h2 className={styles.blackTitle}>
                Après la demande en ligne
              </h2>

              <p className={styles.text}>
                Toute personne souhaitant rejoindre l’association, participer
                aux activités du jardin ou demander une parcelle peut être
                accueillie afin de découvrir le lieu, rencontrer les adhérents
                et échanger autour du projet collectif.
              </p>

              <p className={styles.text}>
                Les demandes de parcelles sont étudiées selon les disponibilités,
                l’organisation du jardin et les informations transmises lors
                de la prise de contact.
              </p>

              <p className={styles.text}>
                L’association pourra également proposer une rencontre ou une visite
                du jardin afin de présenter son fonctionnement, ses valeurs
                et la vie collective du lieu.
              </p>

              <p className={styles.text}>
                Pour toute information complémentaire, vous pouvez contacter
                l’association via la rubrique{" "}
                <Link href="/contact" className={styles.contactLink}>
                  contact
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}