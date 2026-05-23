"use client";

/*
|--------------------------------------------------------------------------
| IMPORTS
|--------------------------------------------------------------------------
|
| useEffect :
| Permet d'exécuter du code après le chargement du composant.
|
| useState :
| Permet de stocker des données dynamiques :
| - heure actuelle
| - température
| - météo
|
| styles :
| Import du fichier CSS spécifique à la page.
|
*/
import { useEffect, useState } from "react";
import styles from "../app/informations-pratiques/page.module.css";



/*
|--------------------------------------------------------------------------
| COMPOSANT DATE + HEURE + MÉTÉO
|--------------------------------------------------------------------------
|
| Ce composant affiche :
|
| - la date actuelle
| - l’heure actuelle
| - la météo en direct à Versailles
|
| Les données météo proviennent de l’API gratuite Open-Meteo.
|
*/
export default function CurrentDateTime() {



  /*
  |--------------------------------------------------------------------------
  | ÉTAT DATE / HEURE
  |--------------------------------------------------------------------------
  |
  | "now" contient la date et l’heure actuelles.
  |
  */
  const [now, setNow] = useState(new Date());



  /*
  |--------------------------------------------------------------------------
  | ÉTAT TEMPÉRATURE
  |--------------------------------------------------------------------------
  |
  | temperature :
  | stocke la température actuelle.
  |
  | Au départ : null
  |
  */
  const [temperature, setTemperature] = useState<number | null>(null);



  /*
  |--------------------------------------------------------------------------
  | ÉTAT MÉTÉO
  |--------------------------------------------------------------------------
  |
  | weatherCode :
  | code météo envoyé par Open-Meteo.
  |
  */
  const [weatherCode, setWeatherCode] = useState<number | null>(null);




  /*
  |--------------------------------------------------------------------------
  | MISE À JOUR DE L’HEURE
  |--------------------------------------------------------------------------
  |
  | Toutes les secondes :
  | -> on met à jour la date et l’heure.
  |
  */
  useEffect(() => {

    const timer = setInterval(() => {

      setNow(new Date());

    }, 1000);



    /*
    |--------------------------------------------------------------------------
    | NETTOYAGE
    |--------------------------------------------------------------------------
    |
    | Supprime l’intervalle quand le composant disparaît.
    |
    */
    return () => clearInterval(timer);

  }, []);




  /*
  |--------------------------------------------------------------------------
  | API MÉTÉO OPEN-METEO
  |--------------------------------------------------------------------------
  |
  | Cette partie récupère la météo réelle de Versailles.
  |
  | API utilisée :
  | https://open-meteo.com/
  |
  | Aucun package à installer.
  | Aucune clé API nécessaire.
  |
  | Coordonnées de Versailles :
  |
  | latitude = 48.8036
  | longitude = 2.1342
  |
  */
  useEffect(() => {



    /*
    |--------------------------------------------------------------------------
    | FONCTION ASYNCHRONE
    |--------------------------------------------------------------------------
    |
    | fetchWeather :
    | récupère les données météo depuis l’API.
    |
    */
    async function fetchWeather() {

      /*
      |--------------------------------------------------------------------------
      | REQUÊTE API
      |--------------------------------------------------------------------------
      |
      | current=temperature_2m
      | -> température actuelle
      |
      | weather_code
      | -> état météo
      |
      | timezone=Europe/Paris
      | -> heure française
      |
      */
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=48.8036&longitude=2.1342&current=temperature_2m,weather_code&timezone=Europe%2FParis"
      );



      /*
      |--------------------------------------------------------------------------
      | CONVERSION JSON
      |--------------------------------------------------------------------------
      */
      const data = await response.json();



      /*
      |--------------------------------------------------------------------------
      | STOCKAGE DES DONNÉES
      |--------------------------------------------------------------------------
      */
      setTemperature(data.current.temperature_2m);

      setWeatherCode(data.current.weather_code);
    }



    /*
    |--------------------------------------------------------------------------
    | APPEL DE LA FONCTION
    |--------------------------------------------------------------------------
    */
    fetchWeather();

  }, []);




  /*
  |--------------------------------------------------------------------------
  | TRADUCTION CODE MÉTÉO
  |--------------------------------------------------------------------------
  |
  | Open-Meteo renvoie des chiffres :
  |
  | 0 = soleil
  | 1 2 3 = nuages
  | etc...
  |
  | Ici on transforme ces chiffres en texte lisible.
  |
  */
  function getWeatherLabel(code: number | null) {

    if (code === null) {

      return "Météo indisponible";
    }



    /*
    |--------------------------------------------------------------------------
    | SOLEIL
    |--------------------------------------------------------------------------
    */
    if (code === 0) {

      return "☀️ Ciel dégagé";
    }



    /*
    |--------------------------------------------------------------------------
    | NUAGEUX
    |--------------------------------------------------------------------------
    */
    if ([1, 2, 3].includes(code)) {

      return "🌤️ Partiellement nuageux";
    }



    /*
    |--------------------------------------------------------------------------
    | BROUILLARD
    |--------------------------------------------------------------------------
    */
    if ([45, 48].includes(code)) {

      return "🌫️ Brouillard";
    }



    /*
    |--------------------------------------------------------------------------
    | PLUIE
    |--------------------------------------------------------------------------
    */
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {

      return "🌧️ Pluie";
    }



    /*
    |--------------------------------------------------------------------------
    | NEIGE
    |--------------------------------------------------------------------------
    */
    if ([71, 73, 75, 77, 85, 86].includes(code)) {

      return "❄️ Neige";
    }



    /*
    |--------------------------------------------------------------------------
    | ORAGE
    |--------------------------------------------------------------------------
    */
    if ([95, 96, 99].includes(code)) {

      return "⛈️ Orage";
    }



    /*
    |--------------------------------------------------------------------------
    | PAR DÉFAUT
    |--------------------------------------------------------------------------
    */
    return "🌡️ Météo";
  }




  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE FRANÇAISE
  |--------------------------------------------------------------------------
  */
  const date = now.toLocaleDateString("fr-FR");



  /*
  |--------------------------------------------------------------------------
  | FORMAT HEURE
  |--------------------------------------------------------------------------
  |
  | padStart :
  | ajoute un 0 devant si nécessaire.
  |
  */
  const hours = now.getHours().toString().padStart(2, "0");

  const minutes = now.getMinutes().toString().padStart(2, "0");




  /*
  |--------------------------------------------------------------------------
  | AFFICHAGE JSX
  |--------------------------------------------------------------------------
  */
  return (

    <div className={styles.weatherBar}>



      {/* --------------------------------------------------------------- */}
      {/* HORLOGE */}
      {/* --------------------------------------------------------------- */}
      <div className={styles.clockBox}>

        <span>
          {date}
        </span>



        <span className={styles.clockTime}>

          {hours}

          <span className={styles.blink}>
            :
          </span>

          {minutes}

        </span>

      </div>




      {/* --------------------------------------------------------------- */}
      {/* MÉTÉO */}
      {/* --------------------------------------------------------------- */}
      <div className={styles.weatherBox}>



        {/* Température */}
        <span>

          {temperature !== null
            ? `${Math.round(temperature)}°C`
            : "--°C"}

        </span>



        {/* État météo */}
        <span>

          {getWeatherLabel(weatherCode)}

        </span>



        {/* Ville */}
        <span>
          Versailles
        </span>

      </div>

    </div>
  );
}