import dotenv from "dotenv";
import User from "./models/user.model";
import Role from "./models/role.model";
import {sequelize} from "./config/database";

dotenv.config();

// Utilisation de Promise.all() pour synchroniser tous les modèles en parallèle
const syncModels = async (syn: boolean) => {
  
  try {
    initModels();
    associateModels();
    await sequelize.sync({ force: syn });
    console.log("Tous les modèles ont été synchronisés avec succès.");
  } catch (err) {
    console.error(
      "Une erreur est survenue lors de la synchronisation des modèles :",err);
  }
};

const initModels  = () => {
  User.initModel();
  Role.initModel();
}

const associateModels = () => {
  User.associate();
  Role.associate();
}

export default syncModels;
