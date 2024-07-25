import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase';
import NoteCard from './NoteCard';
import { Note } from './types';

interface NotesListProps {
  notes: Note[];
}
const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsSnapshot = await getDocs(collection(firestore, 'subjects'));
      const subjectsList = subjectsSnapshot.docs.map((doc) => doc.data().name);
      setSubjects(subjectsList);
    };

    fetchSubjects();
  }, []);

  useEffect( () =>
  {
    setFilteredNotes( subjectFilter ? notes.filter(note => note.subject === subjectFilter) : notes);  
  }, [subjectFilter, notes]);

  return (
    <div className="notes-list-container">
      <select className="subject-select" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
        <option value="">All subjects</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
      </select>
      <div className="notes-list">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NotesList;
