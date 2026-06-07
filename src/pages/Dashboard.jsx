import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useData } from '../DataContext';
import gsap from 'gsap';
import { BookOpen, FileText, Brain, Video, Zap, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { subjects } = useData();
  const navigate = useNavigate();
  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  const totalMatieres = Object.keys(subjects).length;
  const totalFiches = Object.values(subjects).reduce((acc, m) => acc + m.fiches.length, 0);
  const totalQCM = Object.values(subjects).reduce((acc, m) => acc + m.qcm.length, 0);
  const totalVideos = Object.values(subjects).reduce((acc, m) => acc + m.videos.length, 0);

  return (
    <div className="pb-12">
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <h1 className="text-5xl font-extrabold mb-3 font-['Outfit'] tracking-tight">
          Bonjour, <span className="text-gradient">{user.name.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-[#9ca3af] text-lg">Voici un aperçu de ton espace de révision premium</p>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 flex flex-col justify-between group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
            <BookOpen className="text-indigo-400" size={24} />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-['Outfit']">{totalMatieres}</div>
            <div className="text-xs text-[#9ca3af] uppercase tracking-widest font-bold mt-2">Matières</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 border border-pink-500/20 group-hover:scale-110 transition-transform">
            <FileText className="text-pink-400" size={24} />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-['Outfit']">{totalFiches}</div>
            <div className="text-xs text-[#9ca3af] uppercase tracking-widest font-bold mt-2">Fiches</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
            <Brain className="text-emerald-400" size={24} />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-['Outfit']">{totalQCM}</div>
            <div className="text-xs text-[#9ca3af] uppercase tracking-widest font-bold mt-2">Questions QCM</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between group cursor-default">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
            <Video className="text-blue-400" size={24} />
          </div>
          <div>
            <div className="text-4xl font-extrabold font-['Outfit']">{totalVideos}</div>
            <div className="text-xs text-[#9ca3af] uppercase tracking-widest font-bold mt-2">Vidéos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-['Outfit']">
            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <BookOpen size={20} className="text-indigo-400" />
            </div>
            Commencer à réviser
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(subjects).slice(0, 4).map(([id, m]) => (
              <button 
                key={id}
                onClick={() => navigate(`/matieres/${id}`)}
                className="flex items-center gap-4 w-full bg-[rgba(17,24,39,0.5)] border border-[rgba(255,255,255,0.05)] p-4 rounded-2xl hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: `${m.color}20`, border: `1px solid ${m.color}40`, color: m.color }}>
                  {m.icon}
                </div>
                <span className="font-semibold flex-1 text-[1.05rem] group-hover:text-white transition-colors">{m.name}</span>
                <span className="text-[#6b7280] text-sm group-hover:translate-x-1 group-hover:text-indigo-400 transition-all">
                  <ArrowRight size={18} />
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-10 bg-gradient-to-br from-[rgba(17,24,39,0.8)] to-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.2)] relative flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          
          <h3 className="text-3xl font-extrabold mb-3 flex items-center gap-3 font-['Outfit'] text-gradient">
            <Zap size={28} className="text-pink-500" />
            Révision Rapide
          </h3>
          <p className="text-[#9ca3af] text-base mb-10 leading-relaxed">Teste tes connaissances immédiatement avec un QCM express généré aléatoirement.</p>
          
          <div className="flex flex-col gap-5 relative z-10">
            <button 
              onClick={() => navigate('/matieres/maths', { state: { tab: 'qcm' } })}
              className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-5"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              <span className="text-xl">🧮</span> QCM Mathématiques
            </button>
            <button 
              onClick={() => navigate('/matieres/francais', { state: { tab: 'qcm' } })}
              className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-5"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #be123c)' }}
            >
              <span className="text-xl">📖</span> QCM Français
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
