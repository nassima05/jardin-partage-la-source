
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Navbar />

      <header className={styles.hero}>
        <div className="container text-center">
          <h1 className={styles.title}>
            Jardin Partagé La Source
          </h1>

          <p className={styles.subtitle}>
            Un espace collectif de jardinage, de partage et de rencontres
            au cœur du quartier Bernard de Jussieu à Versailles.
          </p>
        </div>
      </header>
      <Footer />
    </>
  );
}