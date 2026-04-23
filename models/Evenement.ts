import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Evenement extends Model {}

Evenement.init(
  {
    id_evenement: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date_debut: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    date_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    lieu: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Evenement",
    tableName: "evenements",
    timestamps: false,
  }
);

export default Evenement;