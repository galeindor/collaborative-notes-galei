// src/components/Notes.tsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import NoteItem from './NoteItem';
import './notes.css';
import { Note } from './types';
import AddNote from './AddNote';
import AddSubject from './AddSubject';


const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState<string>('');
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

    // Fetch subjects
    const subjectsQuery = query(collection(firestore, 'subjects'));
    const unsubscribeSubjects = onSnapshot(subjectsQuery, (querySnapshot) => {
      const subjectsData: string[] = [];
      querySnapshot.forEach((doc) => {
        subjectsData.push(doc.id);
      });
      setSubjects(subjectsData);
    });

    return () => {
      unsubscribe();
      unsubscribeSubjects();
    };
  }, []);

  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(firestore, 'notes', id));
  };

  const handleEditNote = async (id: string, newContent: string) => {
    await updateDoc(doc(firestore, 'notes', id), { content: newContent });
  };

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
          <NoteItem
            key={note.id}
            note={note}
            currentUser={user?.uid}
            onDelete={handleDeleteNote}
            onEdit={handleEditNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
