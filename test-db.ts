import sequelize from "./lib/sequelize";
import "./models";

async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL réussie.");

    console.log("Modèles enregistrés :", Object.keys(sequelize.models));

    await sequelize.sync({ alter: true });
    console.log("Synchronisation Sequelize réussie.");

    console.log("Relations + Table créées.");
  } catch (error) {
    console.error("Erreur de connexion ou de synchronisation :", error);
  } finally {
    await sequelize.close();
  }
}

testDatabase();