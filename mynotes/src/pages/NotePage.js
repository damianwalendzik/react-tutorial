import React, {useEffect, useState} from 'react';
// import notes from '../assets/data'
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
const NotePage = () => {
    const navigate = useNavigate();

    const { noteId } = useParams();
    let [note, setNote] = useState(null)

    // let note = notes.find(note => note.id === Number(noteId))
    useEffect(() =>{
        getNote()
    }, [noteId])

    let getNote = async () => {
        if(noteId === 'new') return
        let response = await fetch(`http://localhost:3001/notes/${noteId}`);
        let data = await response.json();
        setNote(data)
    };

    let createNote = async () => {
        try {
            await fetch(`http://localhost:3001/notes/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...note, 'updated':new Date()})
            });
            console.log('Note updated successfully.');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    let updateNote = async () => {
        try {
            await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...note, 'updated':new Date()})
            });
            console.log('Note updated successfully.');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };
    
    let deleteNote = async () => {
        try {
            await fetch(`http://localhost:3001/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({note})
            });
            console.log('Note updated successfully.');
        } catch (error) {
            console.error('Error updating note:', error);
        }
        navigate('/')
    };

    let handleSubmit = () => {

        if(noteId != 'new' && !note.body){
            deleteNote()
        } else if(noteId != 'new'){
            updateNote()
        } else if(noteId === 'new' && note !== null){
            createNote()
        }
        navigate('/')
    }

    return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            {noteId !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
            ) : (
                <button onClick={handleSubmit}>Done</button>

            )}

        </div>
        <textarea onChange={(e) => {setNote({...note, "body": e.target.value})}} value={note?.body}></textarea>
    </div>
    );
    }

export default NotePage;
 