import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout'; // ✅ Import Layout
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase, FaBuilding, FaUserShield } from 'react-icons/fa';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '', 
    phone: '', 
    jobTitle: '', 
    department: '',
    role: 'employee' // Default role
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      await axios.post(`${apiUrl}/users/create`, formData, config);
      toast.success(`User ${formData.name} created successfully!`);
      navigate('/manage-team'); // Redirect to team list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  // ✅ WRAPPED IN LAYOUT (Fixes Responsive Sidebar)
  return (
    <Layout title="Onboard New Member" showBack={true}>
      <div className="flex justify-center p-8 pb-24">
        <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Team Management</h1>
            
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-6 flex items-center">
                <FaUserPlus className="text-white text-3xl mr-4" />
                <div>
                <h2 className="text-xl font-bold text-white">Onboard New Member</h2>
                <p className="text-blue-200 text-sm">Create an account for a new staff member.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">Full Name</label>
                <div className="input-group">
                    <FaUser className="icon" />
                    <input type="text" name="name" onChange={handleChange} required className="input" placeholder="e.g. Sarah Smith" />
                </div>
                </div>

                {/* Email */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">Email Address</label>
                <div className="input-group">
                    <FaEnvelope className="icon" />
                    <input type="email" name="email" onChange={handleChange} required className="input" placeholder="name@company.com" />
                </div>
                </div>

                {/* Job Title */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">Job Title</label>
                <div className="input-group">
                    <FaBriefcase className="icon" />
                    <input type="text" name="jobTitle" onChange={handleChange} className="input" placeholder="e.g. Senior Developer" />
                </div>
                </div>

                {/* Department */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">Department</label>
                <div className="input-group">
                    <FaBuilding className="icon" />
                    <input type="text" name="department" onChange={handleChange} className="input" placeholder="e.g. Engineering" />
                </div>
                </div>

                {/* Phone */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">Phone Number</label>
                <div className="input-group">
                    <FaPhone className="icon" />
                    <input type="text" name="phone" onChange={handleChange} className="input" placeholder="+91 98765..." />
                </div>
                </div>

                {/* Role Selection (NEW) */}
                <div className="col-span-2 md:col-span-1">
                <label className="label">System Role</label>
                <div className="input-group">
                    <FaUserShield className="icon" />
                    <select name="role" onChange={handleChange} className="input bg-white cursor-pointer">
                        <option value="employee">Employee (Standard Access)</option>
                        <option value="admin">Admin (Full Control)</option>
                    </select>
                </div>
                </div>

                {/* Password */}
                <div className="col-span-2">
                <label className="label">Temporary Password</label>
                <div className="input-group">
                    <FaLock className="icon" />
                    <input type="text" name="password" onChange={handleChange} required className="input" placeholder="Create a strong password" />
                </div>
                </div>

                <button type="submit" disabled={loading} className="col-span-2 btn-primary mt-4">
                {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
            </div>
        </div>
      </div>
      
      <style>{`
        .label { display: block; font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem; }
        .input-group { position: relative; }
        .icon { position: absolute; top: 50%; left: 1rem; transform: translateY(-50%); color: #9CA3AF; pointer-events: none; }
        .input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid #E5E7EB; border-radius: 0.5rem; outline: none; transition: all 0.2s; font-size: 0.95rem; }
        .input:focus { border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .btn-primary { width: 100%; background-color: #1D4ED8; color: white; font-weight: 700; padding: 0.875rem; border-radius: 0.5rem; transition: background-color 0.2s; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .btn-primary:hover { background-color: #1E40AF; }
        .btn-primary:disabled { background-color: #93C5FD; cursor: not-allowed; }
      `}</style>
    </Layout>
  );
};

export default CreateEmployee;