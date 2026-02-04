import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaUserTie } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050912] flex flex-col items-center justify-center p-4 font-sans text-center">
      
      <h1 className="text-3xl font-bold text-white mb-2">GrowthServices Gateway</h1>
      <p className="text-slate-500 mb-12">Select your secure portal to continue.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        
        {/* Admin Link */}
        <button 
          onClick={() => navigate('/admin-login')}
          className="bg-[#0A0E17] border border-blue-500/30 p-8 rounded-2xl hover:bg-blue-900/10 transition-all group"
        >
          <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <FaUserShield />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Admin Portal</h3>
          <p className="text-slate-500 text-sm">System configuration & analytics.</p>
        </button>

        {/* Employee Link */}
        <button 
          onClick={() => navigate('/employee-login')}
          className="bg-[#0A0E17] border border-green-500/30 p-8 rounded-2xl hover:bg-green-900/10 transition-all group"
        >
          <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-500 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
            <FaUserTie />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Employee Portal</h3>
          <p className="text-slate-500 text-sm">Task tracking & workspace.</p>
        </button>

      </div>

      <button onClick={() => navigate('/')} className="mt-12 text-slate-600 hover:text-white text-sm transition-colors">
        ← Back to Landing Page
      </button>

    </div>
  );
};

export default Login;