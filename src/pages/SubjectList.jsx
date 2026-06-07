import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import gsap from 'gsap';
import { Globe2 } from 'lucide-react';

const SubjectList = () => {
  const { subjects } = useData();
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(listRef.current.children, 
        { opacity: 0, scale: 0.95, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  return (
    <div className="pb-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-3 font-['Outfit'] tracking-tight flex items-center gap-3">
          📚 Toutes les matières
        </h1>
        <p className="text-[#9ca3af] text-lg">Sélectionne une matière pour accéder aux fiches, QCM et vidéos premium</p>
      </div>

      <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(subjects).map(([id, m]) => (
          <div 
            key={id}
            onClick={() => navigate(`/matieres/${id}`)}
            className="glass-card p-8 cursor-pointer relative overflow-hidden group"
          >
            {/* Top border color line */}
            <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2" style={{ backgroundColor: m.color }}></div>
            
            <div className="text-5xl mb-6 mt-2 relative z-10 transition-transform duration-500 group-hover:scale-110 origin-left">
              {m.icon === '🇬🇧' ? <Globe2 size={48} color={m.color} /> : m.icon}
            </div>
            
            <h3 className="text-2xl font-bold mb-3 font-['Outfit'] group-hover:text-white transition-colors">{m.name}</h3>
            
            <div className="text-[#9ca3af] text-sm font-medium flex items-center gap-2">
              <span className="px-2 py-1 bg-white/5 rounded-md">{m.fiches.length} fiches</span>
              <span className="px-2 py-1 bg-white/5 rounded-md">{m.qcm.length} QCM</span>
              <span className="px-2 py-1 bg-white/5 rounded-md">{m.videos.length} vidéos</span>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 rounded-full filter blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: m.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
