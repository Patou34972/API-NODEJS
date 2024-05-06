import express, { Application } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import user from "./models/user.model";
import syncModels from "./syncModels";
import Role from "./models/role.model";

dotenv.config();
const param1 = process.argv[2];

const main = async () => {
  // connexion à la base de données
  await connectToDatabase();
  // synchronisation des modeles
  if (param1 && param1 === "delete") {
    await syncModels(true);
  } else {
    await syncModels(false);
  }

  const app: Application = express();
  const port = process.env.PORT;
  console.log(port);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/users", require("./routes/user.routes").default);
  app.use("/roles", require("./routes/role.routes").default);

  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
};

main();