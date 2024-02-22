import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./src/routes/user.route.js";
import formRouter from "./src/routes/form.route.js";

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/form", formRouter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(process.env.PORT || 4000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    });

export { app };
