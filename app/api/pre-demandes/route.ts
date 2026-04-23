import { NextResponse } from "next/server";
import PreDemande from "@/models/PreDemande";

export async function GET() {
  try {
    const demandes = await PreDemande.findAll();

    return NextResponse.json(demandes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.nom ||
      !body.prenom ||
      !body.email ||
      !body.adresse ||
      !body.ville
    ) {
      return NextResponse.json(
        { message: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    if (body.ville.trim().toLowerCase() !== "versailles") {
      return NextResponse.json(
        {
          message:
            "Seuls les habitants de Versailles peuvent demander une parcelle",
        },
        { status: 400 }
      );
    }

    const existingDemande = await PreDemande.findOne({
      where: {
        email: body.email,
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

    const token = crypto.randomUUID();

    const expiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    const nouvelleDemande = await PreDemande.create({
      nom: body.nom,
      prenom: body.prenom,
      email: body.email,
      adresse: body.adresse,
      ville: body.ville,
      email_token: token,
      email_token_expires_at: expiresAt,
    });

    return NextResponse.json(
      {
        message: "Pré-demande créée avec succès",
        data: nouvelleDemande,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur lors de la création de la pré-demande" },
      { status: 500 }
    );
  }
}