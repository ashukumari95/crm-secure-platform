import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRocket, FaArrowLeft, FaProjectDiagram, FaDollarSign, FaCalendarAlt, FaUser, FaLink, FaCode } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import toast from 'react-hot-toast';

const CreateProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    clientEmail: '',
    budget: '',
    deadline: '',
    status: 'Pending', // Default
    priority: 'Medium', // Default
    projectType: 'Web Development',
    techStack: '',
    docsLink: '',
    description: '',
    assignedTo: ''
  });

  // Fetch Employees for Dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/users/employees`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(res.data);
      } catch (error) {
        console.error("Could not load employees");
      }
    };
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const res = await axios.post(`${apiUrl}/projects`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Project launched successfully!");
      navigate(`/projects/${res.data._id}`); // Redirect to the new project's detail page
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* 🛡️ FIX: Hide sidebar on mobile (hidden), show on desktop (md:flex) */}
      <div className="hidden md:flex h-screen sticky top-0 overflow-y-auto bg-slate-900 text-white shrink-0">
          <Sidebar />
      </div>

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <DashboardHeader title="Launch New Project" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-5xl mx-auto">
            
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Dashboard
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Banner */}
              <div className="bg-slate-900 text-white px-8 py-6 border-b border-gray-200">
                <h2 className="text-xl font-bold flex items-center">
                  <FaRocket className="mr-3 text-blue-500" /> Project Initiation
                </h2>
                <p className="text-slate-400 text-sm mt-1">Define the scope, budget, and timeline.</p>
              </div>

              <div className="p-8 space-y-8">
                
                {/* Section 1: Core Info */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Client & Scope</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                      <div className="relative">
                        <FaProjectDiagram className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="text" name="name" required placeholder="e.g. E-Commerce Redesign" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Project Type</label>
                      <select name="projectType" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                        <option>Web Development</option>
                        <option>Mobile App</option>
                        <option>Cybersecurity Audit</option>
                        <option>UI/UX Design</option>
                        <option>Cloud Infrastructure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Client Name</label>
                      <input type="text" name="client" required placeholder="Client or Company Name" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Client Email</label>
                      <input type="email" name="clientEmail" placeholder="client@company.com" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Financials & Timeline */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Logistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Budget (₹)</label>
                      <div className="relative">
                        <FaDollarSign className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="number" name="budget" required placeholder="50000" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="date" name="deadline" required onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                      <select name="priority" onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Assignment & Tech */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Execution</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Team Member</label>
                      <div className="relative">
                        <FaUser className="absolute top-3.5 left-3 text-gray-400" />
                        <select name="assignedTo" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none appearance-none bg-white">
                          <option value="">-- Select Employee --</option>
                          {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>{emp.name} ({emp.jobTitle})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tech Stack</label>
                      <div className="relative">
                        <FaCode className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="text" name="techStack" placeholder="React, Node.js, MongoDB..." onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Docs Link */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Documentation / Repo Link</label>
                    <div className="relative">
                        <FaLink className="absolute top-3.5 left-3 text-gray-400" />
                        <input type="url" name="docsLink" placeholder="https://github.com/..." onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" rows="3" placeholder="Brief details about the project..." onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none resize-none"></textarea>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 shadow-md transform active:scale-95 transition-all"
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;