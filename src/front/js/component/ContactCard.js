import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Modal from "../component/Modal";


const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)



    const handleEdit = () => {
        navigate(`/edit-contact/${contact.id}`);
    };



    const handleDelete = () => {
        actions.deleteContact(contact.id);
        setShowModal(false);

    };

    return (
        <>
            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{contact.full_name}</h5>
                    <p className="card-text">
                        <strong>Email:</strong> {contact.email}<br />
                        <strong>Phone:</strong> {contact.phone}<br />
                        <strong>Address:</strong> {contact.address}
                    </p>
                    <button className="btn btn-primary mr-2" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={() => setShowModal(true)}>Delete</button>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title="Delete Contact"
                body={`Estas seguro que quieres eliminarlo ${contact.full_name}?`}
            />
        </>
    );
};

export default ContactCard;