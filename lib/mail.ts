import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Vérification de votre pré-demande - Jardin Partagé",
    html: `
      <h2>Confirmation de votre email</h2>
      <p>Merci pour votre pré-demande.</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour confirmer votre adresse email :</p>
      <a href="${verificationLink}">
        Confirmer mon email
      </a>
      <p>Ce lien expire dans 24 heures.</p>
    `,
  });
}
export async function sendAdminNotificationEmail(demande: any) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Nouvelle demande reçue - Jardin Partagé",
    html: `
      <h2>Nouvelle demande reçue</h2>

      <p><strong>Nom :</strong> ${demande.nom}</p>
      <p><strong>Prénom :</strong> ${demande.prenom}</p>
      <p><strong>Email :</strong> ${demande.email}</p>
      <p><strong>Adresse :</strong> ${demande.adresse}</p>
      <p><strong>Ville :</strong> ${demande.ville}</p>
      <p><strong>Type de demande :</strong> ${demande.type_demande}</p>
      <p><strong>Statut :</strong> ${demande.statut}</p>

      <p>
        Vous pouvez consulter les demandes dans l’espace administrateur.
      </p>
    `,
  });
}

export async function sendAdminDecisionEmail(demande: any, statut: string) {
  let subject = "";
  let html = "";

  if (statut === "liste_attente") {
    subject = "Votre demande de parcelle - Liste d'attente";

    html = `
      <h2>Votre demande de parcelle</h2>
      <p>Bonjour ${demande.prenom},</p>
      <p>
        Votre demande a bien été étudiée.
      </p>
      <p>
        Pour le moment, aucune parcelle n'est disponible.
        Vous êtes placé(e) sur liste d'attente.
      </p>
      <p>
        Vous recevrez un nouvel email dès qu'une parcelle se libérera.
      </p>
    `;
  }

  if (statut === "paiement_envoye") {

  const paiementLink =
    `http://localhost:3000/paiement?id=${demande.id_predemande}`;

  subject =
    "Une parcelle est disponible - Jardin Partagé";

  html = `
    <h2>Une parcelle est disponible</h2>

    <p>Bonjour ${demande.prenom},</p>

    <p>
      Une parcelle est actuellement disponible.
    </p>

    <p>
      Vous pouvez désormais procéder au règlement
      de votre cotisation afin de finaliser votre adhésion.
    </p>

    <p>
      <a href="${paiementLink}">
        Accéder au paiement
      </a>
    </p>
  `;
}

  if (statut === "refusee") {
    subject = "Réponse à votre demande - Jardin Partagé";

    html = `
      <h2>Réponse à votre demande</h2>
      <p>Bonjour ${demande.prenom},</p>
      <p>
        Après étude de votre demande, nous ne pouvons malheureusement pas y donner une suite favorable.
      </p>
      <p>
        Nous vous remercions pour l'intérêt porté au Jardin Partagé.
      </p>
    `;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: demande.email,
    subject: subject,
    html: html,
  });
}
