import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

/*
|--------------------------------------------------------------------------
| CRÉATION SESSION STRIPE
|--------------------------------------------------------------------------
*/
async function createCheckoutSession(idPredemande: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "eur",

          product_data: {
            name: "Cotisation Jardin Partagé",
          },

          unit_amount: 4000,
        },

        quantity: 1,
      },
    ],

    success_url:
      `http://localhost:3000/paiement-success?id=${idPredemande}`,

    cancel_url:
      `http://localhost:3000/paiement?id=${idPredemande}`,
  });

  return session;
}

/*
|--------------------------------------------------------------------------
| POST - UTILISÉ PAR LA PAGE /paiement
|--------------------------------------------------------------------------
*/
export async function POST(request: Request) {
  try {
    const body = await request.json();

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

    const session = await createCheckoutSession(
      body.id_predemande
    );

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la création du paiement Stripe",
      },
      {
        status: 500,
      }
    );
  }
}

/*
|--------------------------------------------------------------------------
| GET - UTILISÉ PAR LE LIEN DIRECT DANS L'EMAIL
|--------------------------------------------------------------------------
*/
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const idPredemande =
      url.searchParams.get("id");

    if (!idPredemande) {
      return NextResponse.json(
        {
          message: "Identifiant obligatoire",
        },
        {
          status: 400,
        }
      );
    }

    const session = await createCheckoutSession(
      idPredemande
    );

    return NextResponse.redirect(
      session.url as string
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur lors de la création du paiement Stripe",
      },
      {
        status: 500,
      }
    );
  }
}