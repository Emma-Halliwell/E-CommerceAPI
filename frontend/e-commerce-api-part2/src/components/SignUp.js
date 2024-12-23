import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp () {
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
    };

    //Check if what we typed was logged. 
    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.email || !formData.username || !formData.password) {
            return setErrorMessage("All fields are required.")
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('http://localhost:3001/users/register', {
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
                navigate("/userDetails");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <section>
            <h1 id="signUp-title">Sign Up</h1>
            <form onSubmit={handleSubmit}  className="signUp-form">
                <label for="email" className="signUp-label">
                    Email
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <label for="username" className="signUp-label">
                    Username
                    <div>
                        <input
                            type="text" 
                            id="username" 
                            name="username"
                            placeholder="Username"
                            autoComplete="username"
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <label for="password" className="signUp-label">
                    Password
                    <div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <button type="submit" className="signUp-submit">Sign up</button>
            </form>
        </section>
    );
};