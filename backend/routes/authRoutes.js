
const express = require("express");
const { handleSignup, handleLogin, checkAuth, logout } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", logout);

// user is authenticated
router.get("/check", authMiddleware, checkAuth);



module.exports = router;