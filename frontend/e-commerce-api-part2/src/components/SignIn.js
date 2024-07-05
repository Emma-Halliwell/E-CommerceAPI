import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            //console.log(res);
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message)
            } else {
                setLoading(false)
            }
            if (res.ok) {
                navigate("/profile");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    }; 
    
    return (
        <section>
            <h1 id="signIn-title">Sign In</h1>
            <form onSubmit={handleSubmit} className="signIn-form">
                <label for="signIn-username" className="signIn-label">
                    Username
                    <div>
                        <input 
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </label>
                <label for="signIn-password" className="signIn-label">
                    Password
                    <div>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </label>
                <button type="submit" className="signIn-submit">Login</button>
            </form>
        </section>
    );
};