import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
            if (contactToEdit) {
                setContact(contactToEdit);
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(contact.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validatePhone(contact.phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        try {
            if (id) {
                await actions.updateContact(id, contact);
            } else {
                await actions.addContact(contact);
            }
            navigate("/contacts");
        } catch (error) {
            console.error("Error while adding/updating contact:", error);
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[0-9\b]+$/;
        return phone.length >= 9 && re.test(phone);
    };

    return (
        <div className="container">
            <h1 className="my-4">{id ? "Edit Contact" : "Add New Contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={contact.full_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={contact.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {id ? "Save Changes" : "Add Contact"}
                </button>
            </form>
        </div>
    );
};

export default AddContact;
