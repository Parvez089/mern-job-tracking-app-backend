import express from "express"
import { login, register } from "../controller/userController.js";
const router = express.Router();

router.get("/test", (req, res) => res.send("✅ Route is working"));
router.post("/register", register)
router.post("/login", login)

export default router;