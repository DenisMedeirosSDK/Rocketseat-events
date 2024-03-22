
import { ChangeEvent, useState } from 'react'
import Logo from './assets/Logo.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

interface Note {
  id: string
  content: string
  date: Date
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNotesCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }
  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id !== id
    })

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))

  }

  const filteredNotes = search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes
  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={Logo} alt="nlw expert" className='w-28' />
      <form className='w-full'>
        <input
          type="text"
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          placeholder='Busque em suas notas...'
          onChange={handleSearch}
          value={search}
        />
      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px]'>

        <NewNoteCard onNoteCreated={onNotesCreated} />

        {filteredNotes.map(note => {
          return (
            <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
          )
        })}
      </div>
    </div>
  )
}
