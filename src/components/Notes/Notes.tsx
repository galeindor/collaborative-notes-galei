// src/components/Notes.tsx
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './notes.css';
import { Note } from './types';
import AddNote from './AddNote';
import AddSubject from './AddSubject';
import NoteCard from './NoteCard';
import SubjectSelector from './SubjectSelector';


const Notes: React.FC = () => {
  const [ notes, setNotes ] = useState<Note[]>( [] );
  const [ selectedSubject, setSelectedSubject ] = useState<string>( '' );
  const [ filteredNotes, setFilteredNotes ] = useState<Note[]>( [] );
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(firestore, 'notes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes( notesData );
      setFilteredNotes( notesData );
    });

    return () => {
      unsubscribe();
    };
  }, [] );
  
  const filterNotesBySubject = ( subject: string ) =>
  {
    setSelectedSubject( subject );
    if ( !subject )
    {
      setFilteredNotes( notes );
      return;
    }
    console.log( subject, notes );
    setFilteredNotes(notes.filter( note => note.subject === subject ));
  }

  return (
    <div className="notes-container">
      {user && (
        <div className="add-note-subject-container">
          <AddNote />
          <AddSubject onAdd={() => {}} />
        </div>
      )}
        <SubjectSelector subject={selectedSubject} onSelect={filterNotesBySubject} />
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
