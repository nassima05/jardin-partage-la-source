/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
import "bootstrap/dist/css/bootstrap.min.css";

import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import CookieBanner from "../components/CookieBanner";



/*
|--------------------------------------------------------------------------
| POLICE GEIST SANS
|--------------------------------------------------------------------------
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



/*
|--------------------------------------------------------------------------
| POLICE GEIST MONO
|--------------------------------------------------------------------------
*/
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



/*
|--------------------------------------------------------------------------
| MÉTADONNÉES DU SITE
|--------------------------------------------------------------------------
*/
export const metadata: Metadata = {
  title: "Jardin Partagé La Source",
  description:
    "Site officiel du Jardin Partagé La Source à Versailles.",
};



/*
|--------------------------------------------------------------------------
| LAYOUT RACINE
|--------------------------------------------------------------------------
|
| Ce fichier encadre toutes les pages du site.
|
| children :
| représente la page actuellement affichée.
|
| CookieBanner :
| s'affiche sur tout le site car il est placé ici.
|
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >

      <body>

        {children}

        <CookieBanner />

      </body>

    </html>

  );
}