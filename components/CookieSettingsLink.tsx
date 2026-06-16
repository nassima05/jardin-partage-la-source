"use client";

import styles from "../app/page.module.css";
export default function CookieSettingsLink() {

  function openCookieBanner() {
    sessionStorage.removeItem("cookieConsent");
    window.location.reload();
  }

  return (
    <button
  type="button"
  onClick={openCookieBanner}
  className={styles.footerLink}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    font: "inherit",
  }}
>
  Gestion des cookies
</button>

); 
}
