const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String },
        status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
        slug: { type: String },
        file: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogSchema);
