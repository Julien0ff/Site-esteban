import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useData } from '../DataContext';
import { Trash2, UserPlus, ShieldAlert, Database, BookOpen, PlusCircle, Video, Brain, Edit2 } from 'lucide-react';

const Admin = () => {
  const { usersDb, addUser, updateUser, deleteUser, user } = useAuth();
  const { subjects, addFiche, updateFiche, deleteFiche, addQCM, updateQCM, deleteQCM, addVideo, updateVideo, deleteVideo } = useData();
  
  const [activeTab, setActiveTab] = useState('users');

  // User form
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pw, setPw] = useState('');
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  // Content state
  const [selectedSubj, setSelectedSubj] = useState('maths');
  const [contentTab, setContentTab] = useState('fiches'); // fiches, qcm, videos
  const [contentSuccess, setContentSuccess] = useState('');

  // Editing state
  const [editingFiche, setEditingFiche] = useState(null);
  const [editingQCM, setEditingQCM] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  // Fiche form
  const [ficheTitle, setFicheTitle] = useState('');
  const [ficheNiveau, setFicheNiveau] = useState('3ème');
  const [ficheContent, setFicheContent] = useState('');

  // QCM form
  const [qcmQuestion, setQcmQuestion] = useState('');
  const [qcmOpt1, setQcmOpt1] = useState('');
  const [qcmOpt2, setQcmOpt2] = useState('');
  const [qcmOpt3, setQcmOpt3] = useState('');
  const [qcmOpt4, setQcmOpt4] = useState('');
  const [qcmAnswer, setQcmAnswer] = useState(0);
  const [qcmExpl, setQcmExpl] = useState('');

  // Video form
  const [videoTitle, setVideoTitle] = useState('');
  const [videoChannel, setVideoChannel] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();
    setUserError('');
    setUserSuccess('');
    
    if (!name || !login || !pw) {
      setUserError('Tous les champs sont obligatoires.');
      return;
    }
    
    if (editingUser) {
      const role = usersDb.find(u => u.login === editingUser)?.role || 'student';
      const updated = await updateUser(editingUser, { name, login, pw, role });
      if (updated) {
        setUserSuccess(`Le profil de ${name} a été modifié avec succès.`);
        setName('');
        setLogin('');
        setPw('');
        setEditingUser(null);
      } else {
        setUserError('Cet identifiant existe déjà pour un autre utilisateur.');
      }
    } else {
      const added = await addUser({ name, login, pw, role: 'student' });
      if (added) {
        setUserSuccess(`L'élève ${name} a été ajouté avec succès.`);
        setName('');
        setLogin('');
        setPw('');
      } else {
        setUserError('Cet identifiant existe déjà.');
      }
    }
  };

  const handleEditUser = (u) => {
    setName(u.name);
    setLogin(u.login);
    setPw(u.pw);
    setEditingUser(u.login);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditUser = () => {
    setEditingUser(null);
    setName('');
    setLogin('');
    setPw('');
  };

  const showSuccess = (msg) => {
    setContentSuccess(msg);
    setTimeout(() => setContentSuccess(''), 3000);
  };

  const handleAddFiche = (e) => {
    e.preventDefault();
    if (!ficheTitle || !ficheContent) return;
    if (editingFiche !== null) {
      updateFiche(selectedSubj, editingFiche, { title: ficheTitle, niveau: ficheNiveau, content: ficheContent });
      showSuccess(`Fiche modifiée en ${subjects[selectedSubj].name}`);
      setEditingFiche(null);
    } else {
      addFiche(selectedSubj, { title: ficheTitle, niveau: ficheNiveau, content: ficheContent });
      showSuccess(`Fiche ajoutée en ${subjects[selectedSubj].name}`);
    }
    setFicheTitle('');
    setFicheNiveau('3ème');
    setFicheContent('');
  };

  const handleEditFiche = (idx) => {
    const f = subjects[selectedSubj].fiches[idx];
    setFicheTitle(f.title);
    setFicheNiveau(f.niveau);
    setFicheContent(f.content);
    setEditingFiche(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditFiche = () => {
    setEditingFiche(null);
    setFicheTitle('');
    setFicheNiveau('3ème');
    setFicheContent('');
  };

  const handleAddQCM = (e) => {
    e.preventDefault();
    if (!qcmQuestion || !qcmOpt1 || !qcmOpt2) return;
    const opts = [qcmOpt1, qcmOpt2];
    if (qcmOpt3) opts.push(qcmOpt3);
    if (qcmOpt4) opts.push(qcmOpt4);

    if (editingQCM !== null) {
      updateQCM(selectedSubj, editingQCM, { q: qcmQuestion, opts, answer: Number(qcmAnswer), expl: qcmExpl });
      showSuccess(`Question modifiée dans le QCM de ${subjects[selectedSubj].name}`);
      setEditingQCM(null);
    } else {
      addQCM(selectedSubj, { q: qcmQuestion, opts, answer: Number(qcmAnswer), expl: qcmExpl });
      showSuccess(`Question ajoutée au QCM de ${subjects[selectedSubj].name}`);
    }
    setQcmQuestion('');
    setQcmOpt1(''); setQcmOpt2(''); setQcmOpt3(''); setQcmOpt4('');
    setQcmAnswer(0); setQcmExpl('');
  };

  const handleEditQCM = (idx) => {
    const q = subjects[selectedSubj].qcm[idx];
    setQcmQuestion(q.q);
    setQcmOpt1(q.opts[0] || '');
    setQcmOpt2(q.opts[1] || '');
    setQcmOpt3(q.opts[2] || '');
    setQcmOpt4(q.opts[3] || '');
    setQcmAnswer(q.answer);
    setQcmExpl(q.expl);
    setEditingQCM(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditQCM = () => {
    setEditingQCM(null);
    setQcmQuestion('');
    setQcmOpt1(''); setQcmOpt2(''); setQcmOpt3(''); setQcmOpt4('');
    setQcmAnswer(0); setQcmExpl('');
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!videoTitle || !videoId) return;
    
    // Extract ID if full youtube link is pasted
    let finalId = videoId;
    if (videoId.includes('v=')) {
      finalId = videoId.split('v=')[1].split('&')[0];
    } else if (videoId.includes('youtu.be/')) {
      finalId = videoId.split('youtu.be/')[1].split('?')[0];
    }

    if (editingVideo !== null) {
      updateVideo(selectedSubj, editingVideo, { id: finalId, title: videoTitle, channel: videoChannel || 'YouTube' });
      showSuccess(`Vidéo modifiée en ${subjects[selectedSubj].name}`);
      setEditingVideo(null);
    } else {
      addVideo(selectedSubj, { id: finalId, title: videoTitle, channel: videoChannel || 'YouTube' });
      showSuccess(`Vidéo ajoutée en ${subjects[selectedSubj].name}`);
    }
    setVideoTitle('');
    setVideoId('');
    setVideoChannel('');
  };

  const handleEditVideo = (vId) => {
    const v = subjects[selectedSubj].videos.find(vid => vid.id === vId);
    if (!v) return;
    setVideoTitle(v.title);
    setVideoChannel(v.channel);
    setVideoId(v.id);
    setEditingVideo(v.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditVideo = () => {
    setEditingVideo(null);
    setVideoTitle('');
    setVideoId('');
    setVideoChannel('');
  };

  return (
    <div className="pb-20">
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <h1 className="text-4xl font-extrabold mb-3 flex items-center gap-4 font-['Outfit'] text-gradient">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center border border-pink-500/30">
            <ShieldAlert className="text-pink-400" size={24} />
          </div>
          Administration
        </h1>
        <p className="text-[#9ca3af] text-lg">Gérez les accès élèves et le contenu de la plateforme premium</p>
      </div>

      <div className="flex gap-2 mb-10 bg-[rgba(17,24,39,0.5)] p-2 rounded-2xl border border-[rgba(255,255,255,0.05)] w-fit backdrop-blur-md relative z-10 shadow-lg">
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'users' ? 'bg-pink-500 text-white shadow-[0_4px_20px_rgba(236,72,153,0.4)]' : 'text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <UserPlus size={18} /> Gestion des Élèves
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'content' ? 'bg-indigo-500 text-white shadow-[0_4px_20px_rgba(99,102,241,0.4)]' : 'text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <Database size={18} /> Gestion du Contenu
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10">
          <div className="glass-card p-10 mb-10 bg-gradient-to-br from-[rgba(17,24,39,0.8)] to-[rgba(236,72,153,0.05)] border-pink-500/20">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-['Outfit']">
              <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                <UserPlus size={20} className="text-pink-400" />
              </div>
              {editingUser ? 'Modifier un compte élève' : 'Ajouter un nouvel élève'}
            </h3>
            
            {userError && <div className="mb-6 p-4 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-xl font-medium animate-pulse">{userError}</div>}
            {userSuccess && <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium">{userSuccess}</div>}

            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
              <div className="input-group mb-0">
                <label>Prénom Nom</label>
                <input type="text" className="input-field py-3 px-5" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="input-group mb-0">
                <label>Identifiant</label>
                <input type="text" className="input-field py-3 px-5" value={login} onChange={e => setLogin(e.target.value)} />
              </div>
              <div className="input-group mb-0">
                <label>Mot de passe</label>
                <input type="text" className="input-field py-3 px-5" value={pw} onChange={e => setPw(e.target.value)} />
              </div>
              <div className="flex flex-col gap-3">
                <button type="submit" className="btn-primary py-3 px-5 h-12 flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_4px_15px_rgba(236,72,153,0.4)]">
                  {editingUser ? 'Enregistrer' : 'Ajouter'}
                </button>
                {editingUser && (
                  <button type="button" onClick={cancelEditUser} className="btn-outline py-2 px-5 h-10 flex items-center justify-center text-xs">
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-8 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(17,24,39,0.5)]">
              <h3 className="text-2xl font-bold font-['Outfit']">Liste des comptes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(17,24,39,0.8)] border-b border-[rgba(255,255,255,0.05)]">
                    <th className="p-5 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Nom</th>
                    <th className="p-5 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Identifiant</th>
                    <th className="p-5 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Mot de passe</th>
                    <th className="p-5 text-xs font-bold text-[#9ca3af] uppercase tracking-widest">Rôle</th>
                    <th className="p-5 text-xs font-bold text-[#9ca3af] uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {usersDb.map((u, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                      <td className="p-5 font-semibold text-white">{u.name}</td>
                      <td className="p-5">
                        <span className="bg-[rgba(3,7,18,0.6)] px-3 py-1.5 rounded-md text-sm font-mono text-[#9ca3af] border border-[rgba(255,255,255,0.05)]">{u.login}</span>
                      </td>
                      <td className="p-5">
                        <span className="bg-[rgba(3,7,18,0.6)] px-3 py-1.5 rounded-md text-sm font-mono text-[#9ca3af] border border-[rgba(255,255,255,0.05)]">{u.pw}</span>
                      </td>
                      <td className="p-5">
                        <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-student'}`}>
                          {u.role === 'admin' ? '⚙️ Admin' : '📚 Élève'}
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEditUser(u)}
                            className="p-2 text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          {u.login !== user.login && u.role !== 'admin' && (
                            <button 
                              onClick={() => deleteUser(u.login)}
                              className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar Matières */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <h3 className="text-lg font-bold mb-3 font-['Outfit'] uppercase tracking-widest text-[#9ca3af] text-sm">1. Choisir la matière</h3>
              {Object.entries(subjects).map(([id, m]) => (
                <button
                  key={id}
                  onClick={() => setSelectedSubj(id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                    selectedSubj === id 
                      ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] text-white' 
                      : 'bg-[rgba(17,24,39,0.5)] border-[rgba(255,255,255,0.05)] hover:border-indigo-500/30 text-[#9ca3af] hover:text-white'
                  }`}
                >
                  <span className="text-2xl drop-shadow-md">{m.icon === '🇬🇧' ? '🌍' : m.icon}</span>
                  <span className="font-bold flex-1 text-[1.05rem] font-['Outfit']">{m.name}</span>
                </button>
              ))}
            </div>

            {/* Contenu */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold mb-5 font-['Outfit'] uppercase tracking-widest text-[#9ca3af] text-sm">2. Gérer le contenu : <span className="text-white capitalize">{subjects[selectedSubj].name}</span></h3>
              
              <div className="flex gap-2 mb-8 bg-[rgba(17,24,39,0.5)] p-2 rounded-2xl border border-[rgba(255,255,255,0.05)] w-fit shadow-lg backdrop-blur-md">
                {[
                  { id: 'fiches', icon: <BookOpen size={18} />, label: 'Fiches Markdown' },
                  { id: 'qcm', icon: <Brain size={18} />, label: 'QCM' },
                  { id: 'videos', icon: <Video size={18} />, label: 'Vidéos' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setContentTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                      contentTab === tab.id 
                        ? 'bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.4)]' 
                        : 'text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {contentSuccess && <div className="mb-8 p-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium">{contentSuccess}</div>}

              {/* TAB: FICHES */}
              {contentTab === 'fiches' && (
                <div className="animate-in fade-in">
                  <div className="glass-card p-10 border-indigo-500/20 bg-gradient-to-br from-[rgba(17,24,39,0.8)] to-[rgba(99,102,241,0.05)] mb-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-['Outfit']">
                      <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <PlusCircle size={20} className="text-indigo-400" /> 
                      </div>
                      {editingFiche !== null ? 'Modifier la Fiche Markdown' : 'Créer une Fiche Markdown'}
                    </h3>
                    <form onSubmit={handleAddFiche}>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="input-group">
                          <label>Titre de la fiche</label>
                          <input type="text" className="input-field" value={ficheTitle} onChange={e => setFicheTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                          <label>Niveau</label>
                          <input type="text" className="input-field" value={ficheNiveau} onChange={e => setFicheNiveau(e.target.value)} placeholder="Ex: Fondamental, Expert..." required />
                        </div>
                      </div>
                      <div className="input-group mb-8">
                        <label className="flex items-center justify-between">
                          <span>Contenu Markdown</span>
                          <span className="text-xs font-normal lowercase bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded text-[#9ca3af]">Supporte : # titres, **gras**, *italique*, - listes, `code`</span>
                        </label>
                        <textarea className="input-field min-h-[250px] font-mono text-sm leading-relaxed" value={ficheContent} onChange={e => setFicheContent(e.target.value)} placeholder="# Titre principal&#10;&#10;## Sous-titre&#10;&#10;**Texte en gras** et *italique*." required />
                      </div>
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2">{editingFiche !== null ? 'Sauvegarder les modifications' : 'Ajouter la fiche'}</button>
                        {editingFiche !== null && (
                          <button type="button" onClick={cancelEditFiche} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold mb-6 font-['Outfit']">Fiches existantes ({subjects[selectedSubj].fiches.length})</h3>
                    <div className="flex flex-col gap-3">
                      {subjects[selectedSubj].fiches.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[rgba(17,24,39,0.5)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-indigo-500/30 transition-colors group">
                          <div>
                            <div className="font-bold text-[1.05rem] mb-1 group-hover:text-indigo-300 transition-colors">{f.title}</div>
                            <div className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest">{f.niveau}</div>
                          </div>
                          <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditFiche(i)} className="text-indigo-400 hover:bg-indigo-400/10 p-2.5 rounded-lg transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => deleteFiche(selectedSubj, i)} className="text-rose-400 hover:bg-rose-400/10 p-2.5 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: QCM */}
              {contentTab === 'qcm' && (
                <div className="animate-in fade-in">
                  <div className="glass-card p-10 border-emerald-500/20 bg-gradient-to-br from-[rgba(17,24,39,0.8)] to-[rgba(52,211,153,0.05)] mb-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-['Outfit']">
                      <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <PlusCircle size={20} className="text-emerald-400" />
                      </div>
                      {editingQCM !== null ? 'Modifier la question QCM' : 'Ajouter une question QCM'}
                    </h3>
                    <form onSubmit={handleAddQCM}>
                      <div className="input-group mb-6">
                        <label>Question</label>
                        <input type="text" className="input-field" value={qcmQuestion} onChange={e => setQcmQuestion(e.target.value)} required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="input-group mb-0">
                          <label>Option 1</label>
                          <input type="text" className="input-field" value={qcmOpt1} onChange={e => setQcmOpt1(e.target.value)} required />
                        </div>
                        <div className="input-group mb-0">
                          <label>Option 2</label>
                          <input type="text" className="input-field" value={qcmOpt2} onChange={e => setQcmOpt2(e.target.value)} required />
                        </div>
                        <div className="input-group mb-0">
                          <label>Option 3 (facultatif)</label>
                          <input type="text" className="input-field" value={qcmOpt3} onChange={e => setQcmOpt3(e.target.value)} />
                        </div>
                        <div className="input-group mb-0">
                          <label>Option 4 (facultatif)</label>
                          <input type="text" className="input-field" value={qcmOpt4} onChange={e => setQcmOpt4(e.target.value)} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="input-group mb-0">
                          <label>Index de la bonne réponse (0 = Opt 1, 1 = Opt 2...)</label>
                          <input type="number" min="0" max="3" className="input-field" value={qcmAnswer} onChange={e => setQcmAnswer(e.target.value)} required />
                        </div>
                        <div className="input-group mb-0">
                          <label>Explication de la réponse</label>
                          <input type="text" className="input-field" value={qcmExpl} onChange={e => setQcmExpl(e.target.value)} required />
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-[0_4px_15px_rgba(52,211,153,0.3)] text-white">
                          {editingQCM !== null ? 'Sauvegarder les modifications' : 'Ajouter la question'}
                        </button>
                        {editingQCM !== null && (
                          <button type="button" onClick={cancelEditQCM} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold mb-6 font-['Outfit']">Questions existantes ({subjects[selectedSubj].qcm.length})</h3>
                    <div className="flex flex-col gap-3">
                      {subjects[selectedSubj].qcm.map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[rgba(17,24,39,0.5)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-emerald-500/30 transition-colors group">
                          <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{q.q}</div>
                          <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditQCM(i)} className="text-indigo-400 hover:bg-indigo-400/10 p-2.5 rounded-lg transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => deleteQCM(selectedSubj, i)} className="text-rose-400 hover:bg-rose-400/10 p-2.5 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: VIDEOS */}
              {contentTab === 'videos' && (
                <div className="animate-in fade-in">
                  <div className="glass-card p-10 border-blue-500/20 bg-gradient-to-br from-[rgba(17,24,39,0.8)] to-[rgba(59,130,246,0.05)] mb-10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-['Outfit']">
                      <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <PlusCircle size={20} className="text-blue-400" />
                      </div>
                      {editingVideo !== null ? 'Modifier la Vidéo' : 'Ajouter une Vidéo YouTube'}
                    </h3>
                    <form onSubmit={handleAddVideo}>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="input-group">
                          <label>Titre de la vidéo</label>
                          <input type="text" className="input-field" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                          <label>Nom de la chaîne</label>
                          <input type="text" className="input-field" value={videoChannel} onChange={e => setVideoChannel(e.target.value)} required />
                        </div>
                      </div>
                      <div className="input-group mb-8">
                        <label>ID YouTube ou Lien complet</label>
                        <input type="text" className="input-field" value={videoId} onChange={e => setVideoId(e.target.value)} placeholder="Ex: dQw4w9WgXcQ ou https://youtube.com/watch?v=..." required />
                      </div>
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_4px_15px_rgba(59,130,246,0.3)]">
                          {editingVideo !== null ? 'Sauvegarder les modifications' : 'Ajouter la vidéo'}
                        </button>
                        {editingVideo !== null && (
                          <button type="button" onClick={cancelEditVideo} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-8">
                    <h3 className="text-2xl font-bold mb-6 font-['Outfit']">Vidéos existantes ({subjects[selectedSubj].videos.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {subjects[selectedSubj].videos.map((v) => (
                        <div key={v.id} className="flex gap-4 p-4 bg-[rgba(17,24,39,0.5)] rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-blue-500/30 transition-colors group">
                          <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt="" className="w-28 h-auto rounded-lg object-cover" />
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="font-bold text-[1.05rem] mb-1 truncate group-hover:text-blue-300 transition-colors">{v.title}</div>
                            <div className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest">{v.channel}</div>
                          </div>
                          <div className="flex flex-col justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEditVideo(v.id)} className="text-indigo-400 hover:bg-indigo-400/10 p-2 rounded-lg transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteVideo(selectedSubj, v.id)} className="text-rose-400 hover:bg-rose-400/10 p-2 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
