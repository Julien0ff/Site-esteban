import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import gsap from 'gsap';
import { ShieldAlert, CheckCircle, XCircle } from 'lucide-react';

const ForcePasswordChange = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [success, setSuccess] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (user && user.needsPasswordChange && boxRef.current) {
      gsap.fromTo(boxRef.current, 
        { opacity: 0, scale: 0.95, y: 30 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      );
    }
  }, [user]);

  const criteria = [
    { label: "Au moins 8 caractères", valid: newPw.length >= 8 },
    { label: "Une majuscule", valid: /[A-Z]/.test(newPw) },
    { label: "Un chiffre", valid: /[0-9]/.test(newPw) },
    { label: "Un caractère spécial (!@#...)", valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPw) },
    { label: "Mots de passe identiques", valid: newPw === confirmPw && confirmPw.length > 0 }
  ];

  const allValid = criteria.every(c => c.valid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allValid) return;
    
    setSuccess(true);
    setTimeout(async () => {
      await updateUser(user.login, { ...user, pw: newPw, needsPasswordChange: false });
    }, 1500);
  };

  if (user && user.needsPasswordChange) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] overflow-hidden text-[#f9fafb]">
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>

        <div ref={boxRef} className="glass-panel p-6 md:p-10 w-full max-w-md relative z-10 mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-5 shadow-[0_10px_40px_rgba(99,102,241,0.4)]">
              <ShieldAlert size={32} color="white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight font-['Outfit'] text-gradient">Sécurisez votre compte</h1>
            <p className="text-[#9ca3af] mt-3 text-sm font-medium leading-relaxed">
              Veuillez définir un nouveau mot de passe définitif pour remplacer votre mot de passe temporaire.
            </p>
          </div>

          {!success ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Nouveau mot de passe</label>
                <input 
                  type="password" 
                  className="input-field" 
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
              </div>
              
              <div className="input-group mb-6">
                <label>Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  className="input-field" 
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
              </div>

              <div className="mb-8 space-y-2.5 bg-[rgba(17,24,39,0.5)] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                {criteria.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-medium transition-colors">
                    {c.valid ? (
                      <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#4b5563] shrink-0"></div>
                    )}
                    <span className={c.valid ? "text-[#e5e7eb]" : "text-[#6b7280]"}>{c.label}</span>
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                disabled={!allValid}
                className={`w-full py-4 text-base tracking-wide flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 ${allValid ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)] hover:scale-[1.02]' : 'bg-[rgba(255,255,255,0.05)] text-[#6b7280] cursor-not-allowed border border-[rgba(255,255,255,0.05)]'}`}
              >
                Enregistrer le mot de passe
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={56} className="text-emerald-400 mx-auto mb-4 animate-in zoom-in duration-300" />
              <p className="text-xl font-bold text-emerald-400">Mot de passe enregistré !</p>
              <p className="text-[#9ca3af] text-sm mt-3">Connexion en cours...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default ForcePasswordChange;
