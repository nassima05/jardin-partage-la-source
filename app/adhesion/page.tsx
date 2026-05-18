import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdhesionPage() {
  return (
    <>
      <Navbar />

      <main style={{ padding: "10rem 2rem 4rem" }}>
        <h1>Adhésion et parcelles</h1>

        <p>
          Une adhésion simple permet de soutenir l’association et de participer
          aux événements, aux échanges de savoirs et aux projets collectifs.
        </p>

        <p>
          Les parcelles sont attribuées selon les disponibilités, avec des
          surfaces variant d’environ 9 m² à 50 m².
        </p>
      </main>
      <Footer />
    </>
  );
}