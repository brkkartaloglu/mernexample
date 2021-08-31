import express from "express";
//import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";

import recordRoutes from "./routes/record.js";

import dotenv from "dotenv";
//To read the .env-file you'll need to install something that will read that file, for instance the dotenv package

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/records", recordRoutes);

//backend greeting page
app.get("/", (req, res) => {
  res.send("employee backende erisildi");
});

//const CONNECTION_URL =
("mongodb+srv://burak:deneme@cluster0.h3oan.mongodb.net/employees?retryWrites=true&w=majority");

//process.env.PORT heroku deploymentı sonrası heroku üretecek
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);
