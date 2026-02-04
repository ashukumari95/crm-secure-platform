import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSave, FaBuilding, FaEnvelope, FaPhone, FaGlobe, FaFileInvoice, FaMapMarkerAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Default State matches Invoice.jsx requirements
  const [settings, setSettings] = useState({
    companyName: '',
    contactEmail: '',
    whatsappNumber: '',
    website: '',
    address: '',
    taxId: '' // GSTIN or VAT ID
  });

  // 1. Fetch Current Settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // If settings exist, populate form
        if (res.data) {
          setSettings({
            companyName: res.data.companyName || '',
            contactEmail: res.data.contactEmail || '',
            whatsappNumber: res.data.whatsappNumber || '',
            website: res.data.website || '',
            address: res.data.address || '',
            taxId: res.data.taxId || ''
          });
        }
      } catch (error) {
        // It's okay if no settings exist yet; we just start blank
        console.log("No settings found, using defaults.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // 2. Handle Changes
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // 3. Save Settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      // We use PUT to update the single settings document
      await axios.put(`${apiUrl}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("System configuration saved!");
    } catch (error) {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center text-blue-800 font-bold">Loading Configuration...</div>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title="Global Configuration" />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-4xl mx-auto">
            
            {/* Intro Card */}
            <div className="bg-blue-900 rounded-2xl p-8 text-white mb-8 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">System Control Center</h2>
                <p className="text-blue-200">
                  Update your agency details here. These values will automatically reflect on all generated Invoices, Client Emails, and the Dashboard footer.
                </p>
              </div>
              {/* Background Decoration */}
              <div className="absolute right-0 bottom-0 opacity-10">
                <FaFileInvoice className="text-9xl" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* --- Identity Section --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center">
                   <FaBuilding className="mr-2" /> Brand Identity
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                    <input 
                      type="text" 
                      name="companyName"
                      placeholder="e.g. GrowthServices Inc."
                      value={settings.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tax ID / GSTIN</label>
                    <input 
                      type="text" 
                      name="taxId"
                      placeholder="e.g. 09AAACG1234A1Z5"
                      value={settings.taxId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Office Address</label>
                    <div className="relative">
                        <FaMapMarkerAlt className="absolute top-3.5 left-3 text-gray-400" />
                        <textarea 
                          name="address"
                          rows="3"
                          placeholder="Full office address for invoices..."
                          value={settings.address}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                        ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Contact Section --- */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center">
                   <FaPhone className="mr-2" /> Contact Channels
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Support Email</label>
                    <div className="relative">
                        <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                          type="email" 
                          name="contactEmail"
                          placeholder="support@agency.com"
                          value={settings.contactEmail}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone / WhatsApp</label>
                    <div className="relative">
                        <FaPhone className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                          type="text" 
                          name="whatsappNumber"
                          placeholder="+91 98765 43210"
                          value={settings.whatsappNumber}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Website URL</label>
                    <div className="relative">
                        <FaGlobe className="absolute top-3.5 left-3 text-gray-400" />
                        <input 
                          type="url" 
                          name="website"
                          placeholder="https://www.agency.com"
                          value={settings.website}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Save Button --- */}
              <div className="md:col-span-2 flex justify-end">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving Config...' : <><FaSave className="mr-2" /> Save Configuration</>}
                </button>
              </div>

            </form>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;