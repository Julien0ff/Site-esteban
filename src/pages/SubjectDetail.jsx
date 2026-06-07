import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../DataContext';
import { ArrowLeft, Globe2, BookOpen, Brain, Video, CheckCircle, XCircle } from 'lucide-react';

const SubjectDetail = () => {
  const { subjects } = useData();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const matiere = subjects[id];

  const [activeTab, setActiveTab] = useState(location.state?.tab || 'fiches');
  const [openFiche, setOpenFiche] = useState(null);

  // QCM State
  const [qcmCurrent, setQcmCurrent] = useState(0);
  const [qcmScore, setQcmScore] = useState(0);
  const [qcmAnswered, setQcmAnswered] = useState(false);
  const [qcmFinished, setQcmFinished] = useState(false);
  const [qcmSelectedOpt, setQcmSelectedOpt] = useState(null);

  // Video State
  const [videoOpen, setVideoOpen] = useState(null);

  useEffect(() => {
    if (!matiere) navigate('/matieres');
  }, [id, matiere, navigate]);

  if (!matiere) return null;

  const handleQCMAnswer = (idx) => {
    if (qcmAnswered) return;
    setQcmAnswered(true);
    setQcmSelectedOpt(idx);
    const isCorrect = idx === matiere.qcm[qcmCurrent].answer;
    if (isCorrect) {
      setQcmScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (qcmCurrent + 1 >= matiere.qcm.length) {
      setQcmFinished(true);
    } else {
      setQcmCurrent(c => c + 1);
      setQcmAnswered(false);
      setQcmSelectedOpt(null);
    }
  };

  const restartQCM = () => {
    setQcmCurrent(0);
    setQcmScore(0);
    setQcmAnswered(false);
    setQcmFinished(false);
    setQcmSelectedOpt(null);
  };

  return (
    <div className="pb-12">
      <div className="flex items-center gap-4 mb-10 relative z-10">
        <button onClick={() => navigate('/matieres')} className="btn-outline flex items-center gap-2 py-2 px-4 bg-[rgba(17,24,39,0.5)] border-[rgba(255,255,255,0.05)]">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="text-4xl font-extrabold flex items-center gap-4 font-['Outfit']">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg" style={{ backgroundColor: `${matiere.color}15`, borderColor: `${matiere.color}40`, color: matiere.color }}>
            {matiere.icon === '🇬🇧' ? <Globe2 size={28} color={matiere.color} /> : matiere.icon}
          </div>
          {matiere.name}
        </h2>
      </div>

      <div className="flex gap-2 mb-10 bg-[rgba(17,24,39,0.5)] p-2 rounded-2xl border border-[rgba(255,255,255,0.05)] w-fit backdrop-blur-md relative z-10 shadow-lg">
        {[
          { id: 'fiches', label: 'Fiches de cours', icon: <BookOpen size={18} /> },
          { id: 'qcm', label: 'Quiz / QCM', icon: <Brain size={18} /> },
          { id: 'videos', label: 'Vidéos', icon: <Video size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setOpenFiche(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.id 
                ? 'bg-indigo-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)]' 
                : 'text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
        {/* FICHES TAB */}
        {activeTab === 'fiches' && (
          openFiche !== null ? (
            <div>
              <button onClick={() => setOpenFiche(null)} className="text-indigo-400 hover:text-indigo-300 mb-6 text-sm font-bold flex items-center gap-2 transition-colors">
                ← Retour à la liste des fiches
              </button>
              <div className="glass-card p-10 leading-relaxed shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" style={{ backgroundColor: matiere.color }}></div>
                
                <div className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-md text-xs font-bold text-[#9ca3af] uppercase tracking-widest mb-4">
                  {matiere.fiches[openFiche].niveau}
                </div>
                
                <h3 className="text-3xl font-extrabold mb-8 text-white border-b border-[rgba(255,255,255,0.08)] pb-5 font-['Outfit']">
                  {matiere.fiches[openFiche].title}
                </h3>
                
                <div className="fiche-content">
                  <ReactMarkdown>{matiere.fiches[openFiche].content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {matiere.fiches.map((f, i) => (
                <div 
                  key={i} 
                  onClick={() => setOpenFiche(i)}
                  className="glass-card p-6 cursor-pointer hover:border-indigo-400 transition-all duration-300 flex items-center justify-between group"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest mb-2">
                      {f.niveau}
                    </span>
                    <h4 className="text-lg font-bold group-hover:text-indigo-300 transition-colors font-['Outfit']">{f.title}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-[#9ca3af] group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-400 transition-all">
                    →
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* QCM TAB */}
        {activeTab === 'qcm' && (
          <div className="max-w-3xl mx-auto">
            {qcmFinished ? (
              <div className="glass-card p-12 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none"></div>
                
                <div className="text-7xl mb-6 relative z-10">{qcmScore / matiere.qcm.length >= 0.8 ? '🏆' : '📚'}</div>
                <div className="text-6xl font-extrabold font-['Outfit'] mb-3 relative z-10 text-gradient">
                  {qcmScore} <span className="text-3xl text-[#9ca3af]">/ {matiere.qcm.length}</span>
                </div>
                <p className="text-[#9ca3af] text-xl mb-10 relative z-10 font-medium">
                  {qcmScore / matiere.qcm.length >= 0.8 ? 'Excellent résultat ! Tu maîtrises le sujet.' : 'Continue tes révisions, tu peux faire mieux !'}
                </p>
                <button onClick={restartQCM} className="btn-primary py-4 px-8 text-lg relative z-10">🔄 Recommencer le quiz</button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-8">
                  {matiere.qcm.map((_, i) => (
                    <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                      i < qcmCurrent ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]' : i === qcmCurrent ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)] scale-y-125' : 'bg-[rgba(255,255,255,0.05)]'
                    }`} />
                  ))}
                </div>
                
                <div className="glass-card p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full mix-blend-screen filter blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: matiere.color }}></div>
                  
                  <div className="inline-block px-3 py-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-md text-xs font-bold text-[#9ca3af] uppercase tracking-widest mb-6 relative z-10">
                    Question {qcmCurrent + 1} / {matiere.qcm.length}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-10 leading-snug font-['Outfit'] relative z-10">
                    {matiere.qcm[qcmCurrent].q}
                  </h3>
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    {matiere.qcm[qcmCurrent].opts.map((opt, i) => {
                      let btnClass = "p-5 text-left rounded-2xl border font-semibold text-[1.05rem] transition-all duration-300 flex items-center justify-between ";
                      let icon = null;
                      
                      if (!qcmAnswered) {
                        btnClass += "bg-[rgba(17,24,39,0.6)] border-[rgba(255,255,255,0.05)] hover:border-indigo-400 hover:bg-[rgba(99,102,241,0.1)] cursor-pointer group";
                        icon = <div className="w-6 h-6 rounded-full border border-[#9ca3af] group-hover:border-indigo-400"></div>;
                      } else {
                        btnClass += "cursor-default ";
                        if (i === matiere.qcm[qcmCurrent].answer) {
                          btnClass += "bg-emerald-500/10 border-emerald-400 text-emerald-400 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]";
                          icon = <CheckCircle size={24} className="text-emerald-400" />;
                        } else if (i === qcmSelectedOpt) {
                          btnClass += "bg-rose-500/10 border-rose-400 text-rose-400 shadow-[inset_0_0_20px_rgba(244,63,94,0.1)]";
                          icon = <XCircle size={24} className="text-rose-400" />;
                        } else {
                          btnClass += "bg-[rgba(17,24,39,0.3)] border-[rgba(255,255,255,0.02)] opacity-40";
                          icon = <div className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.1)]"></div>;
                        }
                      }

                      return (
                        <button key={i} onClick={() => handleQCMAnswer(i)} disabled={qcmAnswered} className={btnClass}>
                          {opt}
                          {icon}
                        </button>
                      );
                    })}
                  </div>

                  {qcmAnswered && (
                    <div className="mt-8 p-6 rounded-2xl bg-[rgba(17,24,39,0.8)] border-l-4 relative z-10 shadow-lg" style={{ borderColor: qcmSelectedOpt === matiere.qcm[qcmCurrent].answer ? '#34d399' : '#fb7185' }}>
                      <p className="text-base leading-relaxed">
                        <span className={`font-bold mr-2 uppercase tracking-wide text-sm ${qcmSelectedOpt === matiere.qcm[qcmCurrent].answer ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {qcmSelectedOpt === matiere.qcm[qcmCurrent].answer ? '✓ Bonne réponse :' : '✗ Mauvaise réponse :'}
                        </span>
                        <br/><span className="text-[#e5e7eb] mt-1 block">{matiere.qcm[qcmCurrent].expl}</span>
                      </p>
                      <button onClick={nextQuestion} className="btn-primary mt-6 w-full sm:w-auto py-3 px-8 text-base">
                        {qcmCurrent + 1 >= matiere.qcm.length ? 'Voir les résultats 🏆' : 'Question suivante →'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matiere.videos.map(v => (
                <div key={v.id} onClick={() => setVideoOpen(v.id)} className="glass-card overflow-hidden cursor-pointer group flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-[#0a0a0f]">
                    <img 
                      src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`} 
                      onError={(e) => e.target.src = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)] group-hover:bg-[rgba(0,0,0,0.2)] transition-colors duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,0,0,0.6)] transform group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                        <span className="ml-1 text-xl">▶</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h4 className="font-bold text-base mb-2 font-['Outfit'] leading-snug group-hover:text-indigo-300 transition-colors">{v.title}</h4>
                    <span className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">📺</div> {v.channel}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {videoOpen && (
              <div className="fixed inset-0 bg-[rgba(3,7,18,0.95)] z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
                <div className="w-full max-w-5xl relative">
                  <button 
                    onClick={() => setVideoOpen(null)}
                    className="absolute -top-14 right-0 text-[#9ca3af] hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-sm transition-colors"
                  >
                    <XCircle size={20} /> Fermer
                  </button>
                  <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.05)]">
                    <iframe 
                      className="w-full h-full border-0" 
                      src={`https://www.youtube.com/embed/${videoOpen}?autoplay=1`} 
                      allowFullScreen 
                      title="YouTube Video Player"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;
