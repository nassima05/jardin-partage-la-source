// Import de NextResponse
// Permet de renvoyer une réponse API Next.js
import { NextResponse } from "next/server";

// Import de jsonwebtoken
// Permet de créer un token JWT
import jwt from "jsonwebtoken";

// Route POST appelée quand l'admin clique sur "Se connecter"
export async function POST(request: Request) {
  try {
    // Récupère les données envoyées par le formulaire
    // Exemple : { password: "admin123" }
    const body = await request.json();

    // Vérifie que le mot de passe a bien été envoyé
    if (!body.password) {
      return NextResponse.json(
        { message: "Mot de passe obligatoire" },
        { status: 400 }
      );
    }

    // Compare le mot de passe envoyé avec celui du fichier .env
    if (body.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Si le mot de passe est correct, on crée un JWT
    const token = jwt.sign(
      // Données stockées dans le token
      { role: "admin" },

      // Secret utilisé pour signer le token
      process.env.JWT_SECRET as string,

      // Durée de validité du token
      { expiresIn: "2h" }
    );

    // Réponse envoyée au navigateur
    const response = NextResponse.json({
      message: "Connexion réussie",
    });

    // Stockage du token dans un cookie sécurisé côté navigateur
    response.cookies.set("admin_token", token, {
      // Le JavaScript du navigateur ne peut pas lire ce cookie
      httpOnly: true,

      // Le cookie est envoyé uniquement dans le contexte du même site
      sameSite: "strict",

      // false en local car  sur http://localhost
      // en production avec https, on mettra true
      secure: false,

      // Le cookie est valable pour tout le site
      path: "/",

      // Durée du cookie : 2 heures
      maxAge: 60 * 60 * 2,
    });

    // On renvoie la réponse avec le cookie
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}