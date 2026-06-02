import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container text-center">
            <h1 className={styles.title}>Mentions légales</h1>

            <p className={styles.subtitle}>
              Informations légales relatives au site du Jardin Partagé La Source.
            </p>
          </div>
        </section>

        <section className="container py-5">
          <div className={styles.legalCard}>
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par l’association Jardin Partagé La Source,
              association loi 1901 située dans le quartier Bernard de Jussieu à
              Versailles dont le siège sociale est situé : 8 rue Andre Campra ,78000 Versailles
            </p>

            <p>
              Numéro RNA : W784010254
            </p>

            <h2>Responsable de la publication</h2>
            <p>
              Le responsable de la publication est le Président Karmadine Wirdane.Date de création: 17 Mai 2021
              tél:07.45.03.78.72
              Mail:jardinpartage.lasource@gmail.com
            </p>

            <h2>Hébergement</h2>
            <p>
              Les informations concernant l’hébergeur seront complétées lors de
              la mise en ligne définitive du site.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              Les contenus présents sur ce site, notamment les textes, images,
              photographies, logos et éléments graphiques, sont protégés par le
              droit de la propriété intellectuelle.
            </p>

            <p>
              Toute reproduction ou utilisation non autorisée des contenus du site
              est interdite sans accord préalable de l’association.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Les données transmises via les formulaires du site sont utilisées
              uniquement pour répondre aux demandes des utilisateurs, gérer les
              adhésions, les demandes de parcelles ou les prises de contact avec
              l’association.
            </p>

            <h2>Contact</h2>
            <p>
              Pour toute question concernant le site ou les informations légales,
              vous pouvez contacter l’association via la page Contact.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}