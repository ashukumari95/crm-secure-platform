import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // Don't show if not logged in (optional)

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/settings`, config);
        setNumber(res.data.whatsappNumber);
      } catch (err) {
        console.error("Could not fetch WA number");
      }
    };
    fetchNumber();
  }, []);

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center"
      title="Chat with Support"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
};

export default WhatsAppButton;