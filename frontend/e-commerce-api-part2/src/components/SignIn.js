import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn () {
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});  
    };

    const handleSubmit = async (e) => {
        if (!formData.username || formData.password) {
            setErrorMessage('All fields are required.');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
            }
            setLoading(false);

            if (res.ok) {
                navigate("/profile");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    // Check if what we typed was logged. 
    // console.log(formData);
    
    return (
        <section>
            <h1 id="signIn-title">Sign In</h1>
            <form onSubmit={handleSubmit} className="signIn-form">
                <label for="username" className="signIn-label">
                    Username
                    <div>
                        <input 
                        type="text"
                        id="signIn-username"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleChange}
                        />
                    </div>
                </label>
                <label for="password" className="signIn-label">
                    Password
                    <div>
                        <input 
                            type="password"
                            id="signIn-password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <button type="submit" className="signIn-submit">Login</button>
            </form>
        </section>
    );
};