import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddNote: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [user] = useAuthState(auth);

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

  return (
    <div className="add-note">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;
