import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserShield, FaEnvelope, FaLock, FaShieldAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiUrl}/users/login`, formData);
      const user = res.data;

      // 🔍 DEBUG: Check Console (F12) to see exactly what role the server sent
      console.log("SERVER RESPONSE USER:", user);

      // --- 🛡️ FIXED SECURITY CHECK ---
      // 1. Check if 'user.role' exists.
      // 2. Convert to lowercase & trim to match 'admin' regardless of format.
      const role = user.role ? user.role.toLowerCase().trim() : '';
      
      console.log("DETECTED ROLE:", role); // Verify this says "admin"

      if (role !== 'admin') {
        toast.error("ACCESS DENIED: Employee account detected.");
        toast.error("Please use the Staff Portal.");
        setLoading(false);
        return;
      }
      // ------------------------------------

      localStorage.setItem('token', user.token);
      localStorage.setItem('userRole', user.role); 
      localStorage.setItem('userName', user.name);

      toast.success(`Welcome back, Commander ${user.name}`);
      navigate('/dashboard');

    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Invalid Admin Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050912] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
            GROWTH_SERVICES<span className="text-blue-500">_v3</span>
          </h1>
          <p className="text-blue-500/80 text-xs tracking-widest mt-2 uppercase font-bold">Admin Command Root</p>
        </div>

        <div className="bg-[#0A0E17] border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.1)] overflow-hidden backdrop-blur-xl">
          <div className="p-8">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 shadow-lg bg-blue-600/20 text-blue-400 shadow-blue-500/20">
                <FaUserShield />
              </div>
              <h2 className="text-xl font-bold text-white">Root Access</h2>
              <p className="text-slate-500 text-xs mt-1">Enter master credentials to decrypt dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-blue-400 uppercase mb-2 ml-1">Admin Identity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="email" name="email" required placeholder="admin@system.com" onChange={handleChange}
                    className="w-full bg-[#050912] text-white pl-11 pr-4 py-3 rounded-lg border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 font-mono text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-400 uppercase mb-2 ml-1">Master Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input type="password" name="password" required placeholder="••••••••••••" onChange={handleChange}
                    className="w-full bg-[#050912] text-white pl-11 pr-4 py-3 rounded-lg border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 font-mono text-sm" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20">
                {loading ? <span className="animate-pulse">Verifying...</span> : <>Authenticate <FaShieldAlt /></>}
              </button>
            </form>
          </div>
          <div className="bg-blue-900/10 py-3 px-6 border-t border-blue-500/20 flex justify-between items-center text-[10px] font-mono text-blue-400">
             <span>SECURE_CONNECTION</span>
             <span>ADMIN_V1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;