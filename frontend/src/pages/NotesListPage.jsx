import React, { useEffect, useState } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

export default function NotesListPage() {

  const [notes, setNotes] = useState([])

  useEffect(()=>{
    const getNotes = async ()=>{
        // Using await twice for fetch, not axios
        const res = await fetch("/api/notes/")
        const data = await res.json()
        setNotes(data)
        console.log(data)
    }
    getNotes()
  }, [])

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
        <div className="notes-list">
            {notes.map((note, index)=>(
                <ListItem key={index} note={note} />
            ))}
        </div>
        <AddButton />

    </div>
  )
}
