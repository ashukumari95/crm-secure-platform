import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaDownload, FaArrowLeft, FaEnvelope, FaPhone, FaGlobe, FaUniversity, FaPaperPlane } from 'react-icons/fa'; // Added FaPaperPlane
import Sidebar from '../components/Sidebar';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef(); // 📌 Reference for PDF generation
  const [project, setProject] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Random Invoice Details for Demo
  const invoiceDate = new Date().toLocaleDateString('en-GB');
  const dueDate = project ? new Date(project.deadline).toLocaleDateString('en-GB') : '-';
  const invoiceNumber = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const projectRes = await axios.get(`${apiUrl}/projects/${id}`, config);
        const settingsRes = await axios.get(`${apiUrl}/settings`, config);

        setProject(projectRes.data);
        setSettings(settingsRes.data);
      } catch (error) {
        toast.error("Could not load invoice data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 🖨️ PDF DOWNLOAD FUNCTION
  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
        toast.loading("Generating PDF...");
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${project.client || 'Client'}.pdf`);
        toast.dismiss();
        toast.success("Invoice Downloaded!");
    } catch (err) {
        toast.dismiss();
        toast.error("Failed to generate PDF");
        console.error(err);
    }
  };

  // 📧 NEW: SEND EMAIL FUNCTION
  const handleSendEmail = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    // Confirm action
    if (!window.confirm(`Send invoice to ${project.clientEmail}?`)) return;

    try {
        toast.loading("Generating & Sending Email...");

        // 1. Generate PDF Blob
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        const pdfBlob = pdf.output('blob');

        // 2. Prepare Form Data
        const formData = new FormData();
        formData.append('invoice', pdfBlob, `Invoice_${project._id}.pdf`);
        formData.append('clientEmail', project.clientEmail);
        formData.append('clientName', project.client);
        formData.append('invoiceNumber', invoiceNumber);
        formData.append('projectId', project._id); // 🟢 ADD THIS LINE

        // 3. Send to Backend
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        await axios.post(`${apiUrl}/email/send-invoice`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.dismiss();
        toast.success(`Invoice sent to ${project.clientEmail}!`);

    } catch (err) {
        toast.dismiss();
        console.error(err);
        toast.error("Failed to send email.");
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center font-bold text-blue-800">Generating Document...</div>;
  if (!project) return <div className="p-8">Project not found.</div>;

  // Financials
  const subtotal = Number(project.budget) || 0;
  const taxRate = 0.18; // 18% GST
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + taxAmount;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        
        {/* --- Toolbar --- */}
        <div className="max-w-[210mm] mx-auto mb-6 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          
          <div className="flex gap-3">
             {/* 📧 NEW: Send Email Button */}
             <button 
                onClick={handleSendEmail}
                className="flex items-center bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-green-700 transition-all font-bold tracking-wide"
             >
                <FaPaperPlane className="mr-2" /> Send to Client
             </button>

             <button 
                onClick={handleDownloadPdf} 
                className="flex items-center bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-lg hover:bg-blue-800 transition-all font-bold tracking-wide"
             >
                <FaDownload className="mr-2" /> Download PDF
             </button>
          </div>
        </div>

        {/* --- INVOICE A4 SHEET --- */}
        <div ref={invoiceRef} className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl rounded-none md:rounded-xl overflow-hidden relative">
          
          {/* Top Branding Strip */}
          <div className="h-2 bg-blue-700 w-full"></div>

          <div className="p-12">
            
            {/* Header Section */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">INVOICE</h1>
                <p className="text-slate-500 mt-2 font-medium">#{invoiceNumber}</p>
                <div className="mt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date Issued</p>
                    <p className="text-slate-900 font-bold">{invoiceDate}</p>
                </div>
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold text-blue-700">{settings?.companyName || 'GrowthServices Inc.'}</h2>
                <div className="text-sm text-slate-500 mt-2 space-y-1 leading-relaxed">
                   <p>123 Innovation Park, Sector 62</p>
                   <p>Noida, Uttar Pradesh, 201301</p>
                   <p>GSTIN: 09AAACG1234A1Z5</p>
                   <p className="pt-2 font-semibold text-slate-700">{settings?.contactEmail || 'finance@growth.com'}</p>
                   <p>{settings?.whatsappNumber}</p>
                </div>
              </div>
            </div>

            {/* Billing Details Grid */}
            <div className="grid grid-cols-2 gap-12 mb-12 border-t border-b border-gray-100 py-8">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-3">Billed To</span>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{project.client}</h3>
                <p className="text-slate-500 text-sm mb-1">{project.clientEmail || 'client@email.com'}</p>
                <p className="text-slate-400 text-xs mt-2">Client ID: CL-{project._id.slice(-6).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-3">Details</span>
                <div className="space-y-2">
                    <div className="flex justify-end items-center gap-4">
                        <span className="text-sm text-slate-500">Project Type:</span>
                        <span className="font-semibold text-slate-800">{project.projectType || 'Web Development'}</span>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <span className="text-sm text-slate-500">Payment Due:</span>
                        <span className="font-bold text-red-500">{dueDate}</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-12">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <th className="text-left py-4 pl-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Description</th>
                    <th className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</th>
                    <th className="text-right py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rate</th>
                    <th className="text-right py-4 pr-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-6 pl-4">
                      <p className="font-bold text-slate-800 text-lg">{project.name}</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Professional services as per contract. Includes {project.techStack ? project.techStack : 'development'} phase.
                      </p>
                    </td>
                    <td className="py-6 text-center text-slate-600">1</td>
                    <td className="py-6 text-right text-slate-600">₹{subtotal.toLocaleString('en-IN')}</td>
                    <td className="py-6 pr-4 text-right font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</td>
                  </tr>
                  
                  {/* Empty filler rows for visual height if needed */}
                  <tr><td colSpan="4" className="py-8"></td></tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Section: Bank Info & Totals */}
            <div className="flex flex-col md:flex-row gap-12">
                
                {/* Left: Payment Info */}
                <div className="w-full md:w-3/5">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                        <h4 className="flex items-center text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                            <FaUniversity className="mr-2 text-blue-600" /> Bank Details
                        </h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600">
                            <span className="text-slate-400">Bank Name:</span>
                            <span className="font-semibold">HDFC Bank Ltd.</span>
                            
                            <span className="text-slate-400">Account No:</span>
                            <span className="font-mono font-semibold">502000348192</span>
                            
                            <span className="text-slate-400">IFSC Code:</span>
                            <span className="font-mono font-semibold">HDFC0001234</span>
                            
                            <span className="text-slate-400">Branch:</span>
                            <span>Cyber City, Noida</span>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Terms & Conditions</h5>
                        <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
                            <li>Please verify the details before making the transfer.</li>
                            <li>Payment is expected within 7 days of invoice date.</li>
                            <li>Late payments may incur a 2% monthly interest charge.</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Totals & Signature */}
                <div className="w-full md:w-2/5">
                    <div className="space-y-3 pb-6 border-b border-slate-200">
                        <div className="flex justify-between text-slate-500">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                            <span>Tax (GST 18%)</span>
                            <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="text-lg font-bold text-slate-800">Total Due</span>
                        <span className="text-2xl font-bold text-blue-700">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="mt-16 text-right">
                        <div className="inline-block text-center">
                             {/* Placeholder for Signature */}
                            <div className="font-script text-3xl text-slate-400 mb-2 font-cursive" style={{fontFamily: 'cursive'}}>Authorized</div>
                            <div className="h-px w-32 bg-slate-300 mb-2"></div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Authorized Signatory</p>
                        </div>
                    </div>
                </div>
            </div>

          </div>

          {/* Footer Strip */}
          <div className="bg-slate-900 text-white p-4 text-center text-xs flex justify-between px-12">
             <span className="flex items-center gap-2"><FaGlobe /> www.growthservices.com</span>
             <span className="flex items-center gap-2"><FaEnvelope /> support@growthservices.com</span>
             <span className="flex items-center gap-2"><FaPhone /> +91 98765 43210</span>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Invoice;