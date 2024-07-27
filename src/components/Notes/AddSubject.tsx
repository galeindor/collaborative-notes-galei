import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { firestore } from '../../firebase';

interface AddSubjectProps {
  subjects: string[];
}

const AddSubject: React.FC<AddSubjectProps> = ({ subjects }) => {
  const [newSubject, setNewSubject] = useState<string>('');

  const handleAddSubject = async () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setNewSubject( '' );
      await addDoc(collection(firestore, 'subjects'), { name: newSubject });
      onAdd(newSubject);
      setNewSubject('');
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 p-4 bg-gray-800 rounded-md shadow-md">
      <input
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="New subject"
        className="w-full p-2 bg-gray-700 text-white rounded-md"
      />
      <button onClick={handleAddSubject} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-400">
        Add Subject
      </button>
    </div>
  );
};

export default AddSubject;
function onAdd ( newSubject: string )
{
  throw new Error( 'Function not implemented.' );
}

