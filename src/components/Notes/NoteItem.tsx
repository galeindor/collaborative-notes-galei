import React, { useState } from 'react';
import { AiOutlineEdit, AiOutlineClose } from 'react-icons/ai';

interface NoteItemProps {
  note: {
    id: string;
    content: string;
    author: string;
    subject: string;
  };
  currentUser: string | undefined;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, currentUser, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<string>(note.content);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onEdit(note.id, newContent);
      setIsEditing(false);
    }
  };

  const toggleEditing = () =>
  {
    if ( isEditing )
    {
      onEdit( note.id, newContent)
    }
    setIsEditing( !isEditing )
  }

  return (
    <div className="note-item">
      {isEditing ? (
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="edit-textarea"
          autoFocus
        />
      ) : (
        <p className="note-content">{note.content}</p>
      )}
      <div className="note-actions">
        {note.author === currentUser && (
          <>
            <button className="note-edit-button" onClick={toggleEditing}>
              <AiOutlineEdit />
            </button>
            <button className={`note-delete-button ${isEditing? "edit" : ""}`} onClick={() => onDelete(note.id)}>
              <AiOutlineClose />
            </button>
          </>
        )}
      </div>
      <p className="note-subject">{note.subject}</p>
    </div>
  );
};

export default NoteItem;
