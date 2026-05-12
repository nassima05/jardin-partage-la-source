/*
|--------------------------------------------------------------------------
| IMPORT LINK NEXT.JS
|--------------------------------------------------------------------------
|
| Permet de naviguer entre les pages :
|
| /don
| /administrateur
| etc.
|
*/
import Link from "next/link";



/*
|--------------------------------------------------------------------------
| PAGE D'ACCUEIL
|--------------------------------------------------------------------------
*/
export default function Home() {

  return (

    /*
    |--------------------------------------------------------------------------
    | CONTAINER BOOTSTRAP
    |--------------------------------------------------------------------------
    |
    | mt-5
    | = margin top Bootstrap
    |
    */
    <div className="container mt-5">



      {/* TITRE */}
      <h1 className="text-success">

        Jardin Partagé La Source

      </h1>



      {/*
      |--------------------------------------------------------------------------
      | LIEN VERS PAGE DON
      |--------------------------------------------------------------------------
      |
      | href="/don"
      |
      | Quand utilisateur clique :
      | → ouvre page /don
      |
      */}
      <Link href="/don">



        {/*
        |--------------------------------------------------------------------------
        | BOUTON BOOTSTRAP
        |--------------------------------------------------------------------------
        |
        | btn
        | = style bouton Bootstrap
        |
        | btn-primary
        | = bouton bleu Bootstrap
        |
        | mt-3
        | = margin top Bootstrap
        |
        */}
        <button className="btn btn-primary mt-3">

          Faire un don

        </button>

      </Link>

    </div>
  );
}