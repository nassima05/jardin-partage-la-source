import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class PaiementCotisation extends Model {}

PaiementCotisation.init(
  {
    id_paiement: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    devise: {
      type: DataTypes.STRING,
      defaultValue: "EUR",
    },

    stripe_payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    statut: {
      type: DataTypes.STRING,
      defaultValue: "en_attente",
    },

    paid_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PaiementCotisation",
    tableName: "paiement_cotisations",
    timestamps: false,
  }
);

export default PaiementCotisation;