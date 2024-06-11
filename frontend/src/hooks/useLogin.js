import { useState } from "react"
import useAuthContext from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false) // Initialize isLoading state to false
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)                              // Set isLoading to true when starting the login process
        setError(null)

        const response = await fetch('/api/user/login.json', { mode: 'cors'},
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Method': 'POST'
            },
        })
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false)
            setError(error)
        }

        if(response.ok) {
            // saving the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            
            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false)

            alert("Login Success!!")
        }            
    }
    return { login, isLoading, error }
}