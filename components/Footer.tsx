/*
|------------------------------------------------------------------
| IMPORTS
|------------------------------------------------------------------
*/
import Link from "next/link";

import styles from "../app/page.module.css";

import CookieSettingsLink from "./CookieSettingsLink";



/*
|------------------------------------------------------------------
| FOOTER
|------------------------------------------------------------------
*/
export default function Footer() {

  return (

    <footer className={styles.footer}>

      <div className="container">

        {/* VALEURS ASSOCIATION */}
        <div className={styles.footerValues}>

          <span className={styles.blue}>
            Écologie
          </span>

          <span className={styles.green}>
            Citoyenneté
          </span>

          <span className={styles.orange}>
            Partage
          </span>

          <span className={styles.black}>
            Solidarité
          </span>

        </div>



        {/* LIENS LÉGAUX */}
        <div className={styles.footerLinks}>

          <Link
            href="/faq"
            className={styles.footerLink}
          >
            FAQ
          </Link>

          <Link
            href="/mentions-legales"
            className={styles.footerLink}
          >
            Mentions légales
          </Link>

          <Link
            href="/politique-confidentialite"
            className={styles.footerLink}
          >
            Politique de confidentialité
          </Link>

          <Link
            href="/politique-cookies"
            className={styles.footerLink}
          >
            Politique de cookies
          </Link>

          <CookieSettingsLink />

        </div>



        {/* COPYRIGHT */}
        <p className={styles.copyright}>
          © 2026 Jardin Partagé La Source — Association loi 1901
        </p>

      </div>

    </footer>
  );
}