import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be inside a AuthContextProvider');
    }

    return context;
};

// This custom hook just consumes the context using the useContext() hook and returns the context.
// If we want to use our AuthContext user value or its state on any component, we will just invoke 
// this custom hook and destructure the user from the context object.

export default useAuthContext