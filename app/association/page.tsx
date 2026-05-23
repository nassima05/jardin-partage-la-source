import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

export default function AssociationPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>
              Qui sommes-nous ?
            </h1>

            <p className={styles.subtitle}>
              Une association locale née d’un projet collectif autour du jardinage,
              du lien social et du respect de l’environnement.
            </p>
          </div>
        </section>

        <section className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <h2>Une association ancrée dans le quartier</h2>

              <p>
                Fondée le 17 mai 2021, l’Association Jardin Partagé La Source
                s’inscrit dans la vie du quartier Bernard de Jussieu à Versailles.
              </p>
              <p>Mis à disposition par Versailles Habitat 
                en collaboration avec la mairie de Versailles.</p>

              <p>
                Elle rassemble des habitants autour d’un espace commun de jardinage,
                cultivé dans un esprit de convivialité, de respect mutuel et de
                transmission.
              </p>
            </div>

            <div className="col-md-6">
              <Image
                src="/photo-cerisier-7.jpg"
                alt="Arbre fruitier du Jardin Partagé La Source"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        <section className={styles.lightSection}>
          <div className="container py-5">
            <h2>L’objet de l’association</h2>

            <p>
              L’association assure la gestion et l’animation d’un espace commun
              de jardinage dans une démarche respectueuse de l’environnement.
            </p>

            <p>
              Le terrain est cultivé par les adhérents actifs, qui participent
              à une gestion écologique du site. Les parcelles peuvent être
              individuelles et/ou collectives selon les espaces disponibles.
            </p>

            <p>
              Le jardin est aussi un lieu d’expérimentation écologique,
              de transmission des savoirs et d’initiation aux pratiques potagères,
              notamment le jardinage biologique et la permaculture.
            </p>
          </div>
        </section>

        <section className="container py-5">
          <h2>L’esprit du jardin</h2>

          <p>
            Le Jardin Partagé La Source favorise les moments d’échanges,
            de partage et de rencontres autour de la pratique du jardinage.
          </p>

          <p>
            Il contribue à renforcer le lien social entre les habitants,
            à encourager les solidarités et à créer un espace ouvert aux
            rencontres intergénérationnelles et culturelles.
          </p>

          <p>
            Chaque jardinier participe à faire vivre cet esprit en respectant
            les autres, le fonctionnement du jardin et l’environnement.
          </p>
        </section>

        <section className={styles.lightSection}>
          <div className="container py-5">
            <h2>Informations officielles</h2>

            <div className={styles.infoCard}>
              <p><strong>Nom :</strong> Association Jardin Partagé La Source</p>
              <p><strong>Type :</strong> Association loi 1901</p>
              <p><strong>Date de création :</strong> 17 mai 2021</p>
              <p><strong>Numéro RNA :</strong> W784010254</p>
              <p><strong>Localisation :</strong> Quartier Bernard de Jussieu à Versailles</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}