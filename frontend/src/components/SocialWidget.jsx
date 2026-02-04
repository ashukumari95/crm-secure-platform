import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const SocialWidget = () => {
  const [links, setLinks] = useState({
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        // Fetch social links even if public, but using token if available for protected routes
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        const res = await axios.get(`${apiUrl}/settings`, config);
        
        setLinks({
          whatsapp: res.data.whatsappNumber,
          facebook: res.data.facebookUrl,
          instagram: res.data.instagramUrl,
          twitter: res.data.twitterUrl
        });
      } catch (err) {
        // Silently fail if no settings found or not authorized, to not disturb UI
        console.log("Social widget: No settings loaded");
      }
    };
    fetchSettings();
  }, []);

  // Common styling for all bubbles
  const bubbleClass = "w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg hover:scale-110 transition-transform cursor-pointer mb-3";

  return (
    // FIX: Changed bottom-8 to bottom-24 on mobile so it doesn't cover content
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 flex flex-col items-end z-50">
      
      {/* Twitter (X) */}
      {links.twitter && (
        <a href={links.twitter} target="_blank" rel="noopener noreferrer" className={`${bubbleClass} bg-black`}>
          <FaTwitter className="text-xl" />
        </a>
      )}

      {/* Instagram */}
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noopener noreferrer" className={`${bubbleClass} bg-pink-600`}>
          <FaInstagram className="text-2xl" />
        </a>
      )}

      {/* Facebook */}
      {links.facebook && (
        <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={`${bubbleClass} bg-blue-600`}>
          <FaFacebookF className="text-xl" />
        </a>
      )}

      {/* WhatsApp (Always at bottom) */}
      {links.whatsapp && (
        <a href={`https://wa.me/${links.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${bubbleClass} bg-green-500 w-14 h-14`}>
          <FaWhatsapp className="text-3xl" />
        </a>
      )}
    </div>
  );
};

export default SocialWidget;