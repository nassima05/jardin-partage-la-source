import { NextResponse } from "next/server";

import argon2 from "argon2";

import Adherent from "@/models/Adherent";



/*
|--------------------------------------------------------------------------
| ROUTE POST - CRÉATION DE L'ESPACE ADHÉRENT
|--------------------------------------------------------------------------
|
| Cette route est appelée quand l'adhérent clique sur le lien reçu par email
| puis remplit le formulaire :
|
| - pseudo
| - mot de passe
| - confirmation du mot de passe
|
| Elle permet de finaliser la création du compte adhérent.
|
*/
export async function POST(request: Request) {

  try {

    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DES DONNÉES ENVOYÉES PAR LE FORMULAIRE
    |--------------------------------------------------------------------------
    |
    | Exemple attendu :
    |
    | {
    |   token: "...",
    |   pseudo: "Potager78",
    |   password: "motdepasse",
    |   confirmPassword: "motdepasse"
    | }
    |
    */
    const body = await request.json();



    /*
    |--------------------------------------------------------------------------
    | NETTOYAGE SIMPLE DES CHAMPS
    |--------------------------------------------------------------------------
    */
    const token =
      String(body.token || "").trim();

    const pseudo =
      String(body.pseudo || "").trim();

    const password =
      String(body.password || "").trim();

    const confirmPassword =
      String(body.confirmPassword || "").trim();



    /*
    |--------------------------------------------------------------------------
    | CHAMPS OBLIGATOIRES
    |--------------------------------------------------------------------------
    */
    if (
      !token ||
      !pseudo ||
      !password ||
      !confirmPassword
    ) {

      return NextResponse.json(
        {
          message: "Tous les champs sont obligatoires.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VALIDATION DU PSEUDO
    |--------------------------------------------------------------------------
    |
    | Le pseudo doit rester simple :
    | - minimum 3 caractères
    | - maximum 20 caractères
    |
    */
    if (
      pseudo.length < 3 ||
      pseudo.length > 20
    ) {

      return NextResponse.json(
        {
          message: "Le pseudo doit contenir entre 3 et 30 caractères.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VALIDATION DU MOT DE PASSE
    |--------------------------------------------------------------------------
    |
    | On impose au minimum 12 caractères.
    |
    */
    if (password.length < 12) {

      return NextResponse.json(
        {
          message: "Le mot de passe doit contenir au moins 12 caractères.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | CONFIRMATION DU MOT DE PASSE
    |--------------------------------------------------------------------------
    */
    if (password !== confirmPassword) {

      return NextResponse.json(
        {
          message: "Les mots de passe ne correspondent pas.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | RECHERCHE DE L'ADHÉRENT PAR TOKEN
    |--------------------------------------------------------------------------
    |
    | Le token a été généré après le paiement confirmé.
    |
    */
    const adherent =
      await Adherent.findOne({
        where: {
          set_password_token: token,
        },
      });



    /*
    |--------------------------------------------------------------------------
    | TOKEN INVALIDE
    |--------------------------------------------------------------------------
    */
    if (!adherent) {

      return NextResponse.json(
        {
          message: "Lien invalide ou introuvable.",
        },
        {
          status: 404,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | TOKEN DÉJÀ UTILISÉ
    |--------------------------------------------------------------------------
    |
    | Si set_password_used_at contient déjà une date,
    | cela veut dire que le compte a déjà été créé.
    |
    */
    if ((adherent as any).set_password_used_at) {

      return NextResponse.json(
        {
          message: "Ce lien a déjà été utilisé.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | TOKEN EXPIRÉ
    |--------------------------------------------------------------------------
    |
    | Le lien est valable 24 heures.
    |
    */
    const expirationDate =
      (adherent as any).set_password_expires_at;

    if (
      !expirationDate ||
      new Date(expirationDate) < new Date()
    ) {

      return NextResponse.json(
        {
          message: "Ce lien a expiré.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION PSEUDO DÉJÀ UTILISÉ
    |--------------------------------------------------------------------------
    */
    const existingPseudo =
      await Adherent.findOne({
        where: {
          pseudo: pseudo,
        },
      });

    if (existingPseudo) {

      return NextResponse.json(
        {
          message: "Ce pseudo est déjà utilisé.",
        },
        {
          status: 409,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | HACHAGE DU MOT DE PASSE
    |--------------------------------------------------------------------------
    |
    | On ne stocke jamais le mot de passe en clair.
    |
    | Argon2 transforme le mot de passe en hash sécurisé.
    |
    */
    const passwordHash =
      await argon2.hash(password);



    /*
    |--------------------------------------------------------------------------
    | MISE À JOUR DU COMPTE ADHÉRENT
    |--------------------------------------------------------------------------
    |
    | On enregistre :
    | - le pseudo
    | - le mot de passe hashé
    |
    | Puis on marque le lien comme utilisé
    | et on supprime le token.
    |
    */
    await adherent.update({
      pseudo: pseudo,
      password_hash: passwordHash,
      set_password_used_at: new Date(),
      set_password_token: null,
      set_password_expires_at: null,
    });



    /*
    |--------------------------------------------------------------------------
    | RÉPONSE SUCCÈS
    |--------------------------------------------------------------------------
    */
    return NextResponse.json({
      message: "Votre espace adhérent a été créé avec succès.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la création de l'espace adhérent.",
      },
      {
        status: 500,
      }
    );
  }
}