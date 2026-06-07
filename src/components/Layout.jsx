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
    // Simple fade-in animation for main content on mount
    gsap.fromTo(mainRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItemClass = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive 
        ? 'bg-[rgba(108,99,255,0.15)] text-[#6c63ff]' 
        : 'text-[#8b92b2] hover:bg-[rgba(30,33,48,0.7)] hover:text-[#e8eaf0]'
    }`;

  return (
    <div className="flex min-h-screen bg-[#0b0c10] text-[#e8eaf0]">
      
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[rgba(15,17,26,0.9)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6c63ff] to-[#ff6584] flex items-center justify-center">
            <GraduationCap className="text-white" size={18} />
          </div>
          <h2 className="text-lg font-bold">Prof Esteban</h2>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-[280px] fixed inset-y-0 left-0 bg-[rgba(15,17,26,0.95)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.08)] flex flex-col z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex items-center gap-4 hidden lg:flex">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6c63ff] to-[#ff6584] flex items-center justify-center shadow-[0_8px_32px_rgba(108,99,255,0.3)]">
            <GraduationCap className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Prof Esteban</h2>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 custom-scrollbar">
          <div className="text-[10px] font-bold text-[#8b92b2] uppercase tracking-wider mb-2 px-2 mt-2">Navigation</div>
          
          <NavLink to="/" className={navItemClass} end>
            <LayoutDashboard size={18} />
            <span>Tableau de bord</span>
          </NavLink>

          <div className="text-[10px] font-bold text-[#8b92b2] uppercase tracking-wider mb-2 px-2 mt-6">Ressources</div>
          
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
              <div className="text-[10px] font-bold text-[#8b92b2] uppercase tracking-wider mb-2 px-2 mt-6">Administration</div>
              <NavLink to="/admin" onClick={() => setSidebarOpen(false)} className={navItemClass}>
                <Settings size={18} />
                <span>Gestion élèves</span>
              </NavLink>
            </>
          )}
        </div>

        {/* User Info & Bottom */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(15,17,26,0.5)]">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#4facfe] flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate text-white">{user.name}</div>
              <div className="text-xs text-[#8b92b2] mt-0.5">{user.role === 'admin' ? 'Administrateur' : 'Élève'}</div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] text-[#8b92b2] hover:text-[#ff6584] hover:border-[rgba(255,101,132,0.3)] hover:bg-[rgba(255,101,132,0.1)] transition-all duration-300 font-medium text-sm"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="lg:ml-[280px] pt-24 lg:pt-12 flex-1 p-4 lg:p-8 min-h-screen" ref={mainRef}>
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
