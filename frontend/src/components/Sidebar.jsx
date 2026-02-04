import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaUserPlus, FaCog, FaSignOutAlt, 
  FaUserTie, FaRocket, FaUserCircle 
} from 'react-icons/fa';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { FaColumns } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const role = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border-r-2 border-white" 
      : "text-slate-400 hover:bg-white/5 hover:text-white";
  };

  return (
    <>
      <div className="w-64 bg-[#050912] border-r border-white/5 flex flex-col h-screen flex-shrink-0 font-sans sticky top-0 z-50">
        
        {/* --- Brand Header (Fixed Top) --- */}
        <div className="h-20 flex-shrink-0 flex items-center px-8 border-b border-white/5 bg-[#050912]">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs mr-3 shadow-lg shadow-blue-600/20">OS</div>
          <span className="font-bold text-white tracking-tight text-lg">GROWTH<span className="text-blue-500">_v3</span></span>
        </div>

        {/* --- Navigation Links (Scrollable Middle) --- */}
        {/* 'flex-1' makes it take all available space. 'min-h-0' prevents it from overflowing the parent. */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto sidebar-scroll min-h-0">
          
          <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Main Menu</p>
          
          <Link to="/dashboard" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/dashboard')}`}>
            <FaHome className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/dashboard' ? 'text-white' : 'text-slate-500'}`} /> 
            <span className="truncate">Dashboard</span>
          </Link>

          <Link to="/clients" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/clients')}`}>
            <FaUsers className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/clients' ? 'text-white' : 'text-slate-500'}`} /> 
            <span className="truncate">Clients Directory</span>
          </Link>

          {/* --- ADMIN ONLY SECTION --- */}
          {role === 'admin' && (
            <>
              <div className="my-8 border-t border-white/5 mx-4"></div>
              <p className="px-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 animate-pulse"></span> Admin Controls
              </p>
              
              <Link to="/create-project" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/create-project')}`}>
                <FaRocket className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/create-project' ? 'text-white' : 'text-slate-500'}`} /> 
                <span className="truncate">Launch Project</span>
              </Link>

              <Link to="/create-employee" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/create-employee')}`}>
                <FaUserPlus className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/create-employee' ? 'text-white' : 'text-slate-500'}`} /> 
                <span className="truncate">Add Employee</span>
              </Link>

              <Link to="/manage-team" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/manage-team')}`}>
                <FaUserTie className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/manage-team' ? 'text-white' : 'text-slate-500'}`} /> 
                <span className="truncate">Manage Team</span>
              </Link>

              <Link to="/settings" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/settings')}`}>
                <FaCog className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/settings' ? 'text-white' : 'text-slate-500'}`} /> 
                <span className="truncate">Global Settings</span>
              </Link>
              <Link to="/email-logs" className={`flex items-center px-4 py-3.5 rounded-xl transition-all font-medium text-sm ${isActive('/email-logs')}`}>
    <FaEnvelopeOpenText className={`mr-3 text-lg flex-shrink-0 ${location.pathname === '/email-logs' ? 'text-white' : 'text-slate-500'}`} /> 
    <span className="truncate">Email History</span>
</Link>
            </>
          )}

        </nav>

        {/* --- User Footer (Fixed Bottom) --- */}
        {/* 'bg-[#050912]' ensures content scrolling behind it is hidden properly */}
        <div className="flex-shrink-0 p-4 border-t border-white/5 bg-[#050912] z-20">
          <Link to="/profile" className="flex items-center px-3 py-3 rounded-xl hover:bg-white/5 transition-all mb-2 group">
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold mr-3 border-2 transition-colors
              ${role === 'admin' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden min-w-0">
                <p className="text-xs font-bold text-white truncate group-hover:text-blue-400 transition-colors">{userName}</p>
                <p className="text-[10px] text-slate-500 capitalize flex items-center gap-1 truncate">
                  {role === 'admin' ? <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span> : <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>}
                  {role} Account
                </p>
            </div>
            <FaUserCircle className="text-slate-600 group-hover:text-white transition-colors flex-shrink-0 ml-2" />
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-bold text-xs uppercase tracking-wider border border-red-500/20 hover:border-red-600"
          >
            <FaSignOutAlt className="mr-2" /> Sign Out
          </button>
        </div>

      </div>

      {/* --- INJECTED CSS TO HIDE UGLY SCROLLBAR --- */}
      <style>{`
        .sidebar-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .sidebar-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
    </>
  );
};

export default Sidebar;