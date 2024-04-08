import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext()        // Creates the context    

export const authReducer = (state, action) => {   // Reducer Function
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {         // Wraps the entire application and provides a value for the context
    const [state, dispatch] = useReducer( authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, [])

    console.log('AuthContext State: ', state)                  // To keep track of the state

    return (                                                   // Returning a template that wraps our entire application and therefore providing a global state value
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}