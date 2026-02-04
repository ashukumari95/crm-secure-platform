import { useNavigate } from 'react-router-dom';
import { 
  FaUserShield, FaUserTie, FaArrowRight, FaRocket, 
  FaShieldAlt, FaChartLine, FaGlobe, FaCheckCircle, 
  FaServer, FaHeadset, FaFingerprint 
} from 'react-icons/fa';

const SelectRole = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    navigate('/login', { state: { role } });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/50">
               <FaRocket className="text-white text-sm" />
             </div>
             <span className="text-xl font-bold text-white tracking-tight">Growth<span className="text-blue-500">Services</span></span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors">Solutions</button>
            <button onClick={() => scrollToSection('enterprise')} className="hover:text-white transition-colors">Enterprise</button>
          </div>

          <button 
            onClick={() => scrollToSection('portals')}
            className="px-5 py-2.5 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-colors text-sm shadow-md"
          >
            Access Portal
          </button>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            System Operational v2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            The Operating System for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-emerald-400">High-Growth Agencies.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Streamline project management, secure admin workflows, and empower your team with a unified command center designed for scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={() => scrollToSection('portals')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-900/30 flex items-center gap-2 hover:-translate-y-1"
            >
              Launch Workspace <FaArrowRight />
            </button>
            <button 
              onClick={() => scrollToSection('solutions')}
              className="px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white rounded-full font-bold text-lg transition-all border border-slate-700 hover:border-slate-600 backdrop-blur-sm"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </section>

      {/* --- Features Grid (ID: features) --- */}
      <section id="features" className="py-24 bg-slate-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Why GrowthServices?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Built on a modern MERN stack architecture to deliver speed, security, and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-blue-500/30 transition-all hover:bg-slate-900 group">
              <div className="w-14 h-14 bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">RBAC Security</h3>
              <p className="text-slate-400 leading-relaxed">Strict Role-Based Access Control ensures admins and employees only see what they are supposed to see.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-slate-900 group">
              <div className="w-14 h-14 bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 text-2xl group-hover:scale-110 transition-transform">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Analytics</h3>
              <p className="text-slate-400 leading-relaxed">Real-time dashboards provide instant visibility into project status, budgets, and team performance.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-950 border border-white/5 hover:border-purple-500/30 transition-all hover:bg-slate-900 group">
              <div className="w-14 h-14 bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 text-2xl group-hover:scale-110 transition-transform">
                <FaGlobe />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Scale</h3>
              <p className="text-slate-400 leading-relaxed">Cloud-native architecture designed to handle unlimited projects, clients, and team members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Solutions Section (ID: solutions) --- */}
      <section id="solutions" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                Seamless Workflow
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Designed for Modern <br/>
                <span className="text-emerald-400">Project Management.</span>
              </h2>
              <p className="text-lg text-slate-400">
                Stop juggling spreadsheets and emails. Our integrated solution brings your entire agency workflow into one secure platform.
              </p>
              
              <div className="space-y-4">
                {[
                  'Automated Project Assignment',
                  'Secure Client Data Management',
                  'Employee Performance Tracking',
                  'Financial Budgeting & Deadlines'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <FaCheckCircle className="text-xs" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual (Abstract Representation) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur-2xl opacity-20 transform rotate-3"></div>
              <div className="relative bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-xs text-slate-500 ml-auto">System_Status: Online</div>
                </div>
                {/* Mock UI Elements */}
                <div className="space-y-4">
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse"></div>
                  <div className="h-32 bg-slate-800/50 rounded border border-slate-700/50 mt-6 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                      <div className="h-3 bg-emerald-500/20 rounded w-10"></div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 bg-slate-700/50 rounded w-full"></div>
                       <div className="h-2 bg-slate-700/50 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- Enterprise Section (ID: enterprise) --- */}
      <section id="enterprise" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Enterprise-Grade Infrastructure</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors">
               <FaFingerprint className="text-4xl text-blue-500 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-white mb-2">SSO Ready</h3>
               <p className="text-slate-500 text-sm">Integrate with your existing identity providers securely.</p>
             </div>
             <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors">
               <FaServer className="text-4xl text-blue-500 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-white mb-2">99.9% Uptime SLA</h3>
               <p className="text-slate-500 text-sm">Reliability you can trust for mission-critical operations.</p>
             </div>
             <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-colors">
               <FaHeadset className="text-4xl text-blue-500 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-white mb-2">24/7 Dedicated Support</h3>
               <p className="text-slate-500 text-sm">Priority access to our engineering team for custom solutions.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- Portal Selection (ID: portals) --- */}
      <section id="portals" className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Choose Your Access Point</h2>
            <p className="text-slate-400 text-lg">Secure gateway for authorized personnel only.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Admin Card */}
            <div 
              onClick={() => handleSelection('admin')}
              className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-10 cursor-pointer transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors shadow-lg">
                  <FaUserShield className="text-3xl text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Admin Console</h3>
                <p className="text-slate-400 mb-8 h-12">Full system configuration, user management, and financial oversight.</p>
                <div className="flex items-center text-blue-400 font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                  Authenticate <FaArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Employee Card */}
            <div 
              onClick={() => handleSelection('employee')}
              className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-10 cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors shadow-lg">
                  <FaUserTie className="text-3xl text-emerald-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Employee Workspace</h3>
                <p className="text-slate-400 mb-8 h-12">Task tracking, project submissions, and team collaboration tools.</p>
                <div className="flex items-center text-emerald-400 font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                  Enter Workspace <FaArrowRight className="ml-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/5 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 opacity-50 hover:opacity-100 transition-opacity cursor-default">
             <FaRocket />
             <span className="font-bold">GrowthServices</span>
          </div>
          <p className="text-slate-600 text-sm">
            © 2026 Growth Services Inc. • Secure Enterprise Environment
          </p>
          <div className="flex gap-6 mt-4 text-sm text-slate-600">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default SelectRole;