import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isLoggedIn = !!user;

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-800 bg-opacity-90 backdrop-blur-sm shadow-xl p-4 flex justify-between items-center z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/levels')}>
        <FaCar className="text-white h-8 w-8" />
        <span className="text-white text-xl font-bold">CSS Parking</span>
      </div>

      {/* Navigacija */}
      <div className="flex-1 flex justify-center gap-6">
        {
          <>
            <button
              onClick={() => navigate('/levels')}
              className="bg-transparent hover:bg-blue-600/50 text-white px-4 py-2 rounded-full border-none"
            >
              Igraj
            </button>

            <button
              onClick={() => navigate('/leaderboards')}
              className="bg-transparent hover:bg-blue-600/50 text-white px-4 py-2 rounded-full border-none"
            >
              Leaderboards
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="bg-transparent hover:bg-blue-600/50 text-white px-4 py-2 rounded-full border-none"
                >
                  Admin Dashboard
                </button>

                <button
                  onClick={() => navigate('/admin/level-designer')}
                  className="bg-transparent hover:bg-blue-600/50 text-white px-4 py-2 rounded-full border-none"
                >
                  Level Designer
                </button>
              </>
            )}
          </>
        }
      </div>

      {/* User meni */}
      <div className="relative">
        {isLoggedIn ? (
          <div className="cursor-pointer flex items-center gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <FaUserCircle className="text-white h-10 w-10" />
            <span className="text-white font-medium">{user.name}</span>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-800 px-4 py-2 rounded-full hover:bg-gray-200"
          >
            Login
          </button>
        )}

        {isDropdownOpen && isLoggedIn && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            <button
              onClick={() => { navigate('/settings'); setIsDropdownOpen(false); }}
              className="w-full text-left bg-transparent hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-none border-none"
            >
              Settings
            </button>

            <button
              onClick={() => { logout(); setIsDropdownOpen(false); navigate('/'); }}
              className="w-full text-left bg-transparent hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-none border-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
