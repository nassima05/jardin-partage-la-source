import { NextResponse } from "next/server";
import PreDemande from "@/models/PreDemande";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Token manquant." },
        { status: 400 }
      );
    }

    const demande = await PreDemande.findOne({
      where: {
        email_token: token,
      },
    });

    if (!demande) {
      return NextResponse.json(
        { message: "Lien de vérification invalide." },
        { status: 404 }
      );
    }

    const expiresAt = demande.get("email_token_expires_at") as Date;

    if (expiresAt && new Date() > new Date(expiresAt)) {
      return NextResponse.json(
        { message: "Ce lien de vérification a expiré." },
        { status: 400 }
      );
    }

    const typeDemande = demande.get("type_demande") as string;

    const statutApresVerification =
      typeDemande === "adhesion_simple"
        ? "en_attente_paiement"
        : "en_attente_validation_parcelle";

    await demande.update({
      email_verified_at: new Date(),
      email_token: null,
      email_token_expires_at: null,
      statut: statutApresVerification,
   });

    return NextResponse.json({
      message: "Email vérifié avec succès.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur serveur." },
      { status: 500 }
    );
  }
}