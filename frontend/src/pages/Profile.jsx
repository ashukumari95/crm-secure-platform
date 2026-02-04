import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaSave, FaShieldAlt, FaIdCard, FaCamera } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    _id: ''
  });
  
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  // 1. Fetch Current User Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      // Prepare payload
      const payload = {
        name: user.name,
        email: user.email,
      };

      // Only add password if user typed one
      if (passwords.newPassword) {
        if (passwords.newPassword !== passwords.confirmPassword) {
          toast.error("Passwords do not match!");
          setLoading(false);
          return;
        }
        payload.password = passwords.newPassword;
      }

      const res = await axios.put(`${apiUrl}/users/profile`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local storage if name changed
      localStorage.setItem('userName', res.data.name);
      
      toast.success("Profile updated successfully!");
      setPasswords({ newPassword: '', confirmPassword: '' }); // Clear password fields
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Account Settings" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-4xl mx-auto">
            
            {/* --- Top Banner Card --- */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
               <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-slate-900 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors border-2 border-white">
                    <FaCamera className="text-xs" />
                  </div>
               </div>
               
               <div className="text-center md:text-left flex-1">
                 <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                 <p className="text-gray-500 mb-3">{user.email}</p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-2">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center
                     ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                     <FaShieldAlt className="mr-2" /> {user.role} Account
                   </span>
                   <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-50 text-gray-500 border border-gray-200 flex items-center">
                     <FaIdCard className="mr-2" /> ID: {user._id.slice(-6).toUpperCase()}
                   </span>
                 </div>
               </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* --- Left Column: Personal Info --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center pb-4 border-b border-gray-100">
                  <FaUser className="mr-3 text-blue-600" /> Personal Details
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={user.name}
                      onChange={(e) => setUser({...user, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* --- Right Column: Security --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center pb-4 border-b border-gray-100">
                  <FaLock className="mr-3 text-red-500" /> Security
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Leave blank to keep current"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* --- Save Button --- */}
              <div className="md:col-span-2 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center px-8 py-4 bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving Changes...' : <><FaSave className="mr-2" /> Save Changes</>}
                </button>
              </div>

            </form>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;