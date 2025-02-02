const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS options
const corsOptions = {
    origin: "http://localhost:5173", //  frontend's origin
    credentials: true, //  cookies and credentials
};


app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "Files" directory
app.use("/Files", express.static(path.join(__dirname, "Files")));

// Routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);


// Database Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB."))
    .catch((error) => console.error("Connection Failed->", error));

//  Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
