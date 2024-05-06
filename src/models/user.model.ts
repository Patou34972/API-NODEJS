import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/database";
import Role from "./role.model";
import UserAttributes from "./../interfaces/user.interface";

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public nom!: string;
  public prenom!: string;
  public adresse!: string;
  public code_postal!: string;
  public ville!: string;
  public telephone!: string;
  public email!: string;
  public mot_passe!: string;
  public photo?: string;

  static initModel = () => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
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
        adresse: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        code_postal: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ville: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        telephone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        mot_passe: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },        photo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  };
  static associate() {
    User.belongsTo(Role);
  }
}
export default User;