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
        { opacity: 0, scale: 0.95, y: 10 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
      );
    }
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">📚 Toutes les matières</h1>
        <p className="text-[#8b92b2] text-lg">Sélectionne une matière pour accéder aux fiches, QCM et vidéos</p>
      </div>

      <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(subjects).map(([id, m]) => (
          <div 
            key={id}
            onClick={() => navigate(`/matieres/${id}`)}
            className="glass-card p-6 cursor-pointer relative overflow-hidden group"
          >
            {/* Top border color line */}
            <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2" style={{ backgroundColor: m.color }}></div>
            
            <div className="text-4xl mb-4 mt-2">
              {m.icon === '🇬🇧' ? <Globe2 size={36} color={m.color} /> : m.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{m.name}</h3>
            <div className="text-[#8b92b2] text-sm font-medium">
              {m.fiches.length} fiches · {m.qcm.length} QCM · {m.videos.length} vidéos
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 rounded-full filter blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ backgroundColor: m.color }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
