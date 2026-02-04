import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'; 
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { 
  FaProjectDiagram, FaUsers, FaChartLine, 
  FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaWallet, FaBars, FaTimes 
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusData, setStatusData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 👤 NEW: State to store current user info
  const [userInfo, setUserInfo] = useState(null);

  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

  const processData = (data) => {
    setProjects(data);
    setFilteredProjects(data);

    let runningCount = 0, pendingCount = 0, completedCount = 0;
    const clientRevenue = {};

    data.forEach(p => {
      const s = (p.status || '').toLowerCase();
      if (s === 'running' || s === 'active') runningCount++;
      else if (s === 'completed') completedCount++;
      else pendingCount++;

      const client = p.client || 'Unknown';
      const budget = Number(p.budget) || 0;
      if (client !== 'Unknown') { 
         clientRevenue[client] = (clientRevenue[client] || 0) + budget;
      }
    });

    setStatusData([
      { name: 'Running', value: runningCount },
      { name: 'Pending', value: pendingCount },
      { name: 'Completed', value: completedCount },
    ]);

    const rData = Object.keys(clientRevenue).map(key => ({
      name: key.split(' ')[0], 
      revenue: clientRevenue[key]
    })).sort((a, b) => b.revenue - a.revenue).slice(0, 5); 

    setRevenueData(rData);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // 👤 Get User Info from LocalStorage
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) setUserInfo(storedUser);

    if (!token) { navigate('/'); return; }

    const fetchProjects = async () => {
      const cachedData = sessionStorage.getItem('projectsData');
      if (cachedData) {
        processData(JSON.parse(cachedData));
        setLoading(false);
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/projects`, config);
        
        sessionStorage.setItem('projectsData', JSON.stringify(res.data));
        processData(res.data);

      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [navigate]);

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchTerm(text);
    if (text === '') setFilteredProjects(projects);
    else {
      setFilteredProjects(projects.filter(p => 
        (p.name || '').toLowerCase().includes(text.toLowerCase()) || 
        (p.client || '').toLowerCase().includes(text.toLowerCase())
      ));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      toast.promise(
        axios.delete(`${apiUrl}/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        {
          loading: 'Deleting...',
          success: () => {
            const remaining = projects.filter((p) => p._id !== id);
            setProjects(remaining);
            setFilteredProjects(remaining);
            sessionStorage.setItem('projectsData', JSON.stringify(remaining));
            return 'Project deleted successfully!';
          },
          error: 'Could not delete project.',
        }
      );
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-900 font-semibold">
      Loading Dashboard...
    </div>
  );

  // Helper to check if user is admin
  const isAdmin = userInfo?.role === 'admin';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      <div className="hidden md:flex h-screen sticky top-0 overflow-y-auto bg-slate-900 text-white shrink-0">
         <Sidebar /> 
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative bg-slate-900 w-64 h-full shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-slate-700">
               <span className="text-white font-bold text-lg">Menu</span>
               <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2"><FaTimes /></button>
            </div>
            <Sidebar /> 
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
           <button onClick={() => setMobileMenuOpen(true)} className="text-white p-2"><FaBars /></button>
           <h1 className="font-bold">Growth_v3</h1>
           <div className="w-8"></div>
        </div>

        <div className="hidden md:block">
           <DashboardHeader title="Dashboard Overview" />
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8 pb-24">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Operational Metrics</h2>
              <p className="text-gray-500 text-sm mt-1">Real-time data insights.</p>
            </div>
            
            {/* 🔒 FIX: Only Show "New Project" button if Admin */}
            {isAdmin && (
              <button onClick={() => navigate('/create-project')} className="flex items-center bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg shadow-lg">
                <FaPlus className="mr-2" /> New Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4"><FaProjectDiagram className="text-2xl" /></div>
              <div><p className="text-sm text-gray-500 font-medium">Total Projects</p><p className="text-2xl font-bold text-gray-800">{projects.length}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg mr-4"><FaChartLine className="text-2xl" /></div>
              <div><p className="text-sm text-gray-500 font-medium">Active Now</p><p className="text-2xl font-bold text-gray-800">{statusData[0]?.value || 0}</p></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg mr-4"><FaUsers className="text-2xl" /></div>
              <div><p className="text-sm text-gray-500 font-medium">Total Clients</p><p className="text-2xl font-bold text-gray-800">{new Set(projects.map(p => p.client)).size || 0}</p></div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg mr-4"><FaWallet className="text-2xl" /></div>
              <div><p className="text-sm text-gray-500 font-medium">Est. Revenue</p><p className="text-2xl font-bold text-gray-800">₹{projects.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0).toLocaleString('en-IN')}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-6">Top Clients by Revenue</h3>
              <div className="h-64 w-full" style={{ minHeight: '250px' }}>
                <ResponsiveContainer width="100%" height="100%" debounce={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} />
                    <RechartsTooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-6">Project Status Distribution</h3>
              <div style={{ width: '100%', height: '250px' }}>
                {projects.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%" debounce={300}>
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                      <Legend verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">No data available</div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center">
                <FaSearch className="text-gray-400 mr-2" />
                <input type="text" placeholder="Search..." className="bg-transparent outline-none text-sm text-gray-600 w-32 md:w-64" value={searchTerm} onChange={handleSearch} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-3 font-semibold">Project Name</th>
                    <th className="px-6 py-3 font-semibold">Client</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold text-right">Budget</th>
                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{project.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{project.client}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.status==='Completed'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{project.status}</span></td>
                      <td className="px-6 py-4 text-sm text-right">₹{Number(project.budget).toLocaleString('en-IN')}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-3">
                        <button onClick={() => navigate(`/projects/${project._id}`)} className="text-slate-500 hover:text-slate-800 p-2"><FaEye /></button>
                        
                        {/* 🔒 FIX: Allow Edit but restrict Delete to Admins */}
                        <button onClick={() => navigate(`/edit-project/${project._id}`)} className="text-blue-600 hover:text-blue-900 p-2"><FaEdit /></button>
                        
                        {isAdmin && (
                          <button onClick={() => handleDelete(project._id)} className="text-red-600 hover:text-red-900 p-2"><FaTrash /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;