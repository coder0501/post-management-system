const User = require("../models/User")
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt")

exports.handleSignup = async (req, res) => {
    try {

        console.log("Inside handleSignup");
        const {
            username,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(200).json({ message: "User Created Successfully", newUser })
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({ message: "Internal Server Error", error })
    }
};

exports.handleLogin = async (req, res) => {
    try {
        console.log("Inside handleLogin");
        const {
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }

        console.log(password, existingUser.password);
        if (!(await bcrypt.compare(password, existingUser.password))) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = generateToken({ id: existingUser.id, role: "Admin" });

        // Send token as HTTP-only cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: false,   // Use true in production if using HTTPS
        //     sameSite: "strict",
        //     maxAge: 3600000, // 1 hour
        // }).status(200).json({ message: "Logged in successfully" });
        res.cookie('token', token, { httpOnly: true, secure: false, path: '/', sameSite: 'Lax', maxAge: 3600000 });

        return res.status(200).json({ message: "Login Successfull" })
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};

exports.checkAuth = (req, res) => {
    try {
        // If the middleware passes, the user is authenticated
        res.status(200).json({ message: "User is authenticated", user: req.user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

