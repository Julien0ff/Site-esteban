import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useData } from '../DataContext';
import gsap from 'gsap';
import { BookOpen, FileText, Brain, Video, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { subjects } = useData();
  const navigate = useNavigate();
  const statsRef = useRef(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, []);

  const totalMatieres = Object.keys(subjects).length;
  const totalFiches = Object.values(subjects).reduce((acc, m) => acc + m.fiches.length, 0);
  const totalQCM = Object.values(subjects).reduce((acc, m) => acc + m.qcm.length, 0);
  const totalVideos = Object.values(subjects).reduce((acc, m) => acc + m.videos.length, 0);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Bonjour, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-[#8b92b2] text-lg">Voici un aperçu de ton espace de révision</p>
      </div>

      <div ref={statsRef} className="grid-cols-4 mb-10">
        <div className="glass-card p-6 flex flex-col justify-between">
          <BookOpen className="text-[#6c63ff] mb-4" size={28} />
          <div>
            <div className="text-3xl font-extrabold font-['Syne']">{totalMatieres}</div>
            <div className="text-xs text-[#8b92b2] uppercase tracking-wider font-bold mt-1">Matières</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <FileText className="text-[#ff6584] mb-4" size={28} />
          <div>
            <div className="text-3xl font-extrabold font-['Syne']">{totalFiches}</div>
            <div className="text-xs text-[#8b92b2] uppercase tracking-wider font-bold mt-1">Fiches</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <Brain className="text-[#43e97b] mb-4" size={28} />
          <div>
            <div className="text-3xl font-extrabold font-['Syne']">{totalQCM}</div>
            <div className="text-xs text-[#8b92b2] uppercase tracking-wider font-bold mt-1">Questions QCM</div>
          </div>
        </div>
        <div className="glass-card p-6 flex flex-col justify-between">
          <Video className="text-[#4facfe] mb-4" size={28} />
          <div>
            <div className="text-3xl font-extrabold font-['Syne']">{totalVideos}</div>
            <div className="text-xs text-[#8b92b2] uppercase tracking-wider font-bold mt-1">Vidéos</div>
          </div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen size={20} className="text-[#6c63ff]" />
            Commencer à réviser
          </h3>
          <div className="flex flex-col gap-3">
            {Object.entries(subjects).slice(0, 4).map(([id, m]) => (
              <button 
                key={id}
                onClick={() => navigate(`/matieres/${id}`)}
                className="flex items-center gap-3 w-full bg-[rgba(15,17,26,0.5)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 text-left"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${m.color}20`, color: m.color }}>
                  {m.icon}
                </div>
                <span className="font-semibold flex-1">{m.name}</span>
                <span className="text-[#8b92b2] text-sm">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-8 bg-gradient-to-br from-[rgba(30,33,48,0.7)] to-[rgba(108,99,255,0.05)] border border-[rgba(108,99,255,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6c63ff] rounded-full mix-blend-screen filter blur-[64px] opacity-20"></div>
          
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
            <Zap size={20} className="text-[#ff6584]" />
            Révision Rapide
          </h3>
          <p className="text-[#8b92b2] text-sm mb-6">Teste tes connaissances immédiatement avec un QCM express.</p>
          
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => navigate('/matieres/maths', { state: { tab: 'qcm' } })}
              className="btn-primary w-full flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #f7971e, #d35400)' }}
            >
              🧮 QCM Maths
            </button>
            <button 
              onClick={() => navigate('/matieres/francais', { state: { tab: 'qcm' } })}
              className="btn-primary w-full flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #ee0979, #c0392b)' }}
            >
              📖 QCM Français
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
