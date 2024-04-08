import React, { createContext, useReducer } from 'react';

export const NotesContext = createContext();

export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return {
                notes: action.payload
            };
        case 'CREATE_NOTE':
            return {
                notes: [action.payload, ...state.notes]
            };
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((n) => n._id !== action.payload._id)
            };
        case 'UPDATE_NOTE':
            // Find the index of the note to be updated
            return{...state,
                notes: state.notes.map(note => {
                    if(note._id === action.payload._id) {
                    return action.payload;
                    }
                    return note;
                })
            }
        default:
            return state;
    }
};

export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, {
        notes: null
    });

    return (
        <NotesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};