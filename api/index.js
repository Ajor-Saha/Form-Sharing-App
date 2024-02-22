import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";
import mongoose from "mongoose";

dotenv.config({
    path: './.env'
})

mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => {
    console.log("Mongodb is connected");
   })
   .catch((err) => {
    console.log(err);
   })

.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})