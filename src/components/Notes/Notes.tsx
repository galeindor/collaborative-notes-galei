import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AddSubject from './AddSubject';
import { Note } from './types';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
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
        subjectsData.push(doc.data().name);
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
    await setDoc(doc(firestore, 'notes', id), { content: newContent }, { merge: true });
  };

  return (
    <div className="p-4">
      { user && <div className="flex gap-4 mb-4">
        <AddNote subjects={subjects} />
        <AddSubject subjects={subjects} />
      </div>}
      <div className="space-y-4">
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
