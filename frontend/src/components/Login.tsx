import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface UserDetails {
    email: string,
    password: string
};

const Login: React.FC = () => {

    const [userData, setUserData] = useState<UserDetails>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log("Inside handleLogin")
            const response = await axios.post("http://localhost:5000/auth/login", userData,
                { withCredentials: true } // Include cookies in the request
            );


            console.log("response:", response.data);

            setTimeout(() => {
                navigate("/")
            }, 1000);
        } catch (error) {
            console.log("error:", error)
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header text-center">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                                    <button type="submit" className="btn btn-primary">
                                        Login
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

export default Login;