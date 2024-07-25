// src/components/Notes.tsx
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

interface Note {
  id: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');

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

  const addNote = async (e: FormEvent) => {
    e.preventDefault();
    if (newNote.trim() === '') return;
    try {
      const docRef = await addDoc(collection(firestore, 'notes'), {
        content: newNote
      });
      setNewNote('');
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'notes', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  return (
    <div className="notes-container">
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewNote(e.target.value)}
          placeholder="New Note"
        />
        <button type="submit">Add Note</button>
      </form>
      <ul>
        {notes.map(note => (
          <li key={note.id} className="note-card">
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
