import React, { useContext } from 'react';
import { NotesContext } from '../context/noteContext';

export const useNotesContext = () => {
    const context = useContext(NotesContext);

    if (!context) {
        throw new Error('useNotesContext must be inside a NotesContextProvider');
    }

    return context;
};

// This custom hook just consumes the context using the useContext() hook and returns the context.
// We can simply call this function wherever we need to update the context.