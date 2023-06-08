import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom';


export default function NotePage(  ) {

  const { id:noteId } = useParams(); //Getting the params from the url
  const navigate = useNavigate()

  const [note, setNote] = useState({}) //note is a dictionary

  useEffect(()=>{
    const getNote = async ()=>{
        // Using await twice for fetch, not axios
        if (noteId === 'new') return

        const res = await fetch(`/api/notes/${noteId}`)
        const data = await res.json()
        setNote(data)
        console.log(data)
    }
    getNote()
  }, [noteId])

  // This persists the changes in the textarea to the database
  const updateNote = async ()=>{
    const res = await fetch(`/api/notes/${noteId}`, {
      method:"PUT", 
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
    console.log(await res.json()) //This line is not neccessary
  }

  const createNote = async ()=>{
    const res = await fetch(`/api/notes/`, {
      method:"POST", 
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
    console.log(await res.json()) //This line is not neccessary
  }


  const deleteNote = async ()=>{
    const res = await fetch(`/api/notes/${noteId}`, {
      method:"DELETE", 
      headers:{'Content-Type': 'application/json'},
    })
    navigate('/')
    console.log(await res.json()) //This line is not neccessary
  }

  const handleSubmit = ()=>{
    if (noteId !== 'new' && note.body === '' ){ //triggers the delete function when we empty the body
        deleteNote()
    } else if (noteId !== 'new') {
        updateNote()
    } else if (noteId === 'new' && note.body !== null ) {
        createNote()
    }
    navigate('/') //sending the user back to the home page
  }

  const handleChange = (e) =>{
    setNote({...note, 'body': e.target.value }) 
    // setNote(prev => ({ ...prev, 'body': value })) #No need for this
  }
  
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !=='new' ? ( <button onClick={deleteNote}>Delete</button> )
        : ( 
          <button onClick={handleSubmit}>Done</button>
        )}

      </div>
      {/* defaultValue */}
        <textarea onChange={(e)=> { handleChange(e) }}
         value={note?.body}></textarea>
        
    </div>
  )
}
