import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard.js";
import { Link } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContacts();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4">Contacts</h1>
            <Link to="/add-contact" className="btn btn-success mb-4">Add New Contact</Link>
            <div className="row">
                {store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <ContactCard key={contact.id || index} contact={contact} />
                    ))
                ) : (
                    <p>No contacts available</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
