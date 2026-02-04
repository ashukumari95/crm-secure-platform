import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050912] flex items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      
      {/* Background Glitch Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-lg">
        <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 animate-pulse"></div>
            <FaExclamationTriangle className="text-9xl text-blue-500 relative z-10 mx-auto" />
        </div>
        
        <h1 className="text-8xl font-bold text-white mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-slate-400 mb-6 uppercase tracking-widest">Signal Lost</h2>
        
        <p className="text-slate-500 mb-10 leading-relaxed">
          The requested node could not be located in the secure sector. 
          It may have been encrypted, moved, or deleted by an administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center px-8 py-3 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-all font-mono text-sm"
          >
            <FaArrowLeft className="mr-2" /> GO BACK
          </button>

          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all font-mono text-sm font-bold"
          >
            <FaHome className="mr-2" /> RETURN HOME
          </button>
        </div>
      </div>
      
      {/* Footer ID */}
      <div className="absolute bottom-8 text-slate-700 font-mono text-xs">
        ERR_CODE: 0x404_NOT_FOUND
      </div>
    </div>
  );
};

export default NotFound;