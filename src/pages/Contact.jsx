import { useEffect } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts } from "../store/actions";

const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const { contacts, isLoading, error } = store;

    useEffect(() => {
        getContacts(dispatch);
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="container mt-5 pt-5">
                <div className="alert alert-info text-center">
                    Loading contacts...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 pt-5">
                <div className="alert alert-danger text-center">
                    An error occurred: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 pt-5 pb-5">

            <div className="d-flex justify-content-end mb-4">
                <Link to="/add-contact" className="btn btn-success">
                    Add new contact
                </Link>
            </div>

            {contacts.length > 0 ? (
                <ul className="list-group">
                    {contacts.map(contact => (
                        <ContactCard
                            key={contact.id}
                            data={contact}
                        />
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning text-center">
                    No contacts available. Add one!
                </div>
            )}
        </div>
    );
};

export default Contact;