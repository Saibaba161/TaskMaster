import { useState } from "react";
import useAuthContext from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state to false
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true); // Set isLoading to true when starting the signup process
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST'
            },
            
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            if (json && json.error) {
                setError(json.error)
            }
            else{
                setError('An error occured while processing your request')
            }
        }

        if(response.ok) {
            // saving the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false)
        }            
    }
    return { signup, isLoading, error };
};