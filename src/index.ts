import express from "express";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("This is Budgex");
});

const port = process.env.PORT;

app.listen(3000, () => {
  console.log(`Listening on port ${port}`);
});
