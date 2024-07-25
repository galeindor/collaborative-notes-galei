// src/components/Notes.tsx
import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Note {
  id: string;
  content: string;
  author: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState<string>('');
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

    return () => unsubscribe();
  }, []);

  const handleAddNote = async () => {
    if (!user) {
      alert('You must be logged in to add a note');
      return;
    }

    await addDoc(collection(firestore, 'notes'), {
      content,
      author: user.uid,
    });

    setContent('');
  };

  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(firestore, 'notes', id));
  };

  return (
    <div className="notes-container">
      {user && (
        <div className="add-note">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
          />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      )}
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <p>{note.content}</p>
            {note.author === user?.uid && (
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;