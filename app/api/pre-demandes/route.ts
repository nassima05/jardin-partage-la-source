import { NextResponse } from "next/server";

import PreDemande from "@/models/PreDemande";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import {
  sendVerificationEmail,
  sendAdminNotificationEmail,
} from "@/lib/mail";



/*
|--------------------------------------------------------------------------
| NETTOYAGE TEXTE
|--------------------------------------------------------------------------
*/
function cleanText(value: string) {

  return value
    .trim()
    .replace(/[<>]/g, "");
}



/*
|--------------------------------------------------------------------------
| VALIDATION EMAIL
|--------------------------------------------------------------------------
*/
function isValidEmail(email: string) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/*
|--------------------------------------------------------------------------
| GET - LISTE DES PRÉ-DEMANDES PROTÉGÉE
|--------------------------------------------------------------------------
|
| Cette route permet de récupérer les pré-demandes.
|
| Elle est protégée par le cookie admin_token.
| Ce cookie est créé dans :
| app/api/admin/login/route.ts
|
*/
export async function GET() {

  try {

    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DU COOKIE ADMIN
    |--------------------------------------------------------------------------
    */
    const cookieStore = await cookies();

    const token =
      cookieStore.get("admin_token")?.value;



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION PRÉSENCE TOKEN
    |--------------------------------------------------------------------------
    */
    if (!token) {

      return NextResponse.json(
        {
          message: "Accès non autorisé.",
        },
        {
          status: 401,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION JWT_SECRET
    |--------------------------------------------------------------------------
    */
    if (!process.env.JWT_SECRET) {

      return NextResponse.json(
        {
          message: "Configuration JWT manquante.",
        },
        {
          status: 500,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION TOKEN JWT
    |--------------------------------------------------------------------------
    */
    jwt.verify(
      token,
      process.env.JWT_SECRET
    );



    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DES DEMANDES
    |--------------------------------------------------------------------------
    */
    const demandes =
      await PreDemande.findAll();

    return NextResponse.json(demandes);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Accès non autorisé.",
      },
      {
        status: 401,
      }
    );
  }
}



/*
|--------------------------------------------------------------------------
| POST - CRÉATION D'UNE PRÉ-DEMANDE
|--------------------------------------------------------------------------
*/
export async function POST(request: Request) {

  try {

    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DES DONNÉES
    |--------------------------------------------------------------------------
    */
    const body = await request.json();



    /*
    |--------------------------------------------------------------------------
    | NETTOYAGE DES CHAMPS
    |--------------------------------------------------------------------------
    */
    const nom = cleanText(body.nom || "");
    const prenom = cleanText(body.prenom || "");
    const email = cleanText(body.email || "").toLowerCase();
    const adresse = cleanText(body.adresse || "");
    const ville = cleanText(body.ville || "");
    const typeDemande = cleanText(body.type_demande || "");



    /*
    |--------------------------------------------------------------------------
    | CHAMPS OBLIGATOIRES
    |--------------------------------------------------------------------------
    */
    if (
      !nom ||
      !prenom ||
      !email ||
      !adresse ||
      !ville ||
      !typeDemande
    ) {

      return NextResponse.json(
        {
          message: "Tous les champs sont obligatoires",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | EMAIL VALIDE
    |--------------------------------------------------------------------------
    */
    if (!isValidEmail(email)) {

      return NextResponse.json(
        {
          message: "Adresse email invalide",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | LIMITATION LONGUEUR DES CHAMPS
    |--------------------------------------------------------------------------
    */
    if (
      nom.length > 80 ||
      prenom.length > 80 ||
      email.length > 120 ||
      adresse.length > 200 ||
      ville.length > 100
    ) {

      return NextResponse.json(
        {
          message: "Certains champs sont trop longs",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | TYPE DE DEMANDE AUTORISÉ
    |--------------------------------------------------------------------------
    */
    const typesDemandesAutorises = [
      "adhesion_simple",
      "demande_parcelle",
    ];

    if (!typesDemandesAutorises.includes(typeDemande)) {

      return NextResponse.json(
        {
          message: "Type de demande invalide",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | CONDITION PARCELLE : VILLE DE VERSAILLES
    |--------------------------------------------------------------------------
    */
    if (
      typeDemande === "demande_parcelle" &&
      ville.toLowerCase() !== "versailles"
    ) {

      return NextResponse.json(
        {
          message:
            "Seuls les habitants de Versailles peuvent demander une parcelle",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION DOUBLON EMAIL
    |--------------------------------------------------------------------------
    */
    const existingDemande = await PreDemande.findOne({
      where: {
        email: email,
      },
    });

    if (existingDemande) {

      return NextResponse.json(
        {
          message: "Une pré-demande existe déjà pour cet email",
        },
        {
          status: 409,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | STATUT INITIAL
    |--------------------------------------------------------------------------
    */
    const statutInitial =
      typeDemande === "adhesion_simple"
        ? "en_attente_paiement"
        : "en_attente_validation";



    /*
    |--------------------------------------------------------------------------
    | TOKEN EMAIL
    |--------------------------------------------------------------------------
    */
    const token = crypto.randomUUID();



    /*
    |--------------------------------------------------------------------------
    | EXPIRATION TOKEN
    |--------------------------------------------------------------------------
    */
    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );



    /*
    |--------------------------------------------------------------------------
    | CRÉATION EN BASE DE DONNÉES
    |--------------------------------------------------------------------------
    */
    const nouvelleDemande = await PreDemande.create({
      nom: nom,
      prenom: prenom,
      email: email,
      adresse: adresse,
      ville: ville,
      type_demande: typeDemande,
      statut: statutInitial,
      email_token: token,
      email_token_expires_at: expiresAt,
    });



    /*
    |--------------------------------------------------------------------------
    | ENVOI EMAILS
    |--------------------------------------------------------------------------
    */
    await sendVerificationEmail(email, token);

    await sendAdminNotificationEmail(nouvelleDemande);



    /*
    |--------------------------------------------------------------------------
    | SUCCÈS
    |--------------------------------------------------------------------------
    */
    return NextResponse.json(
      {
        message: "Pré-demande créée avec succès",
        data: nouvelleDemande,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la création de la pré-demande",
      },
      {
        status: 500,
      }
    );
  }
}