import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
  }
);
export const connectToDatabase = async () => {
  try {
    sequelize.authenticate();
    console.log("Connexion BD réussie !");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
  }
};


