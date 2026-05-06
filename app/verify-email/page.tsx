"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Vérification en cours...");

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(`/api/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setMessage(
            `Votre adresse email a bien été confirmée.

Votre demande a été prise en compte.
Vous reçevrez prochainement un email vous informant de la suite de votre demande.`
          );
        } else {
          setMessage(data.message || "Erreur lors de la vérification.");
        }
      } catch (error) {
        setMessage("Erreur serveur.");
      }
    }

    if (token) {
      verifyEmail();
    } else {
      setMessage("Lien de vérification invalide.");
    }
  }, [token]);

  return (
    <main className="container mt-5">
      <h1 className="text-success">Vérification de votre email</h1>
      <p style={{ whiteSpace: "pre-line" }}>{message}</p>
    </main>
  );
}