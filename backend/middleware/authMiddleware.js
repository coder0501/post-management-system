
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    console.log("token:", token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized! Token not found" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("middleware error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

