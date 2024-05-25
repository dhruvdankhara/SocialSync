import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

import app from "./app.js";
import connectDB from "./DB/index.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("express error :", error);
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("mongoDB connect error:", error);
    process.exit(1);
  });
