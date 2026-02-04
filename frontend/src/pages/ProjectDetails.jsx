import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaEdit, FaTrash, FaCheckCircle, FaClock, FaRocket, FaFileInvoiceDollar, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import toast from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper for Priority Colors
  const getPriorityColor = (p) => {
    if (p === 'High') return 'bg-red-100 text-red-700 border-red-200';
    if (p === 'Medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProject(res.data);
      } catch (error) {
        toast.error("Project not found");
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${apiUrl}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Project deleted");
      navigate('/dashboard');
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // Status Progress Logic
  const getProgress = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'completed') return 100;
    if (s === 'running' || s === 'active') return 50;
    return 10; // Pending
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50 text-blue-900 font-bold">Loading Mission Control...</div>;
  if (!project) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Project Command Center" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          
          {/* --- TOP HEADER & ACTIONS --- */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 mb-2 transition-colors">
                <FaArrowLeft className="mr-2" /> Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-500 flex items-center mt-1">
                Client: <span className="font-semibold text-gray-700 ml-1">{project.client}</span>
              </p>
            </div>

            <div className="flex gap-3">
              {/* --- FIXED BUTTON IS HERE --- */}
              <button 
                onClick={() => navigate(`/invoice/${project._id}`)} 
                className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 shadow-sm transition-all"
              >
                <FaFileInvoiceDollar className="mr-2" /> Invoice
              </button>
              
              <button 
                onClick={() => navigate(`/edit-project/${project._id}`)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              
              <button 
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-all"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {/* --- STATUS PROGRESS BAR --- */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Current Status</span>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center mt-1 capitalize">
                  {project.status === 'Running' || project.status === 'active' ? <FaRocket className="text-green-500 mr-2" /> : 
                   project.status === 'Completed' ? <FaCheckCircle className="text-blue-500 mr-2" /> : 
                   <FaClock className="text-yellow-500 mr-2" />}
                  {project.status || 'Pending'}
                </h2>
              </div>
              <span className="text-2xl font-bold text-blue-600">{getProgress(project.status)}%</span>
            </div>
            
            {/* The Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${getProgress(project.status)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- LEFT COLUMN: DETAILS --- */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Project Scope</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {project.description || "No description provided for this project."}
                </p>
                
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.priority)}`}>
                    {project.priority || 'Medium'} Priority
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                    {project.projectType || 'Web Development'}
                  </span>
                </div>
              </div>

              {/* Tech Stack Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="block text-sm text-gray-400 font-semibold mb-1">Tech Stack</span>
                    <p className="text-gray-800 font-medium bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 inline-block">
                      {project.techStack || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 font-semibold mb-1">Repository / Docs</span>
                    {project.docsLink ? (
                      <a href={project.docsLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline mt-1 font-medium">
                        <FaExternalLinkAlt className="mr-2" /> Open Resources
                      </a>
                    ) : (
                      <p className="text-gray-400 italic mt-1">No links attached</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: LOGISTICS --- */}
            <div className="space-y-8">
              
              {/* Team Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Assigned Team</h3>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold">
                    {project.assignedTo?.name?.charAt(0) || '?'}
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <p className="text-gray-800 font-bold truncate">{project.assignedTo?.name || "Unassigned"}</p>
                    <p className="text-xs text-blue-600 font-semibold">{project.assignedTo?.email || "No email"}</p>
                  </div>
                </div>
              </div>

              {/* Financial Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Financials</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="text-xl font-bold text-green-600">
                    ₹{Number(project.budget || 0).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Deadline</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                    {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;