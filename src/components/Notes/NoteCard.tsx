import React, { useState } from 'react';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Note } from './types';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [editingContent, setEditingContent] = useState<string>(note.content);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const handleDeleteNote = async () => {
    await deleteDoc(doc(firestore, 'notes', note.id));
  };

  const handleUpdateNote = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (["Enter","Escape"].includes(e.key) && !e.shiftKey && note.id) {
      e.preventDefault();
      await setDoc(doc(firestore, 'notes', note.id), { content: editingContent }, { merge: true });
      setIsEditing(false);
    }
  };

  const handleEditNote = () =>
  {
    if (note.author !== user?.uid) {
      return;
    }
    setIsEditing(true);
  };

  return (
    <div className="note-card" onDoubleClick={handleEditNote}>
      {isEditing ? (
        <textarea
          autoFocus
          onFocus={(e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length)}
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          onKeyDown={handleUpdateNote}
          onBlur={() => setIsEditing(false)}
          className="edit-textarea"
        />
      ) : (
        <p>{note.content}</p>
      )}
      {note.author === user?.uid && (
        <>
          <button className="delete-btn" onClick={handleDeleteNote}>X</button>
        </>
      )}
    </div>
  );
};

export default NoteCard;
