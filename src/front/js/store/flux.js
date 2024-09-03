const initialState = {
    contacts: []   // estado inicial, que sera con una lista vacia 
};

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: initialState,
        actions: {
            // para crear un nuevo contacto y persistirlo en la API
            addContact: async (newContact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/contacts`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(newContact)
                    });

                    if (response.ok) {
                        const contact = await response.json();
                        const store = getStore();
                        setStore({ contacts: [...store.contacts, contact] });
                        console.log('Contacto agregado y guardado:', contact);
                    } else {
                        console.error('Error al agregar el contacto');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            getMessage: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/message`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();

                    console.log('Mensaje recibido de la API:', data);

                    if (response.ok) {
                        // Haz lo que necesites con el mensaje recibido, como almacenarlo en el store
                        setStore({ message: data.message });
                    } else {
                        console.error('Error al obtener el mensaje', data);
                    }
                } catch (error) {
                    console.error('Error al obtener el mensaje:', error);
                }
            },

            // para actualizar un contacto ya creado en la API
            updateContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(updatedContact)
                    });

                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.map(contact =>
                            contact.id === parseInt(id) ? { ...contact, ...updatedContact } : contact
                        );
                        setStore({ contacts: updatedContacts });
                        console.log('Contacto actualizado:', updatedContact);
                    } else {
                        console.error('Error al actualizar el contacto');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            // para eliminar un contacto tanto en el estado local como en la API
            deleteContact: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/contacts/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: updatedContacts });
                        console.log('Contacto eliminado con id:', id);
                    } else {
                        console.error('Error al eliminar el contacto');
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                }
            },

            // para obtener todos los contactos del usuario autenticado
            getContacts: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/contacts`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();

                    console.log('Datos recibidos de la API:', data);

                    if (response.ok && Array.isArray(data.data)) {
                        setStore({ contacts: data.data });
                    } else {
                        console.error('Error: La respuesta de la API no es un array', data);
                    }
                } catch (error) {
                    console.error('Error al obtener los contactos:', error);
                }
            }
        }
    };
};

export default getState;
