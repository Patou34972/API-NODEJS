import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import user from "./models/user.model";
import syncModels from "./syncModels";


dotenv.config();

const param1 = process.argv[2]; 
if(param1  && param1 === "delete"){
  syncModels(true);
}else{
  syncModels(false);
}
const app: Application = express();
const port = process.env.PORT;
console.log(port)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/user.routes").default);

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

