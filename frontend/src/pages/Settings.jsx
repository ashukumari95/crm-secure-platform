import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// ✅ FIX: Import Layout instead of Sidebar
import Layout from '../components/Layout'; 
import { FaSave, FaBuilding, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGlobe, FaFileInvoice } from 'react-icons/fa';

const Settings = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    whatsappNumber: '',
    address: '',
    gstin: '',
    website: ''
  });

  // Fetch Settings on Load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Populate form if data exists
        if (res.data) setFormData(res.data);
      } catch (error) {
        console.error("Error loading settings");
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/settings', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  // ✅ WRAP IN LAYOUT: This automatically handles the Mobile Sidebar & Menu
  return (
    <Layout title="Global Settings">
      <div className="p-4 md:p-8 pb-24">
        <div className="max-w-4xl mx-auto">
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 text-white px-8 py-6 border-b border-gray-200">
              <h2 className="text-xl font-bold flex items-center">
                <FaBuilding className="mr-3 text-blue-400" /> Company Configuration
              </h2>
              <p className="text-slate-400 text-sm mt-1">These details will appear on your Invoices and Footer.</p>
            </div>

            <div className="p-8 space-y-6">
              
              {/* Branding Section */}
              <div>
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Identity</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <div className="relative">
                         <FaBuilding className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">GSTIN / Tax ID</label>
                      <div className="relative">
                         <FaFileInvoice className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Contact Section */}
              <div>
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Contact Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Official Email</label>
                      <div className="relative">
                         <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp / Phone</label>
                      <div className="relative">
                         <FaWhatsapp className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Location Section */}
              <div>
                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Location & Web</h3>
                 <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Office Address</label>
                      <div className="relative">
                         <FaMapMarkerAlt className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Website URL</label>
                      <div className="relative">
                         <FaGlobe className="absolute top-3.5 left-3 text-gray-400" />
                         <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg outline-none" />
                      </div>
                    </div>
                 </div>
              </div>

            </div>

            <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end">
              <button type="submit" className="flex items-center px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 shadow-md transition-all">
                 <FaSave className="mr-2" /> Save Changes
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;