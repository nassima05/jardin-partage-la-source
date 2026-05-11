// Import de NextResponse
// Permet de retourner des réponses API Next.js
import { NextResponse } from "next/server";


// Import de Stripe
// Librairie officielle Stripe
import Stripe from "stripe";


// Création d'une instance Stripe
// avec la clé secrète stockée dans .env
const stripe = new Stripe(

  // process.env permet de lire les variables .env
  process.env.STRIPE_SECRET_KEY as string
);


/*
|--------------------------------------------------------------------------
| ROUTE API POST
|--------------------------------------------------------------------------
|
| Cette route sera appelée quand
| l'utilisateur cliquera sur :
|
| "Confirmer le paiement"
|
| Le frontend enverra :
|
| {
|   id_predemande: 18
| }
|
| Ensuite Stripe créera :
|
| - une session Checkout
| - une page de paiement sécurisée
| - une URL Stripe
|
*/
export async function POST(request: Request) {

  try {

    /*
    |--------------------------------------------------------------------------
    | RÉCUPÉRATION DES DONNÉES ENVOYÉES
    |--------------------------------------------------------------------------
    |
    | request.json() récupère le body JSON
    |
    | Exemple :
    |
    | {
    |   id_predemande: 18
    | }
    |
    */
    const body = await request.json();



    /*
    |--------------------------------------------------------------------------
    | CRÉATION SESSION STRIPE CHECKOUT
    |--------------------------------------------------------------------------
    |
    | Stripe génère une vraie session de paiement.
    |
    | Cela retourne :
    |
    | - un identifiant session
    | - une URL Stripe Checkout
    | - toutes les informations du paiement
    |
    */
    const session =
      await stripe.checkout.sessions.create({



        /*
        |--------------------------------------------------------------------------
        | MOYENS DE PAIEMENT AUTORISÉS
        |--------------------------------------------------------------------------
        |
        | Ici :
        | uniquement carte bancaire
        |
        */
        payment_method_types: ["card"],



        /*
        |--------------------------------------------------------------------------
        | TYPE DE PAIEMENT
        |--------------------------------------------------------------------------
        |
        | "payment"
        | = paiement unique
        |
        | (contrairement aux abonnements)
        |
        */
        mode: "payment",



        /*
        |--------------------------------------------------------------------------
        | PRODUIT À PAYER
        |--------------------------------------------------------------------------
        |
        | line_items
        | = liste des éléments à payer
        |
        */
        line_items: [

          {
            /*
            |--------------------------------------------------------------------------
            | DONNÉES DU PRIX
            |--------------------------------------------------------------------------
            */
            price_data: {


              /*
              |--------------------------------------------------------------------------
              | MONNAIE
              |--------------------------------------------------------------------------
              */
              currency: "eur",



              /*
              |--------------------------------------------------------------------------
              | NOM DU PRODUIT
              |--------------------------------------------------------------------------
              |
              | Ce texte sera affiché
              | sur la page Stripe Checkout
              |
              */
              product_data: {

                name:
                  "Cotisation Jardin Partagé",
              },



              /*
              |--------------------------------------------------------------------------
              | MONTANT
              |--------------------------------------------------------------------------
              |
              | Stripe travaille en centimes
              |
              | 2000 = 20€
              |
              */
              unit_amount: 2000,
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
        | URL SUCCESS
        |--------------------------------------------------------------------------
        |
        | Si le paiement réussit :
        |
        | Stripe redirige ici
        |
        | Exemple :
        |
        | /paiement-success?id=18
        |
        */
        success_url:
          `http://localhost:3000/paiement-success?id=${body.id_predemande}`,



        /*
        |--------------------------------------------------------------------------
        | URL CANCEL
        |--------------------------------------------------------------------------
        |
        | Si l'utilisateur annule :
        |
        | Stripe redirige ici
        |
        */
        cancel_url:
          "http://localhost:3000/paiement",
      });



    /*
    |--------------------------------------------------------------------------
    | RETOUR API
    |--------------------------------------------------------------------------
    |
    | On retourne l'URL Stripe Checkout
    |
    | Exemple :
    |
    | {
    |   url: "https://checkout.stripe.com/..."
    | }
    |
    */
    return NextResponse.json({

      // URL Stripe sécurisée
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
          "Erreur lors de la création du paiement Stripe",
      },
      {
        status: 500,
      }
    );
  }
}