import { Subject } from "./types";

interface SubjectSelectProps
{
  setSubject: ( subject: string ) => void;
  subject: string;
  subjects: string[];
}

const SubjectSelector = ( { subjects, subject, setSubject } : SubjectSelectProps ) =>
{
  return (
    <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 bg-gray-700 text-white rounded-md">
        <option value="" disabled>Select subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject}>{subject}</option>
        ))}
    </select>
  );
}

export default SubjectSelector;