import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';

const DashboardHeader = ({ title }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  // Get Real User Data safely
  const userName = localStorage.getItem('userName') || "Admin";
  const userRole = localStorage.getItem('userRole') || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-200 h-20 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Title Area */}
      <div>
         <h2 className="text-2xl font-bold text-gray-800">{title || "Dashboard"}</h2>
         <p className="text-sm text-gray-500 hidden md:block">Welcome back, here's what's happening today.</p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <FaBell className="text-xl" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-800 leading-none">{userName}</p>
              <p className="text-xs text-gray-500 mt-1 capitalize">{userRole}</p>
            </div>
            <FaChevronDown className="text-gray-400 text-xs ml-1" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in-down">
              <button onClick={() => navigate('/profile')} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <FaUser className="mr-2 text-gray-400" /> My Profile
              </button>
              <div className="my-1 border-t border-gray-100"></div>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay to close menu */}
      {showMenu && <div className="fixed inset-0 z-[-1]" onClick={() => setShowMenu(false)}></div>}
    </div>
  );
};

export default DashboardHeader;