import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';

const Layout = ({ children, title, showBack = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to format title if not provided
  const pageTitle = title || location.pathname.replace('/', '').replace('-', ' ').toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* 🟢 DESKTOP SIDEBAR (Visible on md+) */}
      <div className="hidden md:flex h-screen sticky top-0 overflow-y-auto bg-slate-900 text-white shrink-0">
         <Sidebar /> 
      </div>

      {/* 📱 MOBILE SIDEBAR OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative bg-slate-900 w-64 h-full shadow-xl flex flex-col transform transition-transform duration-300">
            <div className="p-4 flex justify-between items-center border-b border-slate-700">
               <span className="text-white font-bold text-lg">Menu</span>
               <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2 hover:bg-slate-800 rounded">
                 <FaTimes className="text-xl" />
               </button>
            </div>
            <div className="flex-1 overflow-y-auto text-white" onClick={() => setMobileMenuOpen(false)}>
               <Sidebar /> 
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative">
        
        {/* 📱 MOBILE HEADER */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md shrink-0 z-10">
           <div className="flex items-center">
             <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2 rounded hover:bg-slate-800 mr-3">
                <FaBars className="text-xl" />
             </button>
             <h1 className="font-bold text-lg truncate">{pageTitle}</h1>
           </div>
           {showBack && (
             <button onClick={() => navigate(-1)} className="text-sm bg-slate-800 px-3 py-1 rounded border border-slate-700">
               Back
             </button>
           )}
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
           {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;