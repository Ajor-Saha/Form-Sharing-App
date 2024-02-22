import dotenv from "dotenv"
import { app } from "./src/app.js";
import mongoose from "mongoose";

dotenv.config({
    path: './.env'
})

mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => {
       console.log("MongoDB is connected");
       app.listen(process.env.PORT || 4000, () => {
           console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
       });
   })
   .catch((err) => {
       console.error("MongoDB connection failed:", err);
   });