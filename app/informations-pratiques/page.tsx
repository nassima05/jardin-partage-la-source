import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function InformationsPratiquesPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "10rem 2rem 4rem" }}>
        <h1>Informations pratiques</h1>

        <p>
          Les jardiniers, les habitants et toute personne intéressée par
          l’écologie, la biodiversité ou le jardinage peuvent participer à la
          vie de l’association.
        </p>

        <p>
          Les personnes souhaitant obtenir une parcelle doivent résider à
          Versailles.
        </p>
      </main>
      <Footer />
    </>
  );
}