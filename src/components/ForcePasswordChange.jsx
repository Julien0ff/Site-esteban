import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import gsap from 'gsap';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const ForcePasswordChange = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [error, setError] = useState('');
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

  const validatePassword = (pw) => {
    if (pw.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw)) return "Le mot de passe doit contenir au moins un caractère spécial.";
    if (!/[A-Z]/.test(pw)) return "Le mot de passe doit contenir au moins une majuscule.";
    if (!/[0-9]/.test(pw)) return "Le mot de passe doit contenir au moins un chiffre.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (newPw !== confirmPw) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    
    const validationError = validatePassword(newPw);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setSuccess(true);
    setTimeout(async () => {
      await updateUser(user.login, { ...user, pw: newPw, needsPasswordChange: false });
    }, 1500);
  };

  if (user && user.needsPasswordChange) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712] relative overflow-hidden text-[#f9fafb]">
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>

        <div ref={boxRef} className="glass-panel p-10 w-full max-w-md relative z-10 mx-4">
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
                  placeholder="8 car. min, 1 maj, 1 chiffre, 1 spécial"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                />
              </div>
              
              <div className="input-group mb-8">
                <label>Confirmer le mot de passe</label>
                <input 
                  type="password" 
                  className="input-field" 
                  placeholder="Répétez le mot de passe"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base tracking-wide flex items-center justify-center gap-2 group">
                Enregistrer le mot de passe
              </button>

              {error && (
                <div className="mt-5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center text-rose-400 text-sm font-medium animate-pulse">
                  ❌ {error}
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={48} className="text-emerald-400 mx-auto mb-4" />
              <p className="text-lg font-bold text-emerald-400">Mot de passe enregistré !</p>
              <p className="text-[#9ca3af] text-sm mt-2">Redirection en cours...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return children;
};

export default ForcePasswordChange;
