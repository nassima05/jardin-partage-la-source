import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Parcelle extends Model {}

Parcelle.init(
  {
    id_parcelle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    statut: {
      type: DataTypes.STRING,
      defaultValue: "disponible",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Parcelle",
    tableName: "parcelles",
    timestamps: false,
  }
);

export default Parcelle;