import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🟢 Import Navigate
import Layout from '../components/Layout';
import { FaHistory, FaCheckCircle, FaEye, FaPaperPlane, FaFilePdf } from 'react-icons/fa';

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 🟢 Hook

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const res = await axios.get(`${apiUrl}/email/logs`, {
           headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center text-blue-900 font-bold">Loading History...</div>;

  return (
    <Layout title="Email History">
      <div className="p-4 md:p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <FaHistory className="text-blue-600" />
                <h2 className="font-bold text-gray-800">Sent Invoices Log</h2>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
                        <tr>
                            <th className="px-6 py-3">Date Sent</th>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Invoice #</th>
                            <th className="px-6 py-3">Sent By</th>
                            <th className="px-6 py-3 text-center">Actions</th> {/* 🟢 New Header */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map(log => (
                            <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">{new Date(log.sentAt).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{log.clientName}</div>
                                    <div className="text-xs text-gray-400">{log.clientEmail}</div>
                                </td>
                                <td className="px-6 py-4 font-mono font-semibold text-blue-600">{log.invoiceNumber}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {log.sentBy?.name?.charAt(0) || 'S'}
                                        </div>
                                        {log.sentBy?.name || 'System'}
                                    </div>
                                </td>
                                
                                {/* 🟢 ACTIONS COLUMN */}
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        {/* View Copy Button */}
                                        <button 
                                            onClick={() => navigate(`/invoice/${log.projectId}`)}
                                            title="View Invoice Copy"
                                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all border border-gray-200"
                                        >
                                            <FaFilePdf />
                                        </button>

                                        {/* Resend Button */}
                                        <button 
                                            onClick={() => navigate(`/invoice/${log.projectId}`)}
                                            title="Resend Invoice"
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-sm hover:shadow-md"
                                        >
                                            <FaPaperPlane className="text-xs" /> Resend
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        {logs.length === 0 && (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400">No emails sent yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailLogs;