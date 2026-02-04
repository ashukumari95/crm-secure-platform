import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SessionManager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 10 Minutes in milliseconds
    const INACTIVITY_LIMIT = 10 * 60 * 1000; 
    let logoutTimer;

    const logoutUser = () => {
      if (localStorage.getItem('token')) {
        localStorage.clear();
        toast.error("Session timed out due to inactivity");
        navigate('/');
      }
    };

    const resetTimer = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, INACTIVITY_LIMIT);
    };

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [navigate]);

  return null;
};

export default SessionManager;