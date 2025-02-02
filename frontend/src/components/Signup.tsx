import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface UserDetails {
    username: string,
    email: string,
    password: string
};

const Signup: React.FC = () => {

    const [userData, setUserData] = useState<UserDetails>({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.id]: e.target.value })
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            console.log("Inside handleSignup");
            const response = await axios.post("http://localhost:5000/auth/signup", userData);
            console.log("response:", response.data);

            setTimeout(() => {
                navigate("/login")
            }, 1000);
        } catch (error) {
            console.log("Error:", error)
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header text-center">
                            <h2>Signup</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        <strong>Username</strong>
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <strong>Password</strong>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <p>Already have an account? <Link to="/login">Login</Link></p>
                                    <button type="submit" className="btn btn-primary">
                                        Signup
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;