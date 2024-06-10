import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function SignUp () {
    const [formData, setFormData] = useState("");
    // const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});  
    };

    //Check if what we typed was logged. 
    // console.log(formData);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await fetch('/register', {
    //             method: "POST",
    //             headers: {
    //                 "Content-type" : "application/json",
    //             },
    //             body: JSON.stringify(formData),
    //         });
    //         const data = await res.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <section>
            <h1 id="signUp-title">Sign Up</h1>
            <form /*onSubmit={handleSubmit}*/  className="signUp-form">
                <label for="email" className="signUp-label">
                    Email
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
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
                            onChange={handleChange}
                        />
                    </div>
                </label>
                <button type="submit" className="signUp-submit">Sign up</button>
            </form>
        </section>
    );
};