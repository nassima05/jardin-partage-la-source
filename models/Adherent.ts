import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Adherent extends Model {}

Adherent.init(
  {
    id_adherent: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_predemande: {
    type: DataTypes.INTEGER,
    },

    nom: {
    type: DataTypes.STRING,
    },

    prenom: {
    type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    pseudo: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    },

    password_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "adherent",
    },

    statut: {
    type: DataTypes.STRING,
    defaultValue: "actif",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    set_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    set_password_expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    set_password_used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Adherent",
    tableName: "adherents",
    timestamps: false,
  }
);

export default Adherent;