import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";

interface SubjectSelectProps {
  setSubject: ( subject: string ) => void;
  subject: string;
}

const SubjectSelector = ( { subject, setSubject } : SubjectSelectProps ) =>
{
  const [subjects, setSubjects] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectsSnapshot = await getDocs(collection(firestore, 'subjects'));
      const subjectsList = subjectsSnapshot.docs.map((doc) => doc.data().name);
      setSubjects(subjectsList);
    };

    fetchSubjects();
  }, []);
  return (
    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="" disabled>Select subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
    </select>
  );
}

export default SubjectSelector;