import React, { useState } from 'react'
import { useNotesContext } from '../hooks/useNoteContext'
import { useAuthContext } from '../hooks/useAuthContext'

const NoteForm = () => {
    const { dispatch } = useNotesContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [deadline, setDeadline] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in to do this')
            return
        }

        const note = { title, body, deadline };

        const response = await fetch('/api/notes', { mode: 'cors'},
        {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                'Access-Control-Request-Method': 'POST'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setBody('')
            setDeadline('')
            setError(null)
            setEmptyFields([])
            console.log('New note added', json)
            dispatch({ type: 'CREATE_NOTE', payload: json })
        }
    };

    return (
        <div className="card">
            <form className="create" onSubmit={handleSubmit}>
                <h3>Add a new Note</h3>
                <div className="form-group">
                    <label>Title: </label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className={emptyFields.includes('title') ? 'error' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Body: </label>
                    <input
                        type="text"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                        className={emptyFields.includes('body') ? 'error' : ''}
                    />
                </div>
                <div className="form-group">
                    <label>Deadline: </label>
                    <input
                        type="number"
                        onChange={(e) => setDeadline(e.target.value)}
                        value={deadline}
                        className={emptyFields.includes('deadline') ? 'error' : ''}
                    />
                </div>
                <button type="submit">Add Note</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default NoteForm;