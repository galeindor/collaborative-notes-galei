import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";

interface SubjectSelectProps {
  onSelect: ( subject: string ) => void;
  allowAll?: boolean;
  subject: string;
}

const SubjectSelector: React.FC<SubjectSelectProps> = ({ subject, onSelect, allowAll = true}) =>
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
    <select value={subject} onChange={(e) => onSelect(e.target.value)}>
      {allowAll && <option value="">All subjects</option>}
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
    </select>
  );
}

export default SubjectSelector;