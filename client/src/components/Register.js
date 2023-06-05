import React, { useState } from 'react';

const Register = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        const data = await response.json();

        setIsLoading(false);
        if(!response.ok) {
            setError(data.message);
            return;
        }

        setSuccess(true);
        // Eventually redirect
    };
    
    return (
        <form onSubmit={handleSubmit} className='registerForm'>
            <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='username' />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button type="submit">Register</button>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {success && <p>Registration Successful</p>}
        </form>
    );
};

export default Register;

