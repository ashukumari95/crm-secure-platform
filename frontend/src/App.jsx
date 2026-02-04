import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// --- Pages ---
import Landing from './pages/Landing';
import AdminLogin from './pages/AdminLogin';      // <--- NEW IMPORT
import EmployeeLogin from './pages/EmployeeLogin'; // <--- NEW IMPORT
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import EditProject from './pages/EditProject';
import ProjectDetails from './pages/ProjectDetails';
import Clients from './pages/Clients';
import CreateEmployee from './pages/CreateEmployee';
import NotFound from './pages/NotFound';
import ManageTeam from './pages/ManageTeam';
import AdminSettings from './pages/AdminSettings';
import Profile from './pages/Profile';
import Invoice from './pages/Invoice';
import SocialWidget from './components/SocialWidget';
import EmailLogs from './pages/EmailLogs'; // <--- ADD THIS
import ProjectBoard from './pages/ProjectBoard';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <SocialWidget />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* --- SEPARATE LOGIN ROUTES --- */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/login" element={<EmployeeLogin />} /> {/* Fallback */}
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board" element={<ProjectBoard />} />
        <Route path="/board" element={<ProjectBoard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Routes */}
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/manage-team" element={<ManageTeam />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/email-logs" element={<EmailLogs />} /> {/* <--- ADDED ROUTE HERE */}
        
        <Route path="/invoice/:id" element={<Invoice />} />
        
        {/* CATCH ALL - 404 ROUTE (Must be the last one) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;