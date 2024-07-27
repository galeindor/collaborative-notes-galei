import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar: React.FC = () => {
  const [ user ] = useAuthState( auth );
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut( auth );
    navigate( '/login' );
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
        <Link to="/notes" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Notes</Link>
      </div>
      <div>
        {user ? (
          <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-400 px-3 py-2 rounded-md">
            Logout
          </button>
        ) : (
          <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
