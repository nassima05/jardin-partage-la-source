import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class InscriptionEvenement extends Model {}

InscriptionEvenement.init(
  {
    id_inscription: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "InscriptionEvenement",
    tableName: "inscription_evenements",
    timestamps: false,
  }
);

export default InscriptionEvenement;