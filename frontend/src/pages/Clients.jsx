import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserTie, FaEnvelope, FaSearch, FaArrowRight, FaBuilding } from 'react-icons/fa';
import Layout from '../components/Layout'; // ✅ Keeps the UI clean and responsive
import toast from 'react-hot-toast';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ⚡ HELPER: Aggergate Client Data (Moved outside useEffect for reuse)
  const processClients = (projects) => {
    const clientMap = {};
    projects.forEach(project => {
        const name = project.client || 'Unknown Client';
        const foundEmail = project.clientEmail; 
        
        if (!clientMap[name]) {
            clientMap[name] = {
                name: name,
                email: foundEmail || 'No Email',
                totalProjects: 0,
                activeProjects: 0,
                totalRevenue: 0,
                latestProject: project.deadline
            };
        }
        
        // Update email if the current one is placeholder but we found a real one
        if (clientMap[name].email === 'No Email' && foundEmail) {
           clientMap[name].email = foundEmail;
        }
        
        clientMap[name].totalProjects += 1;
        clientMap[name].totalRevenue += Number(project.budget) || 0;
        
        if (project.status === 'Running' || project.status === 'active') {
           clientMap[name].activeProjects += 1;
        }
    });
    // Sort by highest revenue
    setClients(Object.values(clientMap).sort((a, b) => b.totalRevenue - a.totalRevenue));
  };

  useEffect(() => {
    const fetchClients = async () => {
      // 🚀 STEP 1: CACHE HIT (Instant Load)
      // Check if we have data in memory from the Dashboard
      const cachedData = sessionStorage.getItem('projectsData');
      if (cachedData) {
        processClients(JSON.parse(cachedData));
        setLoading(false); // Stop spinner immediately
      }

      try {
        // 🚀 STEP 2: FRESH DATA (Background Fetch)
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Save new data to cache and update UI
        sessionStorage.setItem('projectsData', JSON.stringify(res.data)); 
        processClients(res.data);

      } catch (error) {
        // Only show error if we have no cached data to show
        if (!sessionStorage.getItem('projectsData')) {
            toast.error("Could not load client directory.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filter Logic
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ WRAP IN LAYOUT (Fixes Mobile Menu & Sidebar)
  return (
    <Layout title="Client Directory">
      <div className="p-4 md:p-8 pb-24">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Partners</h2>
            <p className="text-gray-500 text-sm mt-1">
              Overview of all clients and their financial contribution.
            </p>
          </div>
          
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- CLIENTS GRID --- */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading Directory...</div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
             <p className="text-gray-400">No clients found. Add a project to see clients here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                
                {/* Color Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 ${client.totalRevenue > 10000 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'}`}></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center text-xl font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight">{client.name}</h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <FaBuilding className="mr-1" /> Client ID: {100 + index}
                      </div>
                    </div>
                  </div>
                  {client.activeProjects > 0 && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Active
                    </span>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Lifetime Value</p>
                    <p className="text-lg font-bold text-gray-800 flex items-center">
                      ₹{client.totalRevenue.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Projects</p>
                    <p className="text-lg font-bold text-gray-800">
                      {client.totalProjects} <span className="text-xs text-gray-400 font-normal">({client.activeProjects} active)</span>
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-2 rounded">
                       <FaEnvelope className="mr-3 text-gray-400" />
                       <span className="truncate">{client.email}</span>
                    </div>
                </div>

                {/* Action */}
                <a 
                  href={`mailto:${client.email}`} 
                  className="flex items-center justify-center w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-blue-600 hover:text-white hover:border-transparent transition-all"
                >
                  Contact Client <FaArrowRight className="ml-2" />
                </a>

              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clients;