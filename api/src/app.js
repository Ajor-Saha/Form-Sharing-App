import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js"
import formRouter from "./routes/form.route.js"




app.use("/api/user",userRouter);
app.use("/api/form", formRouter);

export { app }