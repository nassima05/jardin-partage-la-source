/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

// Import NextResponse
// Permet de retourner une réponse API Next.js
import { NextResponse } from "next/server";

// Import Stripe
// Permet de créer une session de paiement Stripe Checkouts
import Stripe from "stripe";



/*
|--------------------------------------------------------------------------
| VÉRIFICATION CLÉ STRIPE
|--------------------------------------------------------------------------
|
| STRIPE_SECRET_KEY doit être présente dans le fichier .env
|
| Exemple :
| STRIPE_SECRET_KEY=sk_test_...
|
| Si la clé est absente, l'application affiche une erreur claire.
|
*/
if (!process.env.STRIPE_SECRET_KEY) {

  throw new Error(
    "STRIPE_SECRET_KEY est manquante dans le fichier .env"
  );
}



/*
|--------------------------------------------------------------------------
| INSTANCE STRIPE
|--------------------------------------------------------------------------
|
| Connexion à Stripe avec la clé secrète.
|
| IMPORTANT :
| Cette clé ne doit jamais être envoyée côté client.
| Elle reste uniquement côté serveur/API.
|
*/
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);



/*
|--------------------------------------------------------------------------
| ROUTE POST
|--------------------------------------------------------------------------
|
| Cette route :
|
| - reçoit le montant du don
| - vérifie que le montant est valide
| - crée une session Stripe Checkout
| - retourne l'URL Stripe au front
|
*/
export async function POST(request: Request) {

  try {



    /*
    |--------------------------------------------------------------------------
    | URL DU SITE
    |--------------------------------------------------------------------------
    |
    | NEXT_PUBLIC_SITE_URL permet d'éviter d'écrire localhost en dur.
    |
    | En local :
    | NEXT_PUBLIC_SITE_URL=http://localhost:3000
    |
    | En production :
    | NEXT_PUBLIC_SITE_URL=https://ton-site.fr
    |
    | Si la variable n'existe pas, on garde localhost par défaut.
    |
    */
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";



    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION BODY
    |--------------------------------------------------------------------------
    |
    | Le front envoie par exemple :
    |
    | {
    |   montant: 20
    | }
    |
    */
    const body = await request.json();



    /*
    |--------------------------------------------------------------------------
    | CONVERSION MONTANT
    |--------------------------------------------------------------------------
    |
    | On convertit la valeur reçue en nombre.
    |
    */
    const montant =
      Number(body.montant);



    /*
    |--------------------------------------------------------------------------
    | VÉRIFICATION MONTANT
    |--------------------------------------------------------------------------
    |
    | On refuse :
    | - valeur vide
    | - valeur non numérique
    | - montant inférieur à 1 €
    |
    */
    if (!montant || montant < 1) {

      return NextResponse.json(
        {
          message:
            "Le montant minimum est de 1 €."
        },
        {
          status: 400
        }
      );
    }



    /*
    |--------------------------------------------------------------------------
    | CRÉATION SESSION STRIPE
    |--------------------------------------------------------------------------
    |
    | Stripe Checkout crée une page de paiement sécurisée.
    |
    */
    const session =
      await stripe.checkout.sessions.create({



        /*
        |--------------------------------------------------------------------------
        | MOYEN DE PAIEMENT
        |--------------------------------------------------------------------------
        */
        payment_method_types: ["card"],



        /*
        |--------------------------------------------------------------------------
        | TYPE DE PAIEMENT
        |--------------------------------------------------------------------------
        |
        | payment = paiement unique
        |
        */
        mode: "payment",



        /*
        |--------------------------------------------------------------------------
        | PRODUIT / DON
        |--------------------------------------------------------------------------
        */
        line_items: [

          {

            price_data: {

              /*
              |--------------------------------------------------------------------------
              | MONNAIE
              |--------------------------------------------------------------------------
              */
              currency: "eur",



              /*
              |--------------------------------------------------------------------------
              | NOM AFFICHÉ DANS STRIPE
              |--------------------------------------------------------------------------
              */
              product_data: {

                name:
                  "Don - Jardin Partagé La Source",
              },



              /*
              |--------------------------------------------------------------------------
              | MONTANT EN CENTIMES
              |--------------------------------------------------------------------------
              |
              | Stripe attend les montants en centimes.
              |
              | Exemple :
              | 10 € devient 1000
              |
              */
              unit_amount:
                Math.round(montant * 100),
            },



            /*
            |--------------------------------------------------------------------------
            | QUANTITÉ
            |--------------------------------------------------------------------------
            */
            quantity: 1,
          },
        ],



        /*
        |--------------------------------------------------------------------------
        | URL SUCCÈS
        |--------------------------------------------------------------------------
        |
        | Après paiement réussi, l'utilisateur revient ici.
        |
        */
        success_url:
          `${siteUrl}/paiement-success`,



        /*
        |--------------------------------------------------------------------------
        | URL ANNULATION
        |--------------------------------------------------------------------------
        |
        | Si l'utilisateur annule le paiement,
        | il revient sur la page don.
        |
        */
        cancel_url:
          `${siteUrl}/don`,
      });



    /*
    |--------------------------------------------------------------------------
    | RETOUR URL STRIPE
    |--------------------------------------------------------------------------
    |
    | Le front récupère cette URL
    | puis redirige l'utilisateur vers Stripe.
    |
    */
    return NextResponse.json({

      url: session.url,
    });

  } catch (error) {



    /*
    |--------------------------------------------------------------------------
    | DEBUG TERMINAL
    |--------------------------------------------------------------------------
    */
    console.error(error);



    /*
    |--------------------------------------------------------------------------
    | ERREUR SERVEUR
    |--------------------------------------------------------------------------
    */
    return NextResponse.json(
      {
        message:
          "Erreur lors de la création du don."
      },
      {
        status: 500
      }
    );
  }
}