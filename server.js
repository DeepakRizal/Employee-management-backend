import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const DB = process.env.MONGODB_URI;

mongoose.connect(DB).then(() => {
  console.log("DB connected successfully!");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
