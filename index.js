import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectdb from "./config/db.js"
import userRouter from "./Router/auth.router.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
const port = process.env.PORT || 4000
const allowedOrigins = [
  "https://chatgpt-frontend-eta.vercel.app",
  "http://localhost:5173" // for local dev
]

app.use(express.json())
app.use(cors({
    "origin":"https://chatgpt-frontend-eta.vercel.app",

    credentials:true
}))
app.use(cookieParser())
app.use("/api",userRouter)


app.listen(port, () => {
    connectdb()
    console.log(`server is started at ${port}`);
})