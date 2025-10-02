import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const jwtToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "not authorized - token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "not authorized - user not found",
            });
        }


        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "not authorized - invalid token",
        });
    }
};
