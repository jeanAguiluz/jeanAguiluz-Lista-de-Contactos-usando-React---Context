import { Link } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { deleteContact } from "../store/actions";

export function ContactCard({ data }) {

    const contact = data;
    const { dispatch } = useGlobalReducer();

    const modalId = `confirmDeleteModal-${contact.id}`;

    return (

        <div className="card mb-1 shadow-sm" style={{ maxWidth: "600px" }}>
            <div className="row g-0 align-items-center">

                {/* Foto */}
                <div className="col-md-4 text-center py-3">
                    <img
                        src={`https://i.pravatar.cc/150?u=${contact.id}`}
                        className="img-fluid rounded-circle"
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        alt="avatar"
                    />
                </div>

                {/* Información del contacto */}
                <div className="col-md-8">
                    <div className="card-body">

                        <h5 className="card-title mb-3">{contact.name}</h5>

                        <p className="card-text mb-1">
                            <i className="fas fa-envelope me-2"></i>{contact.email}
                        </p>

                        <p className="card-text mb-1">
                            <i className="fas fa-phone me-2"></i>{contact.phone}
                        </p>

                        <p className="card-text mb-3">
                            <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                        </p>

                        {/* Botones */}
                        <div className="d-flex justify-content-end">
                            <Link
                                to={`/edit-contact/${contact.id}`}
                                className="btn btn-outline-primary btn-sm me-2"
                            >
                                <i className="fas fa-edit me-1"></i> Edit
                            </Link>

                            {/* Botón del modal*/}
                            <button
                                className="btn btn-outline-danger btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                            >
                                <i className="fas fa-trash me-1"></i> Delete
                            </button>
                        </div>

                        {/* Modal */}
                        <div className="modal fade" id={modalId} tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h5 className="modal-title">Are you sure?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    <div className="modal-body">
                                        This action will permanently delete the contact.
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            No
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-dismiss="modal"
                                            onClick={() => deleteContact(dispatch, contact.id)}
                                        >
                                            Yes, delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}