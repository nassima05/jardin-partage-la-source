/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



/*
|--------------------------------------------------------------------------
| NETTOYAGE TEXTE
|--------------------------------------------------------------------------
|
| Cette fonction nettoie les champs envoyés par l'utilisateur.
|
| trim()
| enlève les espaces inutiles au début et à la fin.
|
| replace(/[<>]/g, "")
| retire les caractères < et > pour limiter les scripts HTML.
|
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
|
| Cette fonction vérifie que l'adresse email ressemble bien
| à une adresse email classique.
|
*/
function isValidEmail(email: string) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



/*
|--------------------------------------------------------------------------
| ROUTE POST
|--------------------------------------------------------------------------
|
| Cette route reçoit les données du formulaire contact.
|
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
    |
    | body.nom || ""
    | évite une erreur si le champ est absent.
    |
    */
    const nom = cleanText(body.nom || "");
    const prenom = cleanText(body.prenom || "");
    const email = cleanText(body.email || "").toLowerCase();
    const objet = cleanText(body.objet || "");
    const message = cleanText(body.message || "");



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION CHAMPS OBLIGATOIRES
    |--------------------------------------------------------------------------
    */
    if (
      !nom ||
      !prenom ||
      !email ||
      !objet ||
      !message
    ) {

      return NextResponse.json(
        {
          message:
            "Tous les champs sont obligatoires.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION EMAIL
    |--------------------------------------------------------------------------
    */
    if (!isValidEmail(email)) {

      return NextResponse.json(
        {
          message:
            "L'adresse email n'est pas valide.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | LIMITATION LONGUEUR
    |--------------------------------------------------------------------------
    */
    if (
      nom.length > 80 ||
      prenom.length > 80 ||
      email.length > 120 ||
      objet.length > 80 ||
      message.length > 1000
    ) {

      return NextResponse.json(
        {
          message:
            "Certains champs sont trop longs.",
        },
        {
          status: 400,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION CONFIGURATION EMAIL
    |--------------------------------------------------------------------------
    */
    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASSWORD
    ) {

      return NextResponse.json(
        {
          message:
            "Configuration email manquante.",
        },
        {
          status: 500,
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | CONFIGURATION NODEMAILER
    |--------------------------------------------------------------------------
    */
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });



    /*
    |--------------------------------------------------------------------------
    | ENVOI EMAIL
    |--------------------------------------------------------------------------
    */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,

      subject:
        `Nouveau message contact - ${objet}`,

      text: `
Nom : ${nom}
Prénom : ${prenom}
Email : ${email}
Objet : ${objet}

Message :
${message}
      `,
    });



    /*
    |--------------------------------------------------------------------------
    | SUCCÈS
    |--------------------------------------------------------------------------
    */
    return NextResponse.json({

      message:
        "Message envoyé avec succès.",
    });

  } catch (error) {

    /*
    |--------------------------------------------------------------------------
    | ERREUR SERVEUR
    |--------------------------------------------------------------------------
    */
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Erreur serveur.",
      },
      {
        status: 500,
      }
    );
  }
}