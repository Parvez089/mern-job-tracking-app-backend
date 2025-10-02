import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["applied", "interview", "rejected", "offer"],
            required: true,
        },
        appliedDate: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;