import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase';

const AddSubject: React.FC<{ onAdd: (subject: string) => void }> = ({ onAdd }) => {
  const [subject, setSubject] = useState<string>('');

  const handleAddSubject = async () => {
    if (subject.trim() === '') return;

    await addDoc(collection(firestore, 'subjects'), { name: subject });
    onAdd(subject);
    setSubject('');
  };

  return (
    <div className="add-subject">
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Add new subject"
      />
      <button onClick={handleAddSubject}>Add Subject</button>
    </div>
  );
};

export default AddSubject;
