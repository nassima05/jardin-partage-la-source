import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function FaqPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container text-center">
            <h1 className={styles.title}>FAQ</h1>

            <p className={styles.subtitle}>
              Retrouvez ici les réponses aux questions les plus fréquentes
              concernant le Jardin Partagé La Source.
            </p>
          </div>
        </section>

        <section className="container py-5">
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <h2>Qui peut rejoindre l’association ?</h2>
              <p>
                Toute personne intéressée par le jardinage, l’écologie,
                le partage et la vie collective peut rejoindre l’association.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2>Faut-il habiter Versailles pour adhérer ?</h2>
              <p>
                Non, l’adhésion simple permet de soutenir l’association et de
                participer à la vie du jardin. En revanche, la demande de
                parcelle est réservée aux habitants de Versailles.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2>Comment demander une parcelle ?</h2>
              <p>
                Il suffit de remplir le formulaire de demande de parcelle depuis
                la page Adhésion. L’association étudie ensuite la demande selon
                les disponibilités.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2>Les récoltes peuvent-elles être vendues ?</h2>
              <p>
                Non. Les récoltes du jardin sont partagées ou données
                gratuitement. La vente est interdite.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2>Peut-on venir visiter le jardin ?</h2>
              <p>
                Oui, une visite peut être proposée selon les disponibilités de
                l’association et l’organisation du jardin.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h2>Comment contacter l’association ?</h2>
              <p>
                Vous pouvez contacter l’association depuis la page Contact pour
                toute question concernant l’adhésion, les parcelles, les dons ou
                les événements.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}