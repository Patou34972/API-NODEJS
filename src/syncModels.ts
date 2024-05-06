import dotenv from "dotenv";
import User from "./models/user.model";
import Role from "./models/role.model";


dotenv.config();

// Utilisation de Promise.all() pour synchroniser tous les modèles en parallèle
const syncModels = (syn : boolean) => {
  User.initModel();
  Role.initModel();
  User.associate();
  Role.associate();
  Promise.all([User.sync({force : syn}),Role.sync({ force: syn })])
  .then(() => {
    console.log("Tous les modèles ont été synchronisés avec succès.");
  })
  .catch((err) => {
    console.error(
      "Une erreur est survenue lors de la synchronisation des modèles :",
      err
    );
  });
};
export default syncModels;
