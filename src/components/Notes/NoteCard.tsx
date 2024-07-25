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
    <div className="note-card">
      <div className="note-card-header">
        {note.author === user?.uid && (
          <button className="note-card-delete-button" onClick={() => handleDeleteNote()}>
            <AiOutlineClose />
          </button>
        )}
      </div>
        {isEditing ? (
          <div onKeyDown={handleKeyDown}>
        <textarea
          value={newContent}
          className="edit-textarea"
          autoFocus
            />
            <SubjectSelector subject={newSubject} setSubject={setNewSubject} />
            </div>
        ) : (
            <div>
            <p className="note-card-content" onDoubleClick={() => setIsEditing(true)}>
              {newContent}
                </p>
            <p className="note-card-subject" onDoubleClick={() => setIsEditing(true)}>
                {newSubject}
                  </p>
        </div>
      )}
      {note.author === user?.uid && !isEditing && (
        <button className="note-card-edit-button" onClick={() => setIsEditing(true)}>
          <AiOutlineEdit />
        </button>
      )}
    </div>
  );
};

export default NoteCard;
