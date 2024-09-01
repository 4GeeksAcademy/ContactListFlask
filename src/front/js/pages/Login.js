import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const BASE_URL = process.env.BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Usuario autenticado:', data);
                setSuccess(true);
                setError(null);
            } else {
                console.error('Error en el inicio de sesión:', data.message);
                setError(data.message);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Ocurrió un error al iniciar sesión.');
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {success && <p>Inicio de sesión exitoso.</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Login;