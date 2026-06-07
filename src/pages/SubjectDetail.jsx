import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '../DataContext';
import { ArrowLeft, CheckCircle, XCircle, Globe2 } from 'lucide-react';
import gsap from 'gsap';

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
      // Here we could save the score to localStorage or a simulated backend
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
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/matieres')} className="btn-outline flex items-center gap-2">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="text-3xl font-extrabold flex items-center gap-3">
          <span className="text-4xl">
            {matiere.icon === '🇬🇧' ? <Globe2 size={36} color={matiere.color} /> : matiere.icon}
          </span> 
          {matiere.name}
        </h2>
      </div>

      <div className="flex gap-2 mb-8 bg-[rgba(15,17,26,0.6)] p-1.5 rounded-xl border border-[rgba(255,255,255,0.05)] w-fit">
        {['fiches', 'qcm', 'videos'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setOpenFiche(null); }}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-[#6c63ff] text-white shadow-[0_4px_12px_rgba(108,99,255,0.3)]' 
                : 'text-[#8b92b2] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
            }`}
          >
            {tab === 'fiches' ? '📝 Fiches' : tab === 'qcm' ? '🧠 QCM' : '🎥 Vidéos'}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* FICHES TAB */}
        {activeTab === 'fiches' && (
          openFiche !== null ? (
            <div>
              <button onClick={() => setOpenFiche(null)} className="text-[#6c63ff] hover:underline mb-4 text-sm font-semibold flex items-center gap-1">
                ← Retour à la liste des fiches
              </button>
              <div className="bg-[#151829] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 leading-relaxed fiche-content shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-white border-b border-[rgba(255,255,255,0.1)] pb-4">
                  {matiere.fiches[openFiche].title}
                </h3>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{matiere.fiches[openFiche].content}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {matiere.fiches.map((f, i) => (
                <div 
                  key={i} 
                  onClick={() => setOpenFiche(i)}
                  className="bg-[#151829] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl cursor-pointer hover:border-[#6c63ff] transition-all duration-200 flex items-center justify-between group"
                >
                  <div>
                    <h4 className="text-lg font-bold group-hover:text-[#6c63ff] transition-colors">{f.title}</h4>
                    <span className="text-xs text-[#8b92b2] font-semibold tracking-wider uppercase mt-1 block">Niveau : {f.niveau}</span>
                  </div>
                  <span className="text-[#8b92b2] group-hover:text-[#6c63ff] transition-colors">Lire →</span>
                </div>
              ))}
            </div>
          )
        )}

        {/* QCM TAB */}
        {activeTab === 'qcm' && (
          <div className="max-w-2xl">
            {qcmFinished ? (
              <div className="glass-card p-10 text-center">
                <div className="text-6xl mb-4">{qcmScore / matiere.qcm.length >= 0.8 ? '🎉' : '📚'}</div>
                <div className="text-5xl font-extrabold font-['Syne'] mb-2">
                  {qcmScore} <span className="text-2xl text-[#8b92b2]">/ {matiere.qcm.length}</span>
                </div>
                <p className="text-[#8b92b2] text-lg mb-8">
                  {qcmScore / matiere.qcm.length >= 0.8 ? 'Excellent résultat !' : 'Continue tes révisions !'}
                </p>
                <button onClick={restartQCM} className="btn-primary">🔄 Recommencer</button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-6">
                  {matiere.qcm.map((_, i) => (
                    <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${
                      i < qcmCurrent ? 'bg-[#43e97b]' : i === qcmCurrent ? 'bg-[#6c63ff]' : 'bg-[rgba(255,255,255,0.1)]'
                    }`} />
                  ))}
                </div>
                
                <div className="glass-card p-8">
                  <div className="text-sm font-bold text-[#8b92b2] uppercase tracking-wider mb-4">
                    Question {qcmCurrent + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-8 leading-snug">
                    {matiere.qcm[qcmCurrent].q}
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {matiere.qcm[qcmCurrent].opts.map((opt, i) => {
                      let btnClass = "p-4 text-left rounded-xl border font-medium transition-all duration-200 ";
                      if (!qcmAnswered) {
                        btnClass += "bg-[rgba(15,17,26,0.6)] border-[rgba(255,255,255,0.1)] hover:border-[#6c63ff] hover:bg-[rgba(108,99,255,0.05)] cursor-pointer";
                      } else {
                        btnClass += "cursor-default ";
                        if (i === matiere.qcm[qcmCurrent].answer) {
                          btnClass += "bg-[rgba(67,233,123,0.15)] border-[#43e97b] text-[#43e97b]";
                        } else if (i === qcmSelectedOpt) {
                          btnClass += "bg-[rgba(255,101,132,0.15)] border-[#ff6584] text-[#ff6584]";
                        } else {
                          btnClass += "bg-[rgba(15,17,26,0.4)] border-[rgba(255,255,255,0.05)] opacity-50";
                        }
                      }

                      return (
                        <button key={i} onClick={() => handleQCMAnswer(i)} disabled={qcmAnswered} className={btnClass}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {qcmAnswered && (
                    <div className="mt-6 p-4 rounded-xl bg-[rgba(15,17,26,0.8)] border-l-4" style={{ borderColor: qcmSelectedOpt === matiere.qcm[qcmCurrent].answer ? '#43e97b' : '#ff6584' }}>
                      <p className="text-sm">
                        <span className="font-bold mr-2">
                          {qcmSelectedOpt === matiere.qcm[qcmCurrent].answer ? '✅ Bonne réponse :' : '❌ Mauvaise réponse :'}
                        </span>
                        {matiere.qcm[qcmCurrent].expl}
                      </p>
                      <button onClick={nextQuestion} className="btn-primary mt-4 py-2 px-6 text-sm">
                        {qcmCurrent + 1 >= matiere.qcm.length ? 'Terminer' : 'Question suivante →'}
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
            <div className="grid-cols-3">
              {matiere.videos.map(v => (
                <div key={v.id} onClick={() => setVideoOpen(v.id)} className="glass-card overflow-hidden cursor-pointer group">
                  <div className="aspect-video relative overflow-hidden bg-[#1e2130]">
                    <img 
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} 
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] group-hover:bg-[rgba(0,0,0,0.1)] transition-colors">
                      <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,0,0,0.5)] transform group-hover:scale-110 transition-transform">
                        ▶
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm mb-1">{v.title}</h4>
                    <span className="text-xs text-[#8b92b2]">📺 {v.channel}</span>
                  </div>
                </div>
              ))}
            </div>

            {videoOpen && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.9)] z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="w-full max-w-4xl glass-card overflow-hidden relative">
                  <button 
                    onClick={() => setVideoOpen(null)}
                    className="absolute -top-12 right-0 text-white hover:text-[#ff6584] text-lg font-bold"
                  >
                    Fermer ✕
                  </button>
                  <div className="aspect-video bg-black">
                    <iframe 
                      className="w-full h-full border-0" 
                      src={`https://www.youtube.com/embed/${videoOpen}?autoplay=1`} 
                      allowFullScreen 
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
