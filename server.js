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

const allowedOrigins = [
    "http://localhost:5173",
    "https://mern-job-tracking-app-frontend-xhas.vercel.app/"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = "CORS policy: Access from this origin not allowed";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use("/api/auth", userRoute);
app.use("/api", jobRoute);


app.get("/", (req,res)=>{
    res.send("Backend server is running successfully")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})