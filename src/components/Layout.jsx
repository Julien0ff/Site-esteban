import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import gsap from 'gsap';
import { LayoutDashboard, BookOpen, FileText, Settings, LogOut, GraduationCap, Menu, X } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(mainRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium relative group ${
      isActive 
        ? 'bg-[rgba(99,102,241,0.1)] text-[#818cf8] border border-[rgba(99,102,241,0.2)] shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]' 
        : 'text-[#9ca3af] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#f3f4f6] border border-transparent hover:border-[rgba(255,255,255,0.05)]'
    }`;

  return (
    <div className="flex min-h-screen bg-[#030712] text-[#f9fafb]">
      
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[rgba(3,7,18,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)] z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            <GraduationCap className="text-white" size={18} />
          </div>
          <h2 className="text-lg font-bold font-['Outfit'] tracking-tight">Prof Esteban</h2>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-md transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[280px] fixed inset-y-0 left-0 bg-[rgba(17,24,39,0.7)] backdrop-blur-2xl border-r border-[rgba(255,255,255,0.05)] flex flex-col z-50 transition-transform duration-500 ease-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-4 hidden lg:flex">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center shadow-[0_8px_32px_rgba(99,102,241,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 animate-pulse-glow mix-blend-overlay"></div>
            <GraduationCap className="text-white relative z-10 group-hover:scale-110 transition-transform" size={24} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight font-['Outfit'] text-gradient">Prof Esteban</h2>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2 custom-scrollbar">
          <div className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-1 px-2 mt-2 font-['Outfit']">Navigation</div>
          
          <NavLink to="/" className={navItemClass} end>
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </NavLink>

          <div className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-1 px-2 mt-6 font-['Outfit']">Ressources</div>
          
          <NavLink to="/matieres" className={navItemClass}>
            <BookOpen size={18} />
            <span>Toutes les matières</span>
          </NavLink>
          
          <NavLink to="/annales" className={navItemClass}>
            <FileText size={18} />
            <span>Annales</span>
          </NavLink>

          {user.role === 'admin' && (
            <>
              <div className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest mb-1 px-2 mt-6 font-['Outfit']">Administration</div>
              <NavLink to="/admin" onClick={() => setSidebarOpen(false)} className={navItemClass}>
                <Settings size={18} />
                <span>Gestion élèves</span>
              </NavLink>
            </>
          )}
        </div>

        {/* User Info & Bottom */}
        <div className="p-5 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(3,7,18,0.3)]">
          <div className="flex items-center gap-4 mb-5 px-2">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6366f1] to-[#3b82f6] flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0 relative">
              {user.name.charAt(0).toUpperCase()}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#111827] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold truncate text-[#f9fafb]">{user.name}</div>
              <div className="text-xs text-[#9ca3af] mt-0.5 font-medium">{user.role === 'admin' ? 'Administrateur' : 'Élève'}</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[rgba(255,255,255,0.05)] text-[#9ca3af] hover:text-[#f43f5e] hover:border-[rgba(244,63,94,0.3)] hover:bg-[rgba(244,63,94,0.1)] transition-all duration-300 font-semibold text-sm group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Déconnexion
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="lg:ml-[280px] pt-24 lg:pt-12 flex-1 p-4 lg:p-8 min-h-screen relative z-10" ref={mainRef}>
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
