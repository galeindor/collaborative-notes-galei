import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase';
import SubjectSelector from './SubjectSelector';

interface AddNoteProps {
  subjects: string[];
}

const AddNote: React.FC<AddNoteProps> = ({ subjects }) => {
  const [content, setContent] = useState<string>('');
  const [selectedSubject, setSelectedSubject ] = useState<string>( '' );
  const [user] = useAuthState(auth);

  const handleAddNote = async () => {
    if (!user) {
      alert('You must be logged in to add a note');
      return;
    }

    await addDoc(collection(firestore, 'notes'), {
      content,
      subject: selectedSubject,
      author: user.uid,
    });
  };


  return (
    <form onSubmit={handleAddNote} className="flex-3 flex flex-col gap-2 p-4 bg-gray-800 rounded-md shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
        className="w-full p-2 bg-gray-700 text-white rounded-md"
        rows={2}
      />
      < SubjectSelector subjects={subjects} subject={selectedSubject} setSubject={setSelectedSubject} />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400">
        Add Note
      </button>
    </form>
  );
};

export default AddNote;
