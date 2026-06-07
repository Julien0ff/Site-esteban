import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import gsap from 'gsap';
import { GraduationCap } from 'lucide-react';

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(boxRef.current, 
      { opacity: 0, scale: 0.95, y: 30 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(loginId, pw)) {
      navigate('/');
    } else {
      setError(true);
      gsap.fromTo(boxRef.current, 
        { x: -10 }, { x: 10, duration: 0.1, yoyo: true, repeat: 3, onComplete: () => gsap.set(boxRef.current, {x: 0}) }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden text-[#f9fafb]">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>

      <div ref={boxRef} className="glass-panel p-10 w-full max-w-md relative z-10 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mb-5 shadow-[0_10px_40px_rgba(99,102,241,0.4)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 animate-pulse-glow mix-blend-overlay"></div>
            <GraduationCap size={32} color="white" className="relative z-10 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight font-['Outfit'] text-gradient">Prof Esteban</h1>
          <p className="text-[#9ca3af] mt-2 text-sm font-medium">Plateforme de révision premium</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Identifiant</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Ex: marie.dupont"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>
          
          <div className="input-group mb-8">
            <label>Mot de passe</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Votre mot de passe"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-base tracking-wide flex items-center justify-center gap-2 group">
            Se connecter <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {error && (
            <div className="mt-5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center text-rose-400 text-sm font-medium animate-pulse">
              ❌ Identifiant ou mot de passe incorrect
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
