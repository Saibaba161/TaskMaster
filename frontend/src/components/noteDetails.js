import  { React, useState } from 'react'
import { useNotesContext } from '../hooks/useNoteContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext';

const NoteDetails = ({ note }) => {
    const { dispatch } = useNotesContext()
    const [editNote, setEditNote] = useState(null)
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateBody, setUpdateBody] = useState('')
    const [updateDeadline, setUpdateDeadline] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { user } = useAuthContext()

    const handleEditNote = () => {
        setEditNote(note)
        setUpdateTitle(note.title)
        setUpdateBody(note.body)
        setUpdateDeadline(note.deadline)

        if(!user) {
            return
        }
        
    }

    const handleCloseEdit = () => {
        setEditNote(null)
        setErrorMessage('')
    }

    const handleSubmitEdit = async () => {
        const updatedNote = {
            ...editNote,
            title: updateTitle,
            body: updateBody,
            deadline: updateDeadline,
        }

        const response = await fetch('/api/notes/' + note._id, {
            method: 'PATCH',
            body: JSON.stringify(updatedNote),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Request-Method': 'PATCH'
            },
        })
        
        if (response.ok) {
            const json = await response.json()
            dispatch({ type: 'UPDATE_NOTE', payload: json })
            setEditNote(null)
            setErrorMessage('')
        }
        else{
            console.log('Failed to update Note')
            setErrorMessage('Failed to update note. Please try again')
        }
    }

    const handleClick = async () => {
        
        if(!user) {
            return
        }

        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Request-Method': 'DELETE'
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json })
        } else {
            console.log('Error deleting note')
        }
    }

    return (
        <div className="note-details">
            <h4>{note.title}</h4>
            <p>{note.body}</p>
            <p><strong>Deadline: </strong> {note.deadline}</p>
            <p><strong>Created At: </strong> {note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : 'N/A'}</p>
            <div className="buttons-container">
                <button className="material-symbols-outlined" onClick={handleClick}> delete </button>
                <span className="material-symbols-outlined" onClick={handleEditNote}> Update </span>
            </div>
            
            {/* Edit window */}
            {editNote && (
    <div className="edit-window">
        <h3>Edit Note</h3>
        <label>Title:</label>
        <input
            type="text"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <label>Body:</label>
        <input
            type="text"
            value={updateBody}
            onChange={(e) => setUpdateBody(e.target.value)}
        />
        <label>Deadline:</label>
        <input
            type="number"
            value={updateDeadline}
            onChange={(e) => setUpdateDeadline(e.target.value)}
        />
        {' '}
        <div className='button-container'>
            <span className="submit" onClick={handleSubmitEdit}>Submit</span>
            <button className="cancel" onClick={handleCloseEdit}>Cancel</button>
        </div>
    </div>
    )}
        </div>
    )
}

export default NoteDetails