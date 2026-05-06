import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class PreDemande extends Model {}

PreDemande.init(
  {
    id_predemande: {
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
    adresse: {
      type: DataTypes.STRING,
    },
    ville: {
      type: DataTypes.STRING,
    },
    type_demande: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "demande_parcelle",
    },
    statut: {
      type: DataTypes.STRING,
      defaultValue: "en_attente",
    },
    email_token: {
      type: DataTypes.STRING,
    },
    email_token_expires_at: {
      type: DataTypes.DATE,
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "pre_demandes",
    timestamps: false,
  }
);

export default PreDemande;