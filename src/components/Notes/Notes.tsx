import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase';
import AddNote from './AddNote';
import NotesList from './NotesList';

interface Note {
  id: string;
  content: string;
  author: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const q = query(collection(firestore, 'notes'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() } as Note);
      });
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="notes-container">
      <AddNote />
      <NotesList notes={notes} />
    </div>
  );
};

export default Notes;
