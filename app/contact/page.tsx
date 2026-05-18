import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "10rem 2rem 4rem" }}>
        <h1>Contact</h1>

        <p>
          Pour toute question, vous pouvez contacter l’association.
        </p>
      </main>
      <Footer />
    </>
  );
}