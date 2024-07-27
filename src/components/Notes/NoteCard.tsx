import React, { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Note } from './types';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';
import SubjectSelector from './SubjectSelector';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(note.content);
  const [newSubject, setNewSubject] = useState<string>(note.subject);
  const [user] = useAuthState(auth);

  const handleDeleteNote = async () => {
    await deleteDoc(doc(firestore, 'notes', note.id));
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(event.target.value);
  };

  // const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewSubject(event.target.value);
  // };

  const handleUpdate = async () => {
    if (isEditing) {
      await updateDoc(doc(firestore, 'notes', note.id), {
        content: newContent,
        subject: newSubject,
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleUpdate();
    }
  };

  return (
    <div className="note-item">
      <div className="note-content">
        {isEditing ? (
          <div onKeyDown={handleKeyDown}>
            <textarea
              value={newContent}
              onChange={handleContentChange}
              className="edit-textarea"
              autoFocus
            />
          </div>
        ) : (
          <>
            <p className="note-card-content">{newContent}</p>
          </>
        )}
      </div>
      <div className="note-actions">
        {isEditing ? (
          <SubjectSelector subject={newSubject} onSelect={setNewSubject} allowAll= {false} />
        ) : (
          <p className="note-subject">{newSubject}</p>
        )}
        {note.author === user?.uid && (
          <>
            <button
              className="note-edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              <AiOutlineEdit />
            </button>
            <button
              className="note-delete-button"
              onClick={handleDeleteNote}
            >
              <AiOutlineClose />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
