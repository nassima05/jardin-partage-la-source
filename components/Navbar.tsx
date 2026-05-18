"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
|
| On réutilise page.module.css
|
*/
import styles from "../app/page.module.css";

/*
|--------------------------------------------------------------------------
| COMPONENT NAVBAR
|--------------------------------------------------------------------------
*/
export default function Navbar() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  |
  | showNavbar :
  | affiche/cache la navbar
  |
  | lastScrollY :
  | mémorise le scroll précédent
  |
  | bounce :
  | animation rebond
  |
  */
  const [showNavbar, setShowNavbar] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(0);

  const [bounce, setBounce] = useState(false);



  /*
  |--------------------------------------------------------------------------
  | SCROLL EFFECT
  |--------------------------------------------------------------------------
  */
  useEffect(() => {

    function handleScroll() {

      const currentScrollY = window.scrollY;

      /*
      |--------------------------------------------------------------------------
      | SCROLL BAS
      |--------------------------------------------------------------------------
      */
      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 80
      ) {

        setShowNavbar(false);

      } else {

        /*
        |--------------------------------------------------------------------------
        | SCROLL HAUT
        |--------------------------------------------------------------------------
        */
        setShowNavbar(true);

        setBounce(true);

        setTimeout(() => {

          setBounce(false);

        }, 400);
      }

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {

      window.removeEventListener("scroll", handleScroll);

    };

  }, [lastScrollY]);



  /*
  |--------------------------------------------------------------------------
  | JSX
  |--------------------------------------------------------------------------
  */
  return (

    <nav
      className={`navbar navbar-expand-lg fixed-top ${styles.navbar} ${
        showNavbar
          ? styles.navbarVisible
          : styles.navbarHidden
      } ${bounce ? styles.navbarBounce : ""}`}
    >

      <div className="container-fluid px-4">

        {/* LOGO */}
        <Link
          href="/"
          className={styles.logoBlock}
        >

          <Image
            src="/logo-jardin.png"
            alt="Logo Jardin Partagé La Source"
            width={240}
            height={130}
            className={styles.logo}
            priority
          />

        </Link>



        {/* MENU */}
        <div className={`navbar-nav ms-auto ${styles.navMenu}`}>

          <Link href="/" className={styles.navLink}>
            Accueil
          </Link>

          <Link
            href="/association"
            className={styles.navLink}
          >
            Association
          </Link>

          <Link
            href="/informations-pratiques"
            className={styles.navLink}
          >
            Informations pratiques
          </Link>

          <Link
            href="/adhesion"
            className={styles.navLink}
          >
            Adhésion
          </Link>

          <Link
            href="/don"
            className={styles.navLink}
          >
            Don
          </Link>

          <Link
            href="/contact"
            className={styles.navLink}
          >
            Contact
          </Link>

        </div>

      </div>

    </nav>
  );
}