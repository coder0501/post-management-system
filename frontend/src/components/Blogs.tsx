import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Table, Form, Container, Card, Modal } from "react-bootstrap";

// Blog and form data types
interface Blog {
    _id: string;
    title: string;
    category: string;
    description: string;
    createdAt: string;
    status: string;
    slug: string;
    file: string;
}

// Static categories array
const CATEGORIES = ["Tech", "Health", "Lifestyle"];

const Blogs: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        status: "Pending",
        file: null as File | null
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        checkAuthentication();
        fetchBlogs();
    }, []);

    // I'm checking authenticated user
    const checkAuthentication = async () => {
        try {
            await axios.get("http://localhost:5000/auth/check", {
                withCredentials: true,
            });
        } catch (error) {
            console.error("Authentication failed, redirecting to login.");
            navigate("/login");
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/blogs", {
                withCredentials: true,
            });
            console.log("response file:", response.data.file);
            setBlogs(response.data);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            file: file,
        }));
    };

    //  create/update blog
    const handleCreateOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.category) {
            alert("Title and Blog Category are required.");
            return;
        }

        try {
            if (editingId) {
                // Update existing blog
                await axios.put(
                    `http://localhost:5000/blogs/${editingId}`,
                    formData,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "multipart/form-data" },
                    });
            } else {
                // Create new blog
                console.log("formData", formData.file)
                const response = await axios.post("http://localhost:5000/blogs", formData, {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                });

                console.log("response:", response);
            }
            setFormData({ title: "", category: "", description: "", status: "Pending" });
            setEditingId(null);
            setShowModal(false);
            fetchBlogs();
        } catch (error) {
            console.error("Failed to save blog:", error);
        }
    };

    // edit
    const handleEdit = (blog: Blog) => {
        setFormData({
            title: blog.title,
            category: blog.category,
            description: blog.description,
            status: blog.status,
            file: blog.file,
        });
        setEditingId(blog._id);
        setShowModal(true);
    };

    //  delete
    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await axios.delete(`http://localhost:5000/blogs/${id}`, {
                    withCredentials: true,
                });
                fetchBlogs();
            } catch (error) {
                console.error("Failed to delete blog:", error);
            }
        }
    };

    //  logout
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <Container className="my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Blog Management</h1>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Card className="p-4">
                <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
                    {editingId ? "Edit Blog" : "Add New Blog"}
                </Button>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Image Files</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((blog) => (
                            <tr key={blog._id}>
                                <td>{blog.title}</td>
                                <td>{blog.description}</td>
                                <td>{blog.category}</td>
                                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                                <td>{blog.status}</td>
                                <td>
                                    {blog.file && (
                                        <a href={blog.file} download target="_blank" rel="noopener noreferrer">
                                            <p>View</p>
                                            <img src={blog.file} height="100" width="100" alt="file preview" />
                                        </a>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => handleEdit(blog)}
                                        className="me-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDelete(blog._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            {/* Create/Update */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? "Edit Blog" : "Create Blog"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateOrUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter Blog Title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter Description"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            {editingId ? "Update Blog" : "Create Blog"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Blogs;