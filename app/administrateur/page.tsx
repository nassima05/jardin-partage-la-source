"use client";

// Import des hooks React
// useState = stocker les données
// useEffect = exécuter du code au chargement
import { useEffect, useState } from "react";

// Import du fichier CSS module
import styles from "./page.module.css";


// Composant principal de la page administrateur
export default function AdministrateurPage() {

  // Tableau contenant toutes les demandes
  const [demandes, setDemandes] = useState<any[]>([]);


  // Fonction qui récupère les demandes
  // depuis l'API /api/pre-demandes
  async function getDemandes() {

    // Requête GET vers l'API
    const response = await fetch("/api/pre-demandes");

    // Transformation JSON
    const data = await response.json();

    // Mise à jour du state React
    setDemandes(data);
  }


  // Fonction qui modifie le statut
  // d'une demande
  async function updateStatut(
    id_predemande: number,
    statut: string
  ) {

    // Requête PATCH vers l'API admin
    await fetch("/api/admin", {

      // Méthode HTTP PATCH
      method: "PATCH",

      // Headers JSON
      headers: {
        "Content-Type": "application/json",
      },

      // Données envoyées
      body: JSON.stringify({

        // id de la demande
        id_predemande: id_predemande,

        // nouveau statut
        statut: statut,
      }),
    });

    // Recharge les demandes après modification
    getDemandes();
  }


  // useEffect exécuté une seule fois
  // au chargement de la page
  useEffect(() => {

    // Charge les demandes
    getDemandes();

  }, []);


  // Affichage de la page
  return (

    // Balise principale
    <main className={styles.container}>

      {/* Titre */}
      <h1 className={styles.title}>
        Espace administrateur
      </h1>


      {/* Boucle sur toutes les demandes */}
      {demandes.map((demande) => (

        // Carte d'une demande
        <div
          key={demande.id_predemande}
          className={styles.card}
        >

          {/* Informations demande */}
          <p>
            <strong>Nom :</strong> {demande.nom}
          </p>

          <p>
            <strong>Prénom :</strong> {demande.prenom}
          </p>

          <p>
            <strong>Email :</strong> {demande.email}
          </p>

          <p>
            <strong>Ville :</strong> {demande.ville}
          </p>

          <p>
            <strong>Type :</strong>
            {" "}
            {demande.type_demande}
          </p>

          <p>
            <strong>Statut :</strong>
            {" "}
            {demande.statut}
          </p>

          <p>
            <strong>Email vérifié :</strong>
            {" "}
            {demande.email_verified_at
              ? "Oui"
              : "Non"}
          </p>


          {/* ========================= */}
          {/* CONDITIONS D'AFFICHAGE */}
          {/* ========================= */}


          {/* CAS 1 */}
          {/* L'utilisateur n'a PAS confirmé son email */}
          {!demande.email_verified_at ? (

            // On bloque les actions admin
            <p>
              En attente de confirmation email
            </p>


          ) :


          /* CAS 2 */
          /* Paiement déjà effectué */
          demande.statut ===
          "adhesion_finalisee" ? (

            // Plus aucune action possible
            <p>
              Adhésion finalisée
            </p>


          ) :


          /* CAS 3 */
          /* Adhésion simple */
          demande.type_demande ===
          "adhesion_simple" ? (

            // Pas de validation admin nécessaire
            <p>
              Aucune action requise
            </p>


          ) : (


            /* CAS 4 */
            /* Demande de parcelle validée */
            /* => affichage des boutons admin */

            <div className={styles.actions}>

              {/* Bouton parcelle disponible */}
              <button
                className={styles.button}

                onClick={() =>

                  // Change le statut
                  updateStatut(
                    demande.id_predemande,

                    // Nouveau statut
                    "paiement_envoye"
                  )
                }
              >
                Parcelle disponible
              </button>


              {/* Bouton liste d'attente */}
              <button
                className={styles.button}

                onClick={() =>

                  updateStatut(
                    demande.id_predemande,

                    "liste_attente"
                  )
                }
              >
                Liste d'attente
              </button>


              {/* Bouton refus */}
              <button
                className={styles.button}

                onClick={() =>

                  updateStatut(
                    demande.id_predemande,

                    "refusee"
                  )
                }
              >
                Refuser
              </button>

            </div>
          )}

        </div>
      ))}

    </main>
  );
}