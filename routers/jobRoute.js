import express from "express"
import { createJob, deleteJob, getJobs, updateJob } from "../controller/jobController.js";
import { jwtToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs", jwtToken, createJob);
router.get("/jobs", jwtToken, getJobs);
router.put("/jobs/:id", jwtToken, updateJob);
router.delete("/jobs/:id", jwtToken, deleteJob);

export default router;