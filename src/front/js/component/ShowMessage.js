import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

export const ShowMessage = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMessage();  // 
    }, []);

    return (
        <div>
            {store.message ? (
                <p>Mensaje desde el backend: {store.message}</p>
            ) : (
                <p>Cargando mensaje...</p>
            )}
        </div>
    );
};

export default ShowMessage;
