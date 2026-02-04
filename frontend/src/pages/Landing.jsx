import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserShield, FaUserTie, FaArrowRight, FaTerminal, FaServer, FaDatabase, 
  FaCode, FaNetworkWired, FaFingerprint, FaShieldAlt, FaProjectDiagram, 
  FaFileInvoiceDollar, FaBolt, FaCheckCircle, FaMemory, FaMicrochip 
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Landing = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const fullText = "Initializing Secure Environment...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // --- UPDATED: Direct Routing to Separate Login Pages ---
  const handleRoleSelect = (role) => {
    if (role === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/employee-login');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
        toast("Documentation portal is currently indexed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050912] font-sans text-slate-300 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* --- DYNAMIC BACKGROUND GRID --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050912]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">OS</div>
            <span className="text-lg font-bold text-white tracking-tight font-mono">GROWTH_SERVICES<span className="text-blue-500">_v3</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button onClick={() => scrollToSection('architecture')} className="text-slate-500 hover:text-white cursor-pointer transition-colors uppercase">Docs</button>
            <button onClick={() => scrollToSection('api-section')} className="text-slate-500 hover:text-white cursor-pointer transition-colors uppercase">API</button>
            <button onClick={() => scrollToSection('telemetry')} className="text-slate-500 hover:text-white cursor-pointer transition-colors uppercase">Status</button>
            
            <button 
              onClick={() => toast.success("System is fully operational")}
              className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center gap-2 hover:bg-green-500/20 transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> SYSTEM OPTIMAL
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================================================
          SECTION 1: HERO & COMMAND LINE
      ========================================================================================= */}
      <section className="relative pt-32 pb-24 px-6 z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="font-mono text-blue-500 text-sm mb-2">{'>'} {typedText}<span className="animate-blink">_</span></div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tighter">
              Orchestrate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">Digital Empire.</span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              The definitive operating system for high-growth agencies. Unify your project pipelines, financial ledgers, and team access controls in one encrypted kernel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button 
                onClick={() => scrollToSection('gateway')} 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2 rounded-sm"
              >
                <FaTerminal /> Initialize Session
              </button>
              <button 
                onClick={() => scrollToSection('architecture')}
                className="px-8 py-4 border border-white/10 text-slate-300 font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                <FaCode /> View Documentation
              </button>
            </div>
          </div>

          {/* Right: Abstract UI Visualization */}
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0A0E17] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-[#111623] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-xs font-mono text-slate-500">dashboard_controller.tsx</div>
              </div>
              <div className="p-6 font-mono text-xs md:text-sm space-y-3 leading-relaxed">
                <div className="flex text-slate-500"><span className="w-8 select-none opacity-30">01</span> <span>import &#123; SecureGate &#125; from '@growth/security';</span></div>
                <div className="flex text-slate-500"><span className="w-8 select-none opacity-30">02</span> <span>import &#123; Analytics &#125; from '@growth/charts';</span></div>
                <div className="flex text-slate-500"><span className="w-8 select-none opacity-30">03</span></div>
                <div className="flex text-purple-400"><span className="w-8 select-none opacity-30 text-slate-500">04</span> <span>const Dashboard = async (user) =&gt; &#123;</span></div>
                <div className="flex text-white"><span className="w-8 select-none opacity-30 text-slate-500">05</span> <span className="pl-4">if (!user.isAdmin) return <span className="text-red-400">SecureGate.block()</span>;</span></div>
                <div className="flex text-white"><span className="w-8 select-none opacity-30 text-slate-500">06</span></div>
                <div className="flex text-blue-400"><span className="w-8 select-none opacity-30 text-slate-500">07</span> <span className="pl-4">const revenue = await Analytics.getMRR();</span></div>
                <div className="flex text-blue-400"><span className="w-8 select-none opacity-30 text-slate-500">08</span> <span className="pl-4">const projects = await Analytics.getActive();</span></div>
                <div className="flex text-green-400"><span className="w-8 select-none opacity-30 text-slate-500">09</span> <span className="pl-4">return &lt;AdminPanel data=&#123;revenue&#125; /&gt;;</span></div>
                <div className="flex text-purple-400"><span className="w-8 select-none opacity-30 text-slate-500">10</span> <span>&#125;;</span></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded text-xs font-bold backdrop-blur-md">
                Running Build v2.4
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================================
          SECTION 2: TELEMETRY TICKER (ID: telemetry)
      ========================================================================================= */}
      <div id="telemetry" className="border-y border-white/5 bg-[#080C14] py-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 text-xs font-mono text-slate-500 tracking-widest gap-4">
           <div className="flex items-center gap-2"><FaMemory className="text-blue-500" /> MEM_USAGE: 42%</div>
           <div className="hidden md:flex items-center gap-2"><FaNetworkWired className="text-purple-500" /> ACTIVE_NODES: 14</div>
           <div className="flex items-center gap-2"><FaShieldAlt className="text-green-500" /> ENCRYPTION: AES-256</div>
           <div className="hidden md:flex items-center gap-2"><FaBolt className="text-yellow-500" /> UPTIME: 99.99%</div>
           <div className="flex items-center gap-2"><FaMicrochip className="text-red-500" /> LATENCY: 24ms</div>
        </div>
      </div>

      {/* =========================================================================================
          SECTION 3: CORE MODULES
      ========================================================================================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Module 1: Project Management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
               <div className="absolute inset-0 bg-blue-600/5 rounded-2xl transform rotate-3"></div>
               <div className="relative bg-[#0F1420] border border-white/10 p-8 rounded-2xl hover:border-blue-500/30 transition-colors">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white font-bold flex items-center gap-2"><FaProjectDiagram className="text-blue-500"/> Active Pipelines</h3>
                    <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded">Live</span>
                 </div>
                 <div className="space-y-4">
                   {[1,2,3].map((_,i) => (
                     <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded border border-white/5">
                        <div className={`w-2 h-2 rounded-full ${i===0?'bg-green-500':i===1?'bg-yellow-500':'bg-blue-500'}`}></div>
                        <div className="h-2 w-24 bg-slate-700 rounded"></div>
                        <div className="ml-auto h-2 w-12 bg-slate-700 rounded"></div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <div className="text-blue-500 font-mono text-xs uppercase tracking-widest">Module 01</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Full-Cycle Project Orchestration.</h2>
              <p className="text-slate-400 leading-relaxed">
                Ditch the spreadsheets. Track every deliverable from "Lead" to "Deployed" with granular status updates, deadline enforcements, and client assignment protocols.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-blue-500/50" /> Automated Status Transitions</li>
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-blue-500/50" /> Client-Specific Views</li>
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-blue-500/50" /> Priority Flagging System</li>
              </ul>
            </div>
          </div>

          {/* Module 2: Financials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="text-green-500 font-mono text-xs uppercase tracking-widest">Module 02</div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Financial Intelligence Unit.</h2>
              <p className="text-slate-400 leading-relaxed">
                Real-time revenue tracking embedded directly into your dashboard. Generate invoices, track pending payments, and visualize your agency's MRR growth.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-green-500/50" /> Automated Invoice Generation (PDF)</li>
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-green-500/50" /> Revenue vs. Budget Analytics</li>
                <li className="flex items-center gap-3 text-slate-300"><FaCheckCircle className="text-green-500/50" /> Multi-Currency Support (INR/USD)</li>
              </ul>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-green-600/5 rounded-2xl transform -rotate-3"></div>
               <div className="relative bg-[#0F1420] border border-white/10 p-8 rounded-2xl flex flex-col items-end justify-end h-64 hover:border-green-500/30 transition-colors">
                 <div className="flex items-end gap-4 w-full h-full pb-4 border-b border-white/10">
                    <div className="w-1/4 bg-green-500/20 h-[40%] rounded-t border-t border-x border-green-500/30 relative group">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition">20k</div>
                    </div>
                    <div className="w-1/4 bg-green-500/40 h-[65%] rounded-t border-t border-x border-green-500/50 relative group">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition">45k</div>
                    </div>
                    <div className="w-1/4 bg-green-500/60 h-[50%] rounded-t border-t border-x border-green-500/70 relative group">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition">32k</div>
                    </div>
                    <div className="w-1/4 bg-green-500 h-[85%] rounded-t border-t border-x border-green-500 relative shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
                 </div>
                 <div className="w-full flex justify-between text-xs font-mono text-slate-500 mt-2">
                    <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================================
          SECTION 4: TECH STACK GRID (ID: architecture)
      ========================================================================================= */}
      <section id="architecture" className="py-24 bg-[#0A0E17] border-y border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Enterprise Grade Architecture</h2>
            <p className="text-slate-500">Built on the MERN stack for infinite scalability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Box 1: Backend */}
            <div className="md:col-span-2 bg-[#050912] border border-white/5 p-8 rounded-xl hover:border-blue-500/30 transition-all group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition"><FaServer className="text-8xl text-blue-500" /></div>
               <div className="relative z-10">
                 <FaServer className="text-3xl text-blue-500 mb-4" />
                 <h3 className="text-xl font-bold text-white">Node.js Runtime</h3>
                 <p className="text-sm text-slate-400 mt-2 max-w-sm">
                   Non-blocking I/O operations powered by Express.js middleware. Optimized for high-throughput API requests and real-time data streaming.
                 </p>
               </div>
            </div>

            {/* Box 2: Database */}
            <div className="bg-[#050912] border border-white/5 p-8 rounded-xl hover:border-green-500/30 transition-all">
               <FaDatabase className="text-3xl text-green-500 mb-4" />
               <h3 className="text-lg font-bold text-white">MongoDB</h3>
               <p className="text-xs text-slate-400 mt-2">Flexible NoSQL schemas with automated sharding capabilities.</p>
            </div>

            {/* Box 3: Security */}
            <div className="bg-[#050912] border border-white/5 p-8 rounded-xl hover:border-purple-500/30 transition-all">
               <FaFingerprint className="text-3xl text-purple-500 mb-4" />
               <h3 className="text-lg font-bold text-white">JWT Auth</h3>
               <p className="text-xs text-slate-400 mt-2">Stateless, RSA-signed token authentication sessions.</p>
            </div>

            {/* Box 4: Frontend (Wide) */}
            <div className="md:col-span-4 bg-[#050912] border border-white/5 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 hover:border-white/10 transition-all">
               <div className="text-left w-full">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3"><FaCode className="text-cyan-500"/> Frontend Engine</h3>
                  <p className="text-slate-400 mt-2 text-sm max-w-2xl">
                    Powered by React 18 + Vite. Sub-millisecond DOM updates with Tailwind CSS JIT compiler for zero-runtime overhead styling.
                  </p>
               </div>
               <div className="flex gap-3">
                  <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-cyan-400">React.js</div>
                  <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-purple-400">Axios</div>
                  <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded font-mono text-xs text-pink-400">Recharts</div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================================
          SECTION 5: DEVELOPER API PREVIEW (ID: api-section)
      ========================================================================================= */}
      <section id="api-section" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">API-First Design.</h2>
              <p className="text-slate-400">
                Built for extensibility. Our RESTful API endpoints allow you to integrate GrowthServices data with your existing CI/CD pipelines or Slack workflows.
              </p>
              <button 
                onClick={() => toast("API Docs are hosted privately.")}
                className="text-blue-500 font-bold hover:text-blue-400 flex items-center gap-2 mt-4"
              >
                Read API Docs <FaArrowRight />
              </button>
           </div>
           
           <div className="bg-[#0A0D14] p-6 rounded-lg border border-white/10 font-mono text-xs text-slate-300 shadow-2xl relative hover:border-blue-500/20 transition-colors">
              <div className="absolute top-4 right-4 flex gap-2">
                 <div className="px-2 py-0.5 bg-green-500/20 text-green-500 rounded text-[10px] uppercase">GET</div>
                 <div className="text-slate-500">/api/v1/projects</div>
              </div>
              <pre className="overflow-x-auto pt-8">
{`{
  "status": "success",
  "data": {
    "total": 12,
    "projects": [
      {
        "id": "prj_8921",
        "name": "E-Commerce Rebrand",
        "status": "active",
        "budget": 15000,
        "team": ["dev_01", "des_04"]
      },
      // ... more items
    ]
  }
}`}
              </pre>
           </div>
        </div>
      </section>

      {/* =========================================================================================
          SECTION 6: ACCESS GATEWAY (ID: gateway)
      ========================================================================================= */}
      <section id="gateway" className="py-32 relative">
        <div className="absolute inset-0 bg-blue-600/5 z-0" style={{clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0% 100%)'}}></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Initialize Workspace</h2>
          <p className="text-slate-400 mb-12">Select your access level to authenticate into the system.</p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
             {/* Admin Button */}
             <button 
                onClick={() => handleRoleSelect('admin')}
                className="group relative w-full md:w-80 bg-white hover:bg-slate-200 text-slate-900 p-1 rounded-sm transition-all"
             >
                <div className="h-full px-8 py-8 flex flex-col items-center">
                   <FaUserShield className="text-4xl mb-4" />
                   <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Admin Root</h3>
                   <p className="text-xs text-slate-600 mb-8">Full read/write privileges.</p>
                   <div className="mt-auto border-b-2 border-black pb-1 text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      AUTHENTICATE <FaArrowRight />
                   </div>
                </div>
             </button>

             {/* Employee Button */}
             <button 
                onClick={() => handleRoleSelect('employee')}
                className="group relative w-full md:w-80 bg-[#1e293b] hover:bg-[#253248] text-white p-1 rounded-sm transition-all border border-white/10"
             >
                <div className="h-full px-8 py-8 flex flex-col items-center">
                   <FaUserTie className="text-4xl mb-4 text-blue-400" />
                   <h3 className="text-xl font-bold uppercase tracking-wider mb-2">Staff Node</h3>
                   <p className="text-xs text-slate-400 mb-8">Task & Dashboard Access.</p>
                   <div className="mt-auto border-b-2 border-blue-400 pb-1 text-sm font-bold text-blue-400 flex items-center gap-2 group-hover:gap-4 transition-all">
                      LOGIN <FaArrowRight />
                   </div>
                </div>
             </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#050912] border-t border-white/10 py-12 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            <div className="col-span-1 md:col-span-2">
               <div 
                 className="flex items-center gap-2 mb-4 cursor-pointer"
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
               >
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[10px]">OS</div>
                  <span className="font-bold text-white tracking-tight">GROWTH_SERVICES</span>
               </div>
               <p className="text-slate-500 max-w-xs">
                  The enterprise operating system for modern development agencies. Secure, scalable, and built for speed.
               </p>
            </div>
            <div>
               <h4 className="font-bold text-white mb-4">Platform</h4>
               <ul className="space-y-2 text-slate-500">
                  <li onClick={() => handleRoleSelect('admin')} className="hover:text-blue-500 cursor-pointer transition-colors">Admin Console</li>
                  <li onClick={() => handleRoleSelect('employee')} className="hover:text-blue-500 cursor-pointer transition-colors">Employee Portal</li>
                  <li onClick={() => scrollToSection('api-section')} className="hover:text-blue-500 cursor-pointer transition-colors">API Documentation</li>
                  <li onClick={() => scrollToSection('telemetry')} className="hover:text-blue-500 cursor-pointer transition-colors">System Status</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-white mb-4">Legal</h4>
               <ul className="space-y-2 text-slate-500">
                  <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Protocol</li>
                  <li className="hover:text-blue-500 cursor-pointer transition-colors">Terms of Service</li>
                  <li className="hover:text-blue-500 cursor-pointer transition-colors">Security Audit</li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-mono">
            <p>&copy; 2026 GROWTH SERVICES INC. // ALL SYSTEMS NOMINAL</p>
            <p>ENCRYPTION: 256-BIT • SERVER: US-EAST-1</p>
         </div>
      </footer>

    </div>
  );
};

export default Landing;