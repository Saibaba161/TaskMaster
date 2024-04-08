import useAuthContext from "./useAuthContext"
import { useNotesContext } from "./useNoteContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: notesDispatch } = useNotesContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        notesDispatch({type:'SET_NOTES', payload: null})

        alert("Oops! You are logged out")
    }
    return {logout}
}