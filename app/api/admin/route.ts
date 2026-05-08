// Import de NextResponse pour envoyer des réponses API
import { NextResponse } from "next/server";

// Import du modèle PreDemande
// pour accéder à la table pre_demandes
import PreDemande from "@/models/PreDemande";

import { sendAdminDecisionEmail } from "@/lib/mail";


// Méthode PATCH
// utilisée pour modifier une donnée existante
export async function PATCH(request: Request) {

  try {

    // Récupération du body envoyé par le frontend
    // exemple :
    // {
    //   "id_predemande": 10,
    //   "statut": "liste_attente"
    // }
    const body = await request.json();


    // Vérifie que l'identifiant et le statut existent
    if (!body.id_predemande || !body.statut) {

      // Retourne une erreur 400
      return NextResponse.json(
        {
          message: "Identifiant et statut obligatoires"
        },
        {
          status: 400
        }
      );
    }


    // Liste des statuts autorisés
    const statutsAutorises = [
      "liste_attente",
      "paiement_envoye",
      "refusee",
    ];


    // Vérifie que le statut envoyé existe dans la liste
    if (!statutsAutorises.includes(body.statut)) {

      // Sinon retourne erreur 400
      return NextResponse.json(
        {
          message: "Statut invalide"
        },
        {
          status: 400
        }
      );
    }


    // Recherche de la demande dans la base de données
    // grâce à son id
    const demande = await PreDemande.findByPk(
      body.id_predemande
    );


    // Si aucune demande trouvée
    if (!demande) {

      // Retourne erreur 404
      return NextResponse.json(
        {
          message: "Demande introuvable"
        },
        {
          status: 404
        }
      );
    }


    // Mise à jour du statut dans PostgreSQL
    await demande.update({

      // Nouveau statut envoyé par le frontend
      statut: body.statut,
    });
    await sendAdminDecisionEmail(demande, body.statut);


    // Retour succès
    return NextResponse.json({

      // Message succès
      message: "Statut mis à jour avec succès",

      // Retourne aussi les nouvelles données
      data: demande,
    });

  } catch (error) {

    // Affiche l'erreur dans le terminal
    console.error(error);


    // Retourne erreur serveur
    return NextResponse.json(
      {
        message: "Erreur serveur"
      },
      {
        status: 500
      }
    );
  }
}