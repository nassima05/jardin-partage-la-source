import { NextResponse } from "next/server";

import PreDemande from "@/models/PreDemande";
import Adherent from "@/models/Adherent";

import {
  sendCreateAdherentAccountEmail,
} from "@/lib/mail";



/*
|--------------------------------------------------------------------------
| ROUTE PATCH - CONFIRMATION DU PAIEMENT
|--------------------------------------------------------------------------
|
| Cette route est appelée après le retour de Stripe,
| depuis la page :
|
| /paiement-success?id=...
|
| Elle sert à :
|
| 1. retrouver la pré-demande
| 2. confirmer le paiement
| 3. enregistrer les dates d'adhésion
| 4. créer automatiquement l'adhérent
| 5. envoyer l'email de création d'espace adhérent
|
*/
export async function PATCH(request: Request) {

  try {

    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DU BODY
    |--------------------------------------------------------------------------
    |
    | Exemple reçu :
    |
    | {
    |   id_predemande: 37
    | }
    |
    */
    const body = await request.json();



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION DE L'IDENTIFIANT
    |--------------------------------------------------------------------------
    */
    if (!body.id_predemande) {

      return NextResponse.json(
        {
          message: "Identifiant obligatoire",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | RECHERCHE DE LA PRÉ-DEMANDE
    |--------------------------------------------------------------------------
    */
    const demande = await PreDemande.findByPk(
      body.id_predemande
    );



    /*
    |--------------------------------------------------------------------------
    | SI LA DEMANDE N'EXISTE PAS
    |--------------------------------------------------------------------------
    */
    if (!demande) {

      return NextResponse.json(
        {
          message: "Demande introuvable",
        },
        {
          status: 404,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | CALCUL DES DATES D'ADHÉSION
    |--------------------------------------------------------------------------
    |
    | dateAdhesion :
    | date du paiement confirmé
    |
    | dateExpiration :
    | date du paiement + 1 an
    |
    */
    const dateAdhesion = new Date();

    const dateExpiration = new Date();

    dateExpiration.setFullYear(
      dateExpiration.getFullYear() + 1
    );



    /*
    |--------------------------------------------------------------------------
    | MISE À JOUR DE LA PRÉ-DEMANDE
    |--------------------------------------------------------------------------
    |
    | Une fois le paiement confirmé :
    |
    | - le statut devient adhesion_finalisee
    | - on enregistre la date d'entrée dans l'association
    | - on enregistre la date de renouvellement
    |
    */
    await demande.update({
      statut: "adhesion_finalisee",
      date_adhesion: dateAdhesion,
      date_expiration: dateExpiration,
    });



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION SI L'ADHÉRENT EXISTE DÉJÀ
    |--------------------------------------------------------------------------
    |
    | Sécurité importante :
    |
    | Si l'utilisateur recharge la page paiement-success,
    | on ne veut pas créer deux comptes adhérents.
    |
    */
    const existingAdherent =
      await Adherent.findOne({
        where: {
          email: (demande as any).email,
        },
      });



    /*
    |--------------------------------------------------------------------------
    | CRÉATION AUTOMATIQUE DE L'ADHÉRENT
    |--------------------------------------------------------------------------
    |
    | Si aucun adhérent n'existe encore avec cet email,
    | on crée une ligne dans la table adherents.
    |
    | À ce stade :
    |
    | - le pseudo est encore vide
    | - le mot de passe est encore vide
    |
    | Ils seront définis par l'adhérent depuis le lien reçu par email.
    |
    */
    if (!existingAdherent) {

      /*
      |--------------------------------------------------------------------------
      | TOKEN DE CRÉATION D'ESPACE ADHÉRENT
      |--------------------------------------------------------------------------
      |
      | Ce token sera envoyé par email.
      |
      | Il permettra à l'adhérent d'accéder à une page sécurisée
      | pour choisir :
      |
      | - son pseudo
      | - son mot de passe
      |
      */
      const setPasswordToken = crypto.randomUUID();



      /*
      |--------------------------------------------------------------------------
      | EXPIRATION DU TOKEN
      |--------------------------------------------------------------------------
      |
      | Le lien est valable 24 heures.
      |
      */
      const setPasswordExpiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );



      /*
      |--------------------------------------------------------------------------
      | CRÉATION EN BASE
      |--------------------------------------------------------------------------
      */
      await Adherent.create({
        id_predemande: (demande as any).id_predemande,
        nom: (demande as any).nom,
        prenom: (demande as any).prenom,
        email: (demande as any).email,
        role: "adherent",
        statut: "actif",
        set_password_token: setPasswordToken,
        set_password_expires_at: setPasswordExpiresAt,
      });



      /*
      |--------------------------------------------------------------------------
      | EMAIL DE CRÉATION D'ESPACE ADHÉRENT
      |--------------------------------------------------------------------------
      |
      | L'adhérent reçoit un lien :
      |
      | /creer-espace-adherent?token=...
      |
      */
      await sendCreateAdherentAccountEmail(
        (demande as any).email,
        (demande as any).prenom,
        setPasswordToken
      );
    }



    /*
    |--------------------------------------------------------------------------
    | RÉPONSE API
    |--------------------------------------------------------------------------
    */
    return NextResponse.json({
      message: "Paiement confirmé",
      data: demande,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}