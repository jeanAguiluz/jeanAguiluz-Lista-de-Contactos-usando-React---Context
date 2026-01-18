// Definir el esstado inicial de la applicación
export const initialStore = {
    // Array para guardar mi lista de contactos
    contacts: [],
    // Varible para manejar la carga de datos
    isLoading: false,
    // Variable para manejar errores
    error: null,
};

// Definir el reductor (storeReducer)
export const storeReducer = (state, action) => {
    switch (action.type) {
        //Inicia o detiene la carga
        case "SET_LOADING":
            return { ...state, isLoading: action.payload };
        //Guardar lista de contactos
        case "SET_CONTACTS":
            return { ...state, contacts: action.payload, isLoading: false };
        //Guardar un mensaje de error
        case "SET_ERROR":
            return { ...state, error: action.payload, isLoading: false };

        //TODO: Añadir funciones de Crear, editar y eliminar

        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload.contactId),
                isLoading: false
            };

        case "ADD_CONTACT_SUCCESS":
            // Agregar el nuevo contacto al principio o al final del array
            return {
                ...state,
                contacts: [action.payload.newContact, ...state.contacts],
                isLoading: false
            };

        case "UPDATE_CONTACT_SUCCESS":
            return {
                ...state,
                contacts: state.contacts.map(c =>
                    c.id === action.payload.id ? action.payload : c
                ),
                isLoading: false
            };

        default:
            return state;
    }
};