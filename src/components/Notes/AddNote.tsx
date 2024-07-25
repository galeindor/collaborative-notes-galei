import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddNote: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsSnapshot = await getDocs(collection(firestore, 'subjects'));
      const subjectsList = subjectsSnapshot.docs.map((doc) => doc.data().name);
      setSubjects(subjectsList);
    };

    fetchSubjects();
  }, []);

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
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="" disabled>Select subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default AddNote;
