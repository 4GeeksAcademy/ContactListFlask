const initialState = {
    contacts: [],  // Estado inicial  una lista vacía de contactos
    token: localStorage.getItem('token') || null, // Recuperar token desde localStorage
    errorMessage: null 
};

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: initialState,
        actions: {
            // Acción para crear un nuevo contacto y persistirlo en la API
            addContact: async (newContact) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}` 
                        },
                        body: JSON.stringify(newContact)
                    });

                    if (response.ok) {
                        const contact = await response.json();
                        setStore({ contacts: [...store.contacts, contact] });
                        console.log('Contacto agregado y guardado:', contact);
                    } else {
                        const errorData = await response.json();
                        setStore({ errorMessage: errorData.message });
                        console.error('Error al agregar el contacto:', errorData);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            
            getContacts: async () => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contacts`, {
                        headers: {
                            'Authorization': `Bearer ${store.token}` 
                        }
                    });
                    const data = await response.json();

                    if (response.ok) {
                        setStore({ contacts: data });
                    } else {
                        setStore({ errorMessage: data.message });
                        console.error('Error al obtener los contactos:', data);
                    }
                } catch (error) {
                    console.error('Error al obtener los contactos:', error);
                }
            },

            
            updateContact: async (id, updatedContact) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${store.token}`
                        },
                        body: JSON.stringify(updatedContact)
                    });

                    if (response.ok) {
                        const updatedContacts = store.contacts.map(contact =>
                            contact.id === parseInt(id) ? { ...contact, ...updatedContact } : contact
                        );
                        setStore({ contacts: updatedContacts });
                    } else {
                        const errorData = await response.json();
                        setStore({ errorMessage: errorData.message });
                        console.error('Error al actualizar el contacto:', errorData);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            
            deleteContact: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contacts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${store.token}`
                        }
                    });

                    if (response.ok) {
                        const updatedContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: updatedContacts });
                    } else {
                        const errorData = await response.json();
                        setStore({ errorMessage: errorData.message });
                        console.error('Error al eliminar el contacto:', errorData);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            
            login: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();

                    if (response.ok) {
                        localStorage.setItem('token', data.access_token);
                        setStore({ token: data.access_token });
                        console.log('Inicio de sesión exitoso');
                    } else {
                        setStore({ errorMessage: data.message });
                        console.error('Error en el inicio de sesión:', data);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            // Método para cerrar sesión
            logout: () => {
                localStorage.removeItem('token');
                setStore({ token: null, contacts: [] });
                console.log('Cierre de sesión exitoso');
            }
        }
    };
};

export default getState;
