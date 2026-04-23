import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";

class Message extends Model {}

Message.init(
  {
    id_message: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: false,
  }
);

export default Message;