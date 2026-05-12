/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/

// Import de NextResponse
// Permet de rediriger l'utilisateur
import { NextResponse } from "next/server";

// Import du type NextRequest
// Représente la requête reçue par le middleware
import type { NextRequest } from "next/server";

// Import de jsonwebtoken
// Permet de vérifier le JWT
import jwt from "jsonwebtoken";



/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
|
| Ce fichier est exécuté AVANT l'accès aux routes protégées.
|
| Ici :
| → on protège /administrateur
|
*/
export function proxy(request: NextRequest) {

  /*
  |--------------------------------------------------------------------------
  | RÉCUPÉRATION DU COOKIE
  |--------------------------------------------------------------------------
  |
  | On récupère le cookie appelé :
  |
  | admin_token
  |
  | créé lors du login admin.
  |
  */
  const token =
    request.cookies.get("admin_token")?.value;


  /*
  |--------------------------------------------------------------------------
  | SI AUCUN TOKEN
  |--------------------------------------------------------------------------
  |
  | Cela signifie :
  |
  | → admin non connecté
  |
  | Donc :
  | → redirection vers /administrateur/login
  |
  */
  if (!token) {

    return NextResponse.redirect(

      // Construction URL complète
      new URL(
        "/administrateur/login",
        request.url
      )
    );
  }


  /*
  |--------------------------------------------------------------------------
  | VÉRIFICATION JWT
  |--------------------------------------------------------------------------
  |
  | On vérifie :
  |
  | → que le token est valide
  | → qu'il a été signé avec JWT_SECRET
  |
  */
  try {

    jwt.verify(

      // Token récupéré dans le cookie
      token,

      // Clé secrète stockée dans .env
      process.env.JWT_SECRET as string
    );


    /*
    |--------------------------------------------------------------------------
    | TOKEN VALIDE
    |--------------------------------------------------------------------------
    |
    | L'utilisateur peut accéder à :
    |
    | /administrateur
    |
    */
    return NextResponse.next();

  } catch (error) {

    /*
    |--------------------------------------------------------------------------
    | TOKEN INVALIDE
    |--------------------------------------------------------------------------
    |
    | Cas possibles :
    |
    | → token modifié
    | → token expiré
    | → faux token
    |
    | Donc :
    | → redirection login
    |
    */
    return NextResponse.redirect(
      new URL(
        "/administrateur/login",
        request.url
      )
    );
  }
}



/*
|--------------------------------------------------------------------------
| CONFIGURATION DU MIDDLEWARE
|--------------------------------------------------------------------------
|
| Ici on indique :
|
| Quelles routes doivent être protégées.
|
*/
export const config = {

  matcher: [

    /*
    |--------------------------------------------------------------------------
    | ROUTE PROTÉGÉE
    |--------------------------------------------------------------------------
    */
    "/administrateur",
  ],
};