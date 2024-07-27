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

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-md shadow-md">
      {isEditing ? (
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 bg-gray-700 text-white rounded-md"
          rows={1}
          autoFocus
        />
      ) : (
        <p className="text-white">{note.content}</p>
      )}
      <div className="flex items-center space-x-2">
        {note.author === currentUser && (
          <>
            <button
              className="text-blue-500 hover:text-blue-400"
              onClick={() => setIsEditing(true)}
            >
              <AiOutlineEdit />
            </button>
            <button
              className="text-red-500 hover:text-red-400"
              onClick={() => onDelete(note.id)}
            >
              <AiOutlineClose />
            </button>
          </>
        )}
      </div>
      <p className="text-gray-400">{note.subject}</p>
    </div>
  );
};

export default NoteItem;
