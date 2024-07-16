import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout () {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRemove = async (e) => {
        // e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/logout', {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: e
            })
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
            }

            if (res.ok) {
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <section>
            <button
                id="logout"
                type="button"
                onClick={handleRemove}
            >
                Logout
            </button>
        </section>
    )
}