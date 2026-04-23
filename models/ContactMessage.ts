import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class ContactMessage extends Model {}

ContactMessage.init(
  {
    id_contact: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    objet: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nom: {
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
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    statut: {
      type: DataTypes.STRING,
      defaultValue: "nouveau",
    },
  },
  {
    sequelize,
    modelName: "ContactMessage",
    tableName: "contact_messages",
    timestamps: false,
  }
);

export default ContactMessage;