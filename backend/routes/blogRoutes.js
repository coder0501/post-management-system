const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getBlogs, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");

const router = express.Router();

router.get("/", authMiddleware, getBlogs);
router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
