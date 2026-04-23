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