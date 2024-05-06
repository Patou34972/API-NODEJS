import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion BD réussie !");
  })
  .catch((err: any) => {
    console.error("Impossible de se connecter à la base de données:", err);
  });
console.log("Autre tâche");

export default sequelize;