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