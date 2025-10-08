// backend/controller/jobController.js
import Job from "../model/job.js";
import mongoose from "mongoose";

// ✅ Create a new job
export const createJob = async (req, res) => {
    try {
        const { company, position, status, appliedDate, notes } = req.body;

        if (!company || !position || !status || !appliedDate) {
            return res.status(400).json({
                success: false,
                message: "Company, position, status, and applied date are required",
            });
        }

        const newJob = await Job.create({
            company,
            position,
            status: status || "pending",
            appliedDate,
            notes: notes || "",
            createBy: req.userId, // ✅ use req.userId from auth middleware
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job: newJob,
        });
    } catch (error) {
        console.error("Create job error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get a single job by ID
export const getJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid job ID" });
        }

        const job = await Job.findOne({ _id: id, createBy: req.userId });

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, job });
    } catch (error) {
        console.error("Get job error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Get all jobs created by the user
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createBy: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: jobs.length, jobs });
    } catch (error) {
        console.error("Get jobs error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Update a job by ID
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid job ID" });
        }

        const { company, position, status, appliedDate, notes } = req.body;

        const job = await Job.findOneAndUpdate(
            { _id: id, createBy: req.userId }, // ✅ use req.userId
            { company, position, status, appliedDate, notes },
            { new: true, runValidators: true }
        );

        if (!job) {
            return res
                .status(404)
                .json({ success: false, message: "Job not found or not authorized" });
        }

        res.status(200).json({ success: true, message: "Job updated successfully", job });
    } catch (error) {
        console.error("Update job error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// ✅ Delete a job by ID
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid job ID" });
        }

        const deletedJob = await Job.findOneAndDelete({ _id: id, createBy: req.userId });

        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        console.error("Delete job error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
