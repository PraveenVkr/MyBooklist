import express, { response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
dotenv.config();

// // Middleware to handle COrs Policy
// allows all origin

app.use(cors());

//option 2
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['Get','Post','Put','Delete'],
//         allowHeaders:['Content-Type'],
//     })
// );

app.get("/", async (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome");
});

app.use("/books", booksRoute);

const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MONGO_DB_URL;

console.log(PORT, mongoDBURL);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("APP connected to Database");
    app.listen(PORT, () => {
      console.log(`APP is listenig to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
