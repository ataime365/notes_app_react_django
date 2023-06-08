import React from 'react'
import { Link } from 'react-router-dom'


const getTitle = (note)=>{
  // This function takes the note body and splits it by the line break space
  const title = note.body.split('\n')[0]
  if (title.length > 45) {
    return title.slice(0, 45)
  }
  return title
}

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString()
}

const getContent = (note) =>{
  const title = getTitle(note)
  let content = note.body.replaceAll('\n', ' ')
  content = content.replaceAll(title, '')

  if (content.length > 45) {
    return content.slice(0, 45) + '......'  //To let them know there is more content
  } else {
    return content
  }
}

export default function ListItem( {note} ) {
  return (
    <>
    <Link to={`/note/${note.id}`}>
        <div className='notes-list-item'>
          <h3>{ getTitle(note) }</h3>
          <p><span>{ getTime(note) }</span> <span>{ getContent(note) }</span> </p>
          
        </div>
    </Link>
        
    </>
  )
}
