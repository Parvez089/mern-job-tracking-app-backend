import Job from "../model/job.js";

export const createJob = async (req, res) => {
    try {
        const { company, position, status, appliedDate } = req.body;

        if (!company || !position || !status || !appliedDate) {
            return res.status(400).json({ error: "company , position , status and applied date  are required" })
        }

        const newJob = await Job.create({
            company,
            position,
            status: status || "pending",
            appliedDate,
            createBy: req.userId,
        });

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job: newJob,
        })
    } catch (error) {
        console.error("Job creation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createBy: req.userId }).sort({ caratedAt: -1 });;

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs,

        });
    } catch (error) {
        console.error("Get jobs error: ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}


export const updateJob = async (req, res) => {

    try {
        const { id } = req.params;

        const { company, position, status, appliedDate, notes } = req.body;

        const job = await Job.findOneAndUpdate(
            { _id: id, createBy: req.user._id },
            { company, position, status, appliedDate, notes },
            { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found or not authorized" })
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job
        })
    } catch (error) {
        console.error("Update job error: ", error);
        res.status(500).json({ success: false, message: "Server error" })
    }
}


export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, message: "Job deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error })
    }
}