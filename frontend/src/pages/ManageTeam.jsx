import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash, FaUserPlus, FaUserShield, FaUserTie, FaEnvelope, FaPhone, FaBriefcase, FaBuilding } from 'react-icons/fa';
import Layout from '../components/Layout'; // ✅ Import Layout
import toast from 'react-hot-toast';

const ManageTeam = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Team Data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/users/employees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (error) {
        toast.error("Failed to load team data");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will revoke their access immediately.")) return;

    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      await axios.delete(`${apiUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsers(users.filter(user => user._id !== id));
      toast.success("User removed successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // ✅ WRAPPED IN LAYOUT
  return (
    <Layout title="Team Management">
      <div className="p-4 md:p-8 pb-24">
          
          {/* Header Action */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Active Personnel</h2>
              <p className="text-gray-500 text-sm mt-1">Manage access levels and employee records.</p>
            </div>
            <button 
              onClick={() => navigate('/create-employee')}
              className="flex items-center px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 shadow-lg hover:shadow-blue-700/30 transition-all"
            >
              <FaUserPlus className="mr-2" /> Add Member
            </button>
          </div>

          {/* Users Grid */}
          {loading ? (
            <div className="text-center py-20 text-blue-800 font-bold">Scanning Personnel Database...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {users.map((user) => (
                <div key={user._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                  
                  {/* Role Color Strip */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${user.role === 'admin' ? 'bg-purple-600' : 'bg-green-500'}`}></div>

                  {/* Header: Avatar & Delete */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm text-white
                          ${user.role === 'admin' ? 'bg-purple-600' : 'bg-slate-800'}`}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        {/* Role Badge Icon */}
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                           {user.role === 'admin' ? <FaUserShield className="text-purple-600 text-sm" /> : <FaUserTie className="text-green-500 text-sm" />}
                        </div>
                    </div>

                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                      title="Remove User"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">{user.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border
                          ${user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                          {user.role === 'admin' ? 'System Admin' : 'Staff Member'}
                        </span>
                    </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3 border-t border-gray-50 pt-4">
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaBriefcase className="w-5 text-gray-400 mr-2" />
                      <span className="font-medium">{user.jobTitle || 'Role Not Set'}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FaBuilding className="w-5 text-gray-400 mr-2" />
                      <span>{user.department || 'General'}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <FaEnvelope className="w-5 text-gray-400 mr-2" />
                      <span className="truncate">{user.email}</span>
                    </div>

                    {user.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <FaPhone className="w-5 text-gray-400 mr-2" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>

                </div>
              ))}

              {users.length === 0 && (
                 <div className="col-span-full text-center py-20 text-gray-400">
                    No team members found. Click "Add Member" to begin.
                 </div>
              )}

            </div>
          )}
      </div>
    </Layout>
  );
};

export default ManageTeam;