import React, { useState } from 'react';

export default function SignIn () {
    const [formData, setFormData] = useState("");

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});  
    };

    // Check if what we typed was logged. 
    // console.log(formData);
    
    return (
        <section>
            <h1 id="signIn-title">Sign In</h1>
            <form className="signIn-form">
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