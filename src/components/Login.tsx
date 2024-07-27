// src/components/Login.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/notes');
    } catch (error) {
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="flex flex-col w-80 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-3 bg-gray-700 text-white rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-3 bg-gray-700 text-white rounded-md"
        />
        <button type="submit" className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-400">Login</button>
      </form>
    </div>
  );
};

export default Login;


//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900">
//       <div className="flex flex-col w-80 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
//         <input
//           type="text"
//           placeholder="Username"
//           className="p-3 bg-gray-700 text-white rounded-md"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="p-3 bg-gray-700 text-white rounded-md"
//         />
//         <button className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-400">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };