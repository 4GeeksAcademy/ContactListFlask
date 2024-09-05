import React, { useState } from 'react';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const BASE_URL = process.env.BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            password
        };

        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                // Almacenar el token en localStorage
                localStorage.setItem('token', data.token);
                console.log('Usuario registrado:', data);
                setSuccess(true);
                setError(null);
            } else {
                console.error('Error en el registro:', data.message);
                setError(data.message);
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Ocurrió un error al registrar el usuario.');
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registrar</button>
            </form>
            {success && <p>Registro exitoso. ¡Bienvenido!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Register;

