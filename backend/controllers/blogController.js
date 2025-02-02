const Blog = require("../models/Blogs");
const { fileUpload } = require("../services/fileUpload");
const generateSlug = require("../utils/generateSlug");

// Fetch all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    fileUpload(req, res, async (err) => {
        if (err) {
            console.log("err:", err);
            return res.status(400).json({ message: err });
        } else {
            if (req.file == undefined) {
                return res.status(400).json({ message: 'No file selected' });
            } else {
                const { title, category, description, status } = req.body;
                console.log("req.file: ", req.file);

                if (!title || !category) {
                    return res.status(400).json({ message: "Title and category are required" });
                }

                try {
                    const slug = generateSlug(title);

                    // Create a public file URL (assuming Express serves `Files` as static)
                    const fileUrl = `${req.protocol}://${req.get("host")}/Files/${req.file.filename}`;

                    const newBlog = new Blog({ title, category, description, status, slug, file: fileUrl });
                    await newBlog.save();
                    res.status(201).json(newBlog);
                } catch (error) {
                    res.status(500).json({ message: "Error creating blog" });
                }
            }
        }
    })
};

// Update an existing blog
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, category, description, status } = req.body;

    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        blog.title = title || blog.title;
        blog.category = category || blog.category;
        blog.description = description || blog.description;
        blog.status = status || blog.status;
        blog.slug = generateSlug(title || blog.title);

        await blog.save();
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog" });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog" });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };