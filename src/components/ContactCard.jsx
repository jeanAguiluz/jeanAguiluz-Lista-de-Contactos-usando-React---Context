import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
const CardContact = ({ contact }) => {
    const { actions } = useContext(Context);

    const handleDelete = () => {
        actions.deleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex align-items-center justify-content-between px-4 py-3">

            {/* Contact info */}
            <div className="d-flex align-items-center">
                <img
                    src="https://randomuser.me/api/portraits/lego/1.jpg"
                    alt="Contact avatar"
                    className="contact-avatar"
                />

                <div className="ms-3">
                    <h5 className="mb-1">{contact.name}</h5>
                    <p className="mb-0 text-muted">{contact.address}</p>
                    <p className="mb-0 text-muted">{contact.phone}</p>
                    <p className="mb-0 text-muted">{contact.email}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="contact-actions d-flex align-items-center">
                <Link
                    to={`/editContact/${contact.id}`}
                    className="text-decoration-none text-dark me-3"
                    title="Edit contact"
                >
                    <i className="fa fa-pencil"></i>
                </Link>

                <button
                    className="btn btn-link text-dark p-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#delete-contact-${contact.id}`}
                    title="Delete contact"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </div>

            {/* Delete Modal */}
            <div
                className="modal fade"
                id={`delete-contact-${contact.id}`}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete contact</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            Are you sure you want to delete <strong>{contact.name}</strong>?
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CardContact;