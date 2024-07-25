import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SubjectSelector from './SubjectSelector';

const AddNote: React.FC = () => {
  const [ content, setContent ] = useState<string>( '' );
  const [ subject, setSubject ] = useState<string>( '' );
  const [user] = useAuthState(auth);

  const handleAddNote = async () => {
    if (!user) {
      alert('You must be logged in to add a note');
      return;
    }

    await addDoc(collection(firestore, 'notes'), {
      content,
      author: user.uid,
      subject,
    });

    setContent('');
    setSubject('');
  };

  return (
    <div className="add-note">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a note..."
      />
      <SubjectSelector subject={subject} setSubject={setSubject} />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;
