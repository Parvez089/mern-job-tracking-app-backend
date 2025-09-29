import express from "express"
import dotenv from "dotenv";
import dbConnect from "./database/db.js";
import userRoute from "./routers/userRoute.js"
dotenv.config();

const app = express();
const PORT = 3000;

dbConnect()
app.use(express.json())

app.use("/api/auth", userRoute)


app.get("/", (req,res)=>{
    res.send("Backend server is running successfully")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})