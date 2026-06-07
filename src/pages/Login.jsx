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
      { opacity: 0, scale: 0.9, y: 30 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }
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
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] relative overflow-hidden text-[#e8eaf0]">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6c63ff] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6584] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

      <div ref={boxRef} className="glass-panel p-10 w-full max-w-md relative z-10 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#6c63ff] to-[#ff6584] rounded-2xl flex items-center justify-center mb-4 shadow-[0_10px_40px_rgba(108,99,255,0.4)]">
            <GraduationCap size={32} color="white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Prof Esteban</h1>
          <p className="text-[#8b92b2] mt-2 text-sm">Plateforme de révision premium</p>
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
          
          <div className="input-group mb-6">
            <label>Mot de passe</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Votre mot de passe"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-base tracking-wide">
            Se connecter →
          </button>

          {error && (
            <div className="mt-4 p-3 bg-[rgba(255,101,132,0.1)] border border-[rgba(255,101,132,0.3)] rounded-xl text-center text-[#ff6584] text-sm font-medium">
              ❌ Identifiant ou mot de passe incorrect
            </div>
          )}
        </form>


      </div>
    </div>
  );
};

export default Login;
