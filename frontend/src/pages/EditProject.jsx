import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaArrowLeft, FaProjectDiagram, FaDollarSign, FaCalendarAlt, FaUser, FaLink, FaCode, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import toast from 'react-hot-toast';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [employees, setEmployees] = useState([]);

  // 🔒 SECURITY FIX: Check Admin Role in BOTH Local and Session Storage
  const [isAdmin] = useState(() => {
    try {
      // 1. Check Local Storage
      let userInfo = localStorage.getItem('userInfo');
      
      // 2. Fallback to Session Storage (This is likely where your data is!)
      if (!userInfo) {
        userInfo = sessionStorage.getItem('userInfo');
      }

      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);
        console.log("Current User Role:", parsedUser.role); 
        // Check for 'admin' (case-insensitive)
        return parsedUser.role && parsedUser.role.toLowerCase() === 'admin';
      }
      return false;
    } catch (error) {
      console.error("Auth Error:", error);
      return false;
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    clientEmail: '',
    budget: '',
    deadline: '',
    status: 'Pending',
    priority: 'Medium',
    projectType: 'Web Development',
    techStack: '',
    docsLink: '',
    description: '',
    assignedTo: ''
  });

  // Fetch Project & Employees on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token from either storage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Get Project Data
        const projectRes = await axios.get(`${apiUrl}/projects/${id}`, config);
        const p = projectRes.data;

        // Format Date for Input (YYYY-MM-DD)
        const dateStr = p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : '';

        setFormData({
          name: p.name || '',
          client: p.client || '',
          clientEmail: p.clientEmail || '',
          budget: p.budget || '',
          deadline: dateStr,
          status: p.status || 'Pending',
          priority: p.priority || 'Medium',
          projectType: p.projectType || 'Web Development',
          techStack: p.techStack || '',
          docsLink: p.docsLink || '',
          description: p.description || '',
          assignedTo: p.assignedTo?._id || p.assignedTo || '' 
        });

        // 2. Get Employee List (Only if Admin)
        if (isAdmin) {
            const empRes = await axios.get(`${apiUrl}/users/employees`, config);
            setEmployees(empRes.data);
        }

      } catch (error) {
        toast.error("Could not load project data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      await axios.put(`${apiUrl}/projects/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      sessionStorage.removeItem('projectsData');
      toast.success("Project updated successfully!");
      navigate(`/projects/${id}`); 
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Helper for Locked Fields
  const LockedLabel = ({ label }) => (
    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        {label} 
        {!isAdmin && <FaLock className="text-gray-400 text-xs" title="Locked for Employees" />}
    </label>
  );

  if (loading) return <div className="flex h-screen items-center justify-center text-blue-900 font-bold">Loading Editor...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Edit Project" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                <FaArrowLeft className="mr-2" /> Cancel & Go Back
              </button>
              <h2 className="text-xl font-bold text-gray-700">Refining Project Details</h2>
            </div>

            {!isAdmin && (
                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center text-yellow-800 text-sm">
                    <FaExclamationTriangle className="mr-2" />
                    <span>You are in <strong>Employee Mode</strong>. Core project details (Budget, Deadline, Assignment) are read-only.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              
              <div className="p-8 space-y-8">
                
                {/* --- Section 1: Locked for Employees --- */}
                <div className={!isAdmin ? "opacity-70 grayscale-[0.5]" : ""}>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Project Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <LockedLabel label="Project Name" />
                      <div className="relative">
                        <FaProjectDiagram className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            disabled={!isAdmin} // 🔒 LOCKED
                            className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50 focus:ring-2 focus:ring-blue-500'}`} 
                        />
                      </div>
                    </div>
                    <div>
                      <LockedLabel label="Project Type" />
                      <select 
                        name="projectType" 
                        value={formData.projectType} 
                        onChange={handleChange} 
                        disabled={!isAdmin} // 🔒 LOCKED
                        className={`w-full px-4 py-3 border border-gray-200 rounded-lg outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'}`}
                      >
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>Cybersecurity Audit</option>
                        <option>UI/UX Design</option>
                        <option>Cloud Infrastructure</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* --- Section 2: Logistics (Mixed Access) --- */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Logistics & Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* 🔓 Status is ALWAYS Editable */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Current Status</label>
                      <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                        <option value="Pending">🕒 Pending</option>
                        <option value="Running">🚀 Running (Active)</option>
                        <option value="Completed">✅ Completed</option>
                        <option value="On Hold">⏸️ On Hold</option>
                      </select>
                    </div>

                    {/* 🔒 Priority Level - Locked */}
                    <div>
                      <LockedLabel label="Priority Level" />
                      <select 
                        name="priority" 
                        value={formData.priority} 
                        onChange={handleChange} 
                        disabled={!isAdmin} // 🔒 LOCKED
                        className={`w-full px-4 py-3 border border-gray-200 rounded-lg outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'}`}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>

                    {/* 🔒 Deadline - Locked */}
                    <div>
                      <LockedLabel label="Deadline" />
                      <div className="relative">
                        <FaCalendarAlt className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                            type="date" 
                            name="deadline" 
                            value={formData.deadline} 
                            onChange={handleChange} 
                            disabled={!isAdmin} // 🔒 LOCKED
                            className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'}`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Section 3: Financials & Assignment (Locked) --- */}
                <div className={!isAdmin ? "opacity-70 grayscale-[0.5]" : ""}>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <LockedLabel label="Budget (₹)" />
                      <div className="relative">
                        <FaDollarSign className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                            type="number" 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleChange} 
                            disabled={!isAdmin} // 🔒 LOCKED
                            className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none ${!isAdmin ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'}`} 
                        />
                      </div>
                    </div>
                    <div>
                      <LockedLabel label="Assigned Team Member" />
                      <div className="relative">
                        <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                        {isAdmin ? (
                            <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none appearance-none">
                            <option value="">-- Unassigned --</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.name} ({emp.jobTitle})</option>
                            ))}
                            </select>
                        ) : (
                            <input 
                                type="text" 
                                value="You (Cannot reassign)" 
                                disabled 
                                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg outline-none cursor-not-allowed text-gray-500" 
                            />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- Section 4: Technical Info (Always Editable) --- */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Technical Info (Editable)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack</label>
                      <div className="relative">
                        <FaCode className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="text" name="techStack" value={formData.techStack} onChange={handleChange} placeholder="e.g. React, Node, MongoDB" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Documentation Link</label>
                      <div className="relative">
                        <FaLink className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="url" name="docsLink" value={formData.docsLink} onChange={handleChange} placeholder="https://github.com/..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex items-center px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 shadow-md transform active:scale-95 transition-all"
                >
                  {saving ? 'Saving...' : <><FaSave className="mr-2" /> Save Updates</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProject;