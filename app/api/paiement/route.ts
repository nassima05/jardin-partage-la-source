import { NextResponse } from "next/server";

import PreDemande from "@/models/PreDemande";

export async function PATCH(request: Request) {
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

    const demande = await PreDemande.findByPk(
      body.id_predemande
    );

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

    await demande.update({
      statut: "adhesion_finalisee",
    });

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