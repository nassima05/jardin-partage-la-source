/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| Image : composant Next.js pour afficher des images optimisées
| Navbar : barre de navigation commune à toutes les pages
| Footer : pied de page commun à toutes les pages
| styles : fichier CSS spécifique à cette page
|
*/
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CurrentDateTime from "../../components/CurrentDateTime";
import styles from "./page.module.css";
import Link from "next/link";



/*
|--------------------------------------------------------------------------
| PAGE INFORMATIONS PRATIQUES
|--------------------------------------------------------------------------
*/
export default function InformationsPratiquesPage() {

  return (

    <>

      {/* Navbar globale du site */}
      <Navbar />



      {/* Contenu principal de la page */}
      <main className={styles.main}>



        {/*
        |--------------------------------------------------------------------------
        | HERO
        |--------------------------------------------------------------------------
        |
        | Première partie de la page :
        | titre + texte + photo d'une parcelle
        |
        */}
        <section className={styles.hero}>

          <div className="container">

            <div className="row g-4 align-items-center">

              {/* Colonne texte */}
              <div className="col-md-6">

                <h1 className={styles.title}>
                  Informations pratiques
                </h1>

                <p className={styles.subtitle}>
                  Retrouvez les principales informations pour participer
                  à la vie du jardin, devenir adhérent ou demander une parcelle.
                </p>

              </div>



              {/* Colonne image */}
              <div className="col-md-6">

                <Image
                  src="/photo-jardin-6.jpg"
                  alt="Parcelle du Jardin Partagé La Source"
                  width={600}
                  height={400}
                  className={styles.heroImage}
                />

              </div>

            </div>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | PARTICIPER AU JARDIN
        |--------------------------------------------------------------------------
        */}
        <section className="container py-5">

          <h2 className={styles.sectionTitle}>
            Participer au jardin
          </h2>

          <p className={styles.text}>
            Le Jardin Partagé La Source accueille les personnes intéressées
            par le jardinage, l’écologie, la biodiversité,
            le partage de savoirs et la vie collective du quartier.
          </p>

          <p className={styles.text}>
            Toute personne passionnée ou simplement curieuse peut participer
            à la vie de l’association, échanger avec les adhérents
            et prendre part aux activités proposées dans un esprit
            de bienveillance.
          </p>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | ADHÉSION ET PARCELLES
        |--------------------------------------------------------------------------
        |
        | Trois cartes simples pour expliquer les possibilités
        |
        */}
        <section className={styles.lightSection}>

          <div className="container py-5">

            <h2 className={styles.sectionTitle}>
              Adhésion et parcelles
            </h2>

            <div className="row g-4">

              <div className="col-md-4">

                <div className={styles.card}>

                  <h3>
                    Adhésion simple
                  </h3>

                  <p>
                    L’adhésion permet de soutenir l’association,
                    de participer aux événements, aux échanges de savoirs
                    et aux projets collectifs.
                  </p>

                </div>

              </div>



              <div className="col-md-4">

                <div className={styles.card}>

                  <h3>
                    Demande de parcelle
                  </h3>

                  <p>
                    Les personnes souhaitant obtenir une parcelle
                    doivent résider à Versailles.
                    La demande de parcelle implique automatiquement
                    l’adhésion à l’association.
                  </p>

                </div>

              </div>



              <div className="col-md-4">

                <div className={styles.card}>

                  <h3>
                    Surfaces disponibles
                  </h3>

                  <p>
                    Les parcelles sont attribuées selon les disponibilités.
                    Elles peuvent varier selon les espaces,
                    avec des surfaces d’environ 9 m² à 50 m².
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | FONCTIONNEMENT DU JARDIN
        |--------------------------------------------------------------------------
        |
        | Cartes simples 
        |
        */}
        <section className="container py-5">

  <div className="row g-4 align-items-center">

    <div className="col-md-7">

      <h2 className={styles.sectionTitle}>
        Fonctionnement du jardin
      </h2>

      <div className={styles.infoList}>

        <div className={styles.infoItem}>
          Les parcelles peuvent être individuelles et/ou collectives,
          selon l’organisation du jardin et les disponibilités.
        </div>

        <div className={styles.infoItem}>
          Les récoltes sont partagées ou données gratuitement.
          Les ventes sont interdites.
        </div>

        <div className={styles.infoItem}>
          Chaque jardinier participe au respect du lieu,
          des autres adhérents et de l’environnement.
        </div>

        <div className={styles.infoItem}>
          Les activités du jardin reposent sur la convivialité,
          la participation, l’entraide et le respect mutuel.
        </div>

      </div>

    </div>

    <div className="col-md-5">

      <Image
        src="/photo-panier-potager-17.jpg"
        alt="Panier de légumes récoltés au jardin"
        width={500}
        height={380}
        className={styles.functionImage}
      />

    </div>

  </div>

</section>

        {/*
|--------------------------------------------------------------------------
| CALENDRIER DES CULTURES
|--------------------------------------------------------------------------
|
| Tableau des cultures selon les mois
| avec photos des récoltes
|
*/}
<section className={styles.lightSection}>

  <div className="container py-5">

    <h2 className={styles.sectionTitle}>
      Calendrier des cultures
    </h2>



    {/* Heure actuelle */}
    <CurrentDateTime />



    {/* Texte présentation */}
    <p className={styles.text}>
      Les adhérents ont déjà cultivé plusieurs fruits,
      légumes et plantes aromatiques en respectant
      le rythme des saisons, l’écosystème du jardin
      et l’entretien naturel du sol.

      Ce calendrier est proposé à titre indicatif
      et pourra être enrichi au fil des réussites,
      des nouvelles cultures et des récoltes partagées
      au sein du jardin.
    </p>



    {/* Tableau calendrier */}
    <div className={styles.calendarBox}>

      {[
        [
          "Janvier",
          "Ail, entretien du sol, préparation des semis",
          ""
        ],

        [
          "Février",
          "Fèves, salades, oignons",
          ""
        ],

        [
          "Mars",
          "Pommes de terre, fraises, salades, blettes, carottes, betteraves",
          "/photo-pommes-de-terre-15.jpg"
        ],

        [
          "Avril",
          "Tomates, concombres, maïs, artichauts, courgettes",
          "/photo-courgettes-13.jpg"
        ],

        [
          "Mai",
          "Haricots verts, tomates, fraises, cerises, pastèques",
          "/photo-cerises-16.jpg"
        ],

        [
          "Juin",
          "Tomates, concombres, fèves, framboises, courgettes",
          "/photo-tomates-12.jpg"
        ],

        [
          "Juillet",
          "Pommes de terre, tomates, concombres, haricots verts, carottes",
          "/photo-haricots-verts-10.jpg"
        ],

        [
          "Août",
          "Tomates, maïs, pastèques, framboises, raisins",
          "/photo-raisins-11.jpg"
        ],

        [
          "Septembre",
          "Citrouilles, oignons, blettes, betteraves, dernières tomates",
          "/photo-citrouille-9.jpg"
        ],

        [
          "Octobre",
          "Ail, citrouilles, préparation du sol",
          ""
        ],

        [
          "Novembre",
          "Entretien, protection des cultures, nettoyage",
          ""
        ],

        [
          "Décembre",
          "Repos du jardin, préparation des futurs projets",
          ""
        ],

      ].map(([month, cultures, image]) => (

        <div
          className={styles.monthCard}
          key={month}
        >

          {/* Image récolte */}
          {image && (

            <Image
              src={image}
              alt={month}
              width={400}
              height={180}
              className={styles.monthImage}
            />

          )}



          {/* Mois */}
          <h3>
            {month}
          </h3>



          {/* Cultures */}
          <p>
            {cultures}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>


        {/*
        |--------------------------------------------------------------------------
        | BON À SAVOIR
        |--------------------------------------------------------------------------
        |
        | Encadré dédié aux besoins financiers de l'association
        |
        */}
        <section className={styles.lightSection}>

          <div className="container py-5">

            <h2 className={styles.sectionTitle}>
              Bon à savoir
            </h2>

            <div className={styles.supportBox}>

              <p>
                Le Jardin Partagé La Source fonctionne grâce à l’implication
                de ses adhérents, bénévoles et soutiens.
                Aujourd’hui, l’association rencontre des difficultés financières
                qui ralentissent certains projets essentiels à la vie du jardin.
              </p>

              <p>
                Les dons permettent notamment de contribuer à :
              </p>

              <ul>
                <li>
                  la réparation de la clôture du jardin ;
                </li>

                <li>
                  l’achat de récupérateurs d’eau de pluie ;
                </li>

                <li>
                  l’achat d’un cabanon pour ranger les outils ;
                </li>

                <li>
                  l’acquisition de matériel de jardinage ;
                </li>

                <li>
                  l’aménagement d’un espace d’accueil pour les familles
                  et les visiteurs ;
                </li>

                <li>
                  l’organisation des événements du jardin.
                </li>
              </ul>

              <p>
                Chaque soutien, même modeste, participe concrètement
                à la vie du jardin et au développement de ce lieu
                de partage et de convivialité.
              </p>

            </div>

          </div>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | ESPACE D'ÉCHANGES
        |--------------------------------------------------------------------------
        |
        | Présente les futures fonctionnalités communautaires
        |
        */}
        <section className="container py-5">

          <h2 className={styles.sectionTitle}>
            Échanger entre adhérents
          </h2>

          <p className={styles.text}>
            Le site a vocation à devenir un espace d’échanges
            entre les adhérents, les jardiniers et les passionnés
            de jardinage.
          </p>

          <p className={styles.text}>
            Les membres pourront partager des conseils,
            des astuces pratiques, des événements, des messages,
            ainsi que des photos ou vidéos liées à la vie du jardin.
          </p>

          <p className={styles.text}>
            Ces échanges devront se faire dans un esprit de bienveillance,
            de respect et de partage.
          </p>

        </section>



        {/*
        |--------------------------------------------------------------------------
        | CONTACT
        |--------------------------------------------------------------------------
        */}
        <section className={styles.lightSection}>

          <div className="container py-5">

            <h2 className={styles.sectionTitle}>
              Besoin d’une information ?
            </h2>

            <p className={styles.text}>
              Pour toute question concernant l’adhésion,
              les parcelles ou la participation aux activités,
              vous pouvez contacter l’association via la page {""}

              <Link href="/contact" className={styles.contactLink}>
              contact
              </Link>

              .
            </p>

          </div>

        </section>

      </main>



      {/* Footer global du site */}
      <Footer />

    </>

  );
}