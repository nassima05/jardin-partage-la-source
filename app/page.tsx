/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";



/*
|--------------------------------------------------------------------------
| PAGE D'ACCUEIL
|--------------------------------------------------------------------------
*/
export default function Home() {

  return (

    <>
      {/* NAVBAR GLOBALE */}
      <Navbar />



      <main>

        {/*
        |--------------------------------------------------------------------------
        | HERO AVEC PHOTO
        |--------------------------------------------------------------------------
        */}
        <section className={styles.homeHero}>

          <Image
            src="/photo-jardin-5.jpg"
            alt="Photo du Jardin Partagé La Source"
            fill
            className={styles.heroImage}
            priority
          />

          <div className={styles.heroOverlay}>

            <h1 className={styles.heroSlogan}>
              Cultivons la solidarité, le partage et le lien
              dans un jardin écologique respectueux de la nature
            </h1>

            <p className={styles.heroText}>
              Un espace collectif situé dans le quartier Bernard de Jussieu
              à Versailles.
            </p>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | INTRODUCTION
        |--------------------------------------------------------------------------
        */}
        <section className="container py-5">

          <h2 className="text-center mb-4">
            Un jardin partagé au cœur du quartier
          </h2>

          <p className={styles.introText}>
            Le Jardin Partagé La Source est un espace commun de jardinage,
            cultivé et animé par des habitants réunis autour d’un projet
            écologique, convivial et solidaire.
          </p>

          <p className={styles.introText}>
            Situé à Versailles, dans le quartier Bernard de Jussieu,
            le jardin favorise les rencontres, le partage de savoirs,
            la biodiversité urbaine et le respect de l’environnement.
          </p>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | MISSION DU JARDIN
        |--------------------------------------------------------------------------
        */}
        <section className={styles.lightSection}>

          <div className="container py-5">

            <h2 className="text-center mb-4">
              Un lieu d’expérimentation écologique et sociale
            </h2>

            <p className={styles.introText}>
              Le terrain est géré et animé par les adhérents actifs,
              qui le cultivent en mettant en pratique une gestion écologique
              du site. Les parcelles peuvent être individuelles et/ou
              collectives selon les espaces disponibles.
            </p>

            <p className={styles.introText}>
              Le jardin participe au maintien de la biodiversité en milieu
              urbain et à la diffusion des connaissances par l’échange de
              savoirs et de savoir-faire.
            </p>

            <p className={styles.introText}>
              Il est également un lieu privilégié pour encourager des
              thématiques pédagogiques autour du jardinage, du jardinage
              biologique et de la permaculture.
            </p>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | GALERIE PHOTOS
        |--------------------------------------------------------------------------
        */}
        <section className="container py-5">

          <h2 className="text-center mb-4">
            Le jardin en images
          </h2>

          <div className="row g-4">

            <div className="col-md-4">
              <Image
                src="/photo-jardin-1.jpg"
                alt="Vue du jardin partagé"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>

            <div className="col-md-4">
              <Image
                src="/photo-jardin-2.jpg"
                alt="Parcelles du jardin partagé"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>

            <div className="col-md-4">
              <Image
                src="/photo-jardin-6.jpg"
                alt="Parcelles cultivées du jardin partagé"
                width={600}
                height={400}
                className={styles.galleryImage}
              />
            </div>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | LE JARDIN DANS LE QUARTIER
        |--------------------------------------------------------------------------
        */}
        <section className={styles.lightSection}>

          <div className="container py-5">

            <div className="row g-4 align-items-center">

              <div className="col-md-6">

                <h2>
                  Le jardin dans le quartier
                </h2>

                <p>
                  Le Jardin Partagé La Source s’inscrit dans son environnement
                  urbain, au cœur du quartier Bernard de Jussieu à Versailles.
                  Il contribue à l’embellissement du cadre de vie et au
                  développement du lien social entre les habitants.
                </p>

              </div>

              <div className="col-md-6">

                <Image
                  src="/photo-jardin-4.jpg"
                  alt="Le jardin dans le quartier Bernard de Jussieu"
                  width={600}
                  height={400}
                  className={styles.galleryImage}
                />

              </div>

            </div>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | CARTE GOOGLE MAPS
        |--------------------------------------------------------------------------
        */}
        <section className="container py-5">

          <h2 className="text-center mb-4">
            Où nous trouver ?
          </h2>

          <p className={styles.introText}>
            Le jardin est situé dans le quartier Bernard de Jussieu
            à Versailles, à proximité de la rue Bernard de Jussieu.
          </p>

          <iframe
            className={styles.map}
            src="https://www.google.com/maps?q=rue%20Bernard%20de%20Jussieu%2078000%20Versailles&output=embed"
            loading="lazy"
          ></iframe>

        </section>

      </main>



      {/* FOOTER GLOBAL */}
      <Footer />
    </>

  );
}