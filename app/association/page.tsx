import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AssociationPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "10rem 2rem 4rem" }}>
        <h1>L’association</h1>

        <p>
          Le Jardin Partagé La Source est une association locale qui favorise
          les échanges, la convivialité, la solidarité et la pratique du
          jardinage dans le quartier Bernard de Jussieu à Versailles.
        </p>
      </main>
       <Footer />
    </>
  );
}