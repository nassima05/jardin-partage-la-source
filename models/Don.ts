import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Don extends Model {}

Don.init(
  {
    id_don: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
      unique: true,
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
    modelName: "Don",
    tableName: "dons",
    timestamps: false,
  }
);

export default Don;