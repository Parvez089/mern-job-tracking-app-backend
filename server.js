import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import dbConnect from "./database/db.js";
import userRoute from "./routers/userRoute.js"
import jobRoute from "./routers/jobRoute.js"
dotenv.config();

const app = express();
const PORT = 5000;

dbConnect()
app.use(express.json())

app.use(cors({
    origin: process.env.VITE_API_URL,
    credentials: true,
}))

app.use("/api/auth", userRoute);
app.use("/api", jobRoute);


app.get("/", (req,res)=>{
    res.send("Backend server is running successfully")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})