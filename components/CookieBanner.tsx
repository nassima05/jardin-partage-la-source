"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
*/
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieBanner.module.css";



/*
|--------------------------------------------------------------------------
| BANDEAU COOKIES
|--------------------------------------------------------------------------
*/
export default function CookieBanner() {

  const [showBanner, setShowBanner] = useState(false);



  /*
  |--------------------------------------------------------------------------
  | VÉRIFICATION DU CHOIX UTILISATEUR
  |--------------------------------------------------------------------------
  */
  useEffect(() => {

    const consent = sessionStorage.getItem("cookieConsent");

    if (!consent) {
      setShowBanner(true);
    }

  }, []);



  /*
  |--------------------------------------------------------------------------
  | ACCEPTER
  |--------------------------------------------------------------------------
  */
 function acceptCookies() {
  sessionStorage.setItem(
    "cookieConsent",
    "accepted"
  );

  setShowBanner(false);
}



  /*
  |--------------------------------------------------------------------------
  | REFUSER
  |--------------------------------------------------------------------------
  */
  function refuseCookies() {
  sessionStorage.setItem(
    "cookieConsent",
    "refused"
  );

  setShowBanner(false);
}


  if (!showBanner) {
    return null;
  }



  return (
    <div className={styles.overlay}>

    <div className={styles.cookieBox}>

      <button
        type="button"
        className={styles.closeLink}
        onClick={refuseCookies}
      >
        Continuer sans accepter
      </button>

      <div className={styles.header}>

        <div>
          <p className={styles.smallText}>
            Salut c’est nous...
          </p>

          <h2>
            les Cookies !
          </h2>
        </div>

        <div className={styles.cookieIcon}>
          🍪
        </div>

      </div>

      <p className={styles.text}>
        On utilise des cookies nécessaires au bon fonctionnement du site
        et à la sécurisation de certains services.
      </p>

      <p className={styles.text}>
        Vous pouvez accepter ou refuser les cookies non essentiels.
      </p>

      <div className={styles.actions}>

        <button
          type="button"
          onClick={refuseCookies}
          className={styles.secondaryButton}
        >
          Je refuse
        </button>

        <button
          type="button"
          onClick={acceptCookies}
          className={styles.primaryButton}
        >
          OK pour moi
        </button>

      </div>

      <Link
        href="/politique-cookies"
        className={styles.moreLink}
      >
        En savoir plus sur les cookies
      </Link>
     </div> 

    </div>

  );
}