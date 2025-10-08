import express from "express"
import { createJob, deleteJob, getJob, getJobs, updateJob } from "../controller/jobController.js";
import { jwtToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs", jwtToken, createJob);
router.get("/jobs", jwtToken, getJobs);
router.get("/job/:id", jwtToken, getJob);
router.put("/job/:id", jwtToken, updateJob);
router.delete("/job/:id", jwtToken, deleteJob);

export default router;