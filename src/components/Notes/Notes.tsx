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


const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(firestore, 'notes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(notesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="notes-container">
      {user && (
        <div className="add-note-subject-container">
          <AddNote />
          <AddSubject onAdd={() => {}} />
        </div>
      )}
      <div className="notes-list">
        {notes.map((note) => (
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
