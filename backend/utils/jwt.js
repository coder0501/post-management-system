const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" }); // Expiration set to 10 minutes
};

