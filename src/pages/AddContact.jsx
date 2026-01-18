import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { addContact, editContact } from "../store/actions";

const AddContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const { dispatch, store } = useGlobalReducer();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (isEditing) {
            const contactToEdit = store.contacts.find(c => String(c.id) === String(id));
            if (contactToEdit) {
                setFormData({
                    name: contactToEdit.name ?? contactToEdit.full_name ?? "",
                    email: contactToEdit.email ?? "",
                    phone: contactToEdit.phone ?? "",
                    address: contactToEdit.address ?? "",
                });
            }
        }
    }, [isEditing, id, store.contacts]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await editContact(dispatch, id, formData);
        } else {
            await addContact(dispatch, formData);
        }

        navigate("/contacts");
    };

    return (
        <div
            className="d-flex justify-content-center align-items-start"
            style={{ minHeight: "100vh", backgroundColor: "#f7f7f7", paddingTop: "40px" }}
        >
            <div style={{ width: "100%", maxWidth: "420px" }}>

                <i
                    className="fa-solid fa-arrow-left fa-xl mb-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/contacts")}
                ></i>

                <div className="card shadow-sm p-4" style={{ borderRadius: "20px" }}>
                    <h3 className="text-center mb-4 fw-bold">
                        {isEditing ? "Edit contact" : "Add a new contact"}
                    </h3>

                    <div className="text-center mb-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            className="form-control mb-3"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "12px", padding: "10px" }}
                        />

                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "12px", padding: "10px" }}
                        />

                        <label htmlFor="phone" className="form-label fw-semibold">Phone</label>
                        <input
                            id="phone"
                            type="text"
                            name="phone"
                            autoComplete="tel"
                            className="form-control mb-3"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "12px", padding: "10px" }}
                        />

                        <label htmlFor="address" className="form-label fw-semibold">Address</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            autoComplete="street-address"
                            className="form-control mb-4"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={{ borderRadius: "12px", padding: "10px" }}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-bold"
                            disabled={store.isLoading}
                            style={{ borderRadius: "12px", fontSize: "16px" }}
                        >
                            {store.isLoading ? "Saving..." : isEditing ? "Save changes" : "Save Contact"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;