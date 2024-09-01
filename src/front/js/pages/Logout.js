import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();



    const handleLogout = () => {

        alert("Gracias por visitarnos, hasta la proxima!");

    
        localStorage.removeItem('token');

        
        navigate('/');
    };

    return (
        <button onClick={handleLogout}>
            Cerrar Sesión
        </button>
    );
};

export default Logout;