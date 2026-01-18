const SLUG = "jean";
const BASE_URL = `https://playground.4geeks.com/contact/agendas/${SLUG}`;
const CONTACTS_URL = `${BASE_URL}/contacts`;

// Crear la agenda si no existe
const ensureAgendaExists = async () => {
    try {
        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        // 409 = agenda ya existe → ignorar
    } catch (error) {
        console.error("Error creando agenda:", error);
    }
};

export const getContacts = async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
        const response = await fetch(CONTACTS_URL);

        // Si la agenda no existe, crearla
        if (response.status === 404) {
            await ensureAgendaExists();
            return dispatch({ type: "SET_CONTACTS", payload: [] });
        }

        if (!response.ok) {
            throw new Error(`HTTP error al obtener contactos! status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });

    } catch (error) {
        console.error("Failed to fetch contacts:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const addContact = async (dispatch, contactData) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
        const contactToSend = {
            ...contactData,
            agenda_slug: SLUG
        };

        const response = await fetch(CONTACTS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contactToSend)
        });

        if (response.status === 404) {
            await ensureAgendaExists();
            throw new Error("Agenda creada. Intenta guardar de nuevo.");
        }

        if (!response.ok) {
            const text = await response.text();
            console.log("Error del servidor:", text);
            throw new Error(`Error al agregar contacto: ${response.status}`);

        }

        const newContact = await response.json();
        dispatch({ type: "ADD_CONTACT_SUCCESS", payload: { newContact } });

    } catch (error) {
        console.error("Failed to add contact:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const deleteContact = async (dispatch, contactId) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
        const res = await fetch(`${CONTACTS_URL}/${contactId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("No se pudo eliminar el contacto");

        dispatch({ type: "DELETE_CONTACT", payload: { contactId } });

    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const editContact = async (dispatch, contactId, contactData) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
        const res = await fetch(`${CONTACTS_URL}/${contactId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...contactData,
                agenda_slug: SLUG
            })
        });

        if (!res.ok) throw new Error("No se pudo editar el contacto");

        const updated = await res.json();

        dispatch({ type: "UPDATE_CONTACT_SUCCESS", payload: updated });

    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};


