"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function AdministrateurPage() {
  const [demandes, setDemandes] = useState<any[]>([]);

  async function getDemandes() {
    const response = await fetch("/api/pre-demandes");
    const data = await response.json();
    setDemandes(data);
  }

  async function updateStatut(id_predemande: number, statut: string) {
    await fetch("/api/admin", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_predemande: id_predemande,
        statut: statut,
      }),
    });

    getDemandes();
  }

  useEffect(() => {
    getDemandes();
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Espace administrateur</h1>

      {demandes.map((demande) => (
        <div key={demande.id_predemande} className={styles.card}>
          <p>
            <strong>Nom :</strong> {demande.nom}
          </p>

          <p>
            <strong>Prénom :</strong> {demande.prenom}
          </p>

          <p>
            <strong>Email :</strong> {demande.email}
          </p>

          <p>
            <strong>Ville :</strong> {demande.ville}
          </p>

          <p>
            <strong>Type :</strong> {demande.type_demande}
          </p>

          <p>
            <strong>Statut :</strong> {demande.statut}
          </p>

          <p>
            <strong>Email vérifié :</strong>{" "}
            {demande.email_verified_at ? "Oui" : "Non"}
          </p>

          {!demande.email_verified_at ? (
  <p>En attente de confirmation email</p>
) : demande.type_demande === "adhesion_simple" ? (
  <p>Aucune action requise</p>
) : (
  <div className={styles.actions}>
    <button
      className={styles.button}
      onClick={() =>
        updateStatut(demande.id_predemande, "paiement_envoye")
      }
    >
      Parcelle disponible
    </button>

    <button
      className={styles.button}
      onClick={() =>
        updateStatut(demande.id_predemande, "liste_attente")
      }
    >
      Liste d'attente
    </button>

    <button
      className={styles.button}
      onClick={() =>
        updateStatut(demande.id_predemande, "refusee")
      }
    >
      Refuser
    </button>
  </div>
)}
</div>
))}
</main>
);
}
