"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaiementPage() {

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [message, setMessage] = useState("");

  async function confirmerPaiement() {

    const response = await fetch("/api/paiement", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_predemande: id,
      }),
    });

    const data = await response.json();

    if (response.ok) {

      setMessage(
        "Paiement confirmé. Votre adhésion est désormais finalisée."
      );

    } else {

      setMessage(
        data.message || "Erreur lors du paiement."
      );
    }
  }

  return (
    <main style={{ padding: "2rem" }}>

      <h1>Paiement de la cotisation</h1>

      <p>
        Votre demande a été acceptée.
      </p>

      <p>
        Vous pouvez désormais procéder au règlement
        de votre cotisation afin de finaliser votre adhésion au Jardin Partagé.
      </p>

      <p>
        Montant : <strong>à définir</strong>
      </p>

      <button onClick={confirmerPaiement}>
        Confirmer le paiement
      </button>

      {message && (
        <p style={{ marginTop: "1rem" }}>
          {message}
        </p>
      )}

    </main>
  );
}