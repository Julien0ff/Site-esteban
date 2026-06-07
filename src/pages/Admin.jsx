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
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2 flex items-center gap-3">
          <ShieldAlert className="text-[#ff6584]" size={36} />
          Administration
        </h1>
        <p className="text-[#8b92b2] text-lg">Gérez les accès élèves et le contenu des cours</p>
      </div>

      <div className="flex gap-2 mb-8 border-b border-[rgba(255,255,255,0.05)] pb-4">
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'users' ? 'bg-[#ff6584] text-white' : 'text-[#8b92b2] hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <UserPlus size={18} /> Gestion des Élèves
        </button>
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'content' ? 'bg-[#6c63ff] text-white' : 'text-[#8b92b2] hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <Database size={18} /> Gestion du Contenu
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-card p-8 mb-8 border-[#ff6584] bg-gradient-to-br from-[rgba(30,33,48,0.7)] to-[rgba(255,101,132,0.05)]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserPlus size={20} className="text-[#ff6584]" />
              {editingUser ? 'Modifier un compte' : 'Ajouter un élève'}
            </h3>
            
            {userError && <div className="mb-4 p-3 bg-[rgba(255,101,132,0.1)] text-[#ff6584] border border-[rgba(255,101,132,0.3)] rounded-lg text-sm">{userError}</div>}
            {userSuccess && <div className="mb-4 p-3 bg-[rgba(67,233,123,0.1)] text-[#43e97b] border border-[rgba(67,233,123,0.3)] rounded-lg text-sm">{userSuccess}</div>}

            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="input-group mb-0">
                <label>Prénom Nom</label>
                <input type="text" className="input-field py-2.5 px-4" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="input-group mb-0">
                <label>Identifiant</label>
                <input type="text" className="input-field py-2.5 px-4" value={login} onChange={e => setLogin(e.target.value)} />
              </div>
              <div className="input-group mb-0">
                <label>Mot de passe</label>
                <input type="text" className="input-field py-2.5 px-4" value={pw} onChange={e => setPw(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <button type="submit" className="btn-primary py-2.5 px-4 h-11 flex items-center justify-center bg-gradient-to-r from-[#ff6584] to-[#f093fb]">
                  {editingUser ? 'Enregistrer' : 'Ajouter'}
                </button>
                {editingUser && (
                  <button type="button" onClick={cancelEditUser} className="btn-outline py-1.5 px-4 h-9 flex items-center justify-center text-xs">
                    Annuler
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
              <h3 className="text-xl font-bold">Liste des comptes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[rgba(15,17,26,0.6)]">
                    <th className="p-4 text-xs font-bold text-[#8b92b2] uppercase tracking-wider">Nom</th>
                    <th className="p-4 text-xs font-bold text-[#8b92b2] uppercase tracking-wider">Identifiant</th>
                    <th className="p-4 text-xs font-bold text-[#8b92b2] uppercase tracking-wider">Mot de passe</th>
                    <th className="p-4 text-xs font-bold text-[#8b92b2] uppercase tracking-wider">Rôle</th>
                    <th className="p-4 text-xs font-bold text-[#8b92b2] uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {usersDb.map((u, i) => (
                    <tr key={i} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4">
                        <span className="bg-[rgba(15,17,26,0.8)] px-2 py-1 rounded-md text-sm font-mono text-[#8b92b2]">{u.login}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-[rgba(15,17,26,0.8)] px-2 py-1 rounded-md text-sm font-mono text-[#8b92b2]">{u.pw}</span>
                      </td>
                      <td className="p-4">
                        <span className={`badge ${u.role === 'admin' ? 'badge-admin' : 'badge-student'}`}>
                          {u.role === 'admin' ? '⚙️ Admin' : '📚 Élève'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEditUser(u)}
                            className="p-2 text-[#4facfe] hover:bg-[rgba(79,172,254,0.1)] rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          {u.login !== user.login && u.role !== 'admin' && (
                            <button 
                              onClick={() => deleteUser(u.login)}
                              className="p-2 text-[#ff6584] hover:bg-[rgba(255,101,132,0.1)] rounded-lg transition-colors"
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
        <div className="animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Matières */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              <h3 className="text-lg font-bold mb-2">1. Choisir une matière</h3>
              {Object.entries(subjects).map(([id, m]) => (
                <button
                  key={id}
                  onClick={() => setSelectedSubj(id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    selectedSubj === id 
                      ? 'bg-[rgba(108,99,255,0.1)] border-[#6c63ff] shadow-[0_0_15px_rgba(108,99,255,0.2)]' 
                      : 'bg-[rgba(15,17,26,0.5)] border-[rgba(255,255,255,0.05)] hover:border-[#8b92b2]'
                  }`}
                >
                  <span className="text-2xl">{m.icon === '🇬🇧' ? '🌍' : m.icon}</span>
                  <span className="font-bold flex-1">{m.name}</span>
                </button>
              ))}
            </div>

            {/* Contenu */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold mb-4">2. Gérer le contenu : {subjects[selectedSubj].name}</h3>
              
              <div className="flex gap-2 mb-6 bg-[rgba(15,17,26,0.6)] p-1.5 rounded-xl border border-[rgba(255,255,255,0.05)] w-fit">
                {[
                  { id: 'fiches', icon: <BookOpen size={16} />, label: 'Fiches' },
                  { id: 'qcm', icon: <Brain size={16} />, label: 'QCM' },
                  { id: 'videos', icon: <Video size={16} />, label: 'Vidéos' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setContentTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      contentTab === tab.id 
                        ? 'bg-[#6c63ff] text-white shadow-[0_4px_12px_rgba(108,99,255,0.3)]' 
                        : 'text-[#8b92b2] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {contentSuccess && <div className="mb-6 p-4 bg-[rgba(67,233,123,0.1)] text-[#43e97b] border border-[rgba(67,233,123,0.3)] rounded-xl font-medium">{contentSuccess}</div>}

              {/* TAB: FICHES */}
              {contentTab === 'fiches' && (
                <div className="animate-in fade-in">
                  <div className="glass-card p-6 border-[#6c63ff] bg-gradient-to-br from-[rgba(30,33,48,0.7)] to-[rgba(108,99,255,0.05)] mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <PlusCircle size={18} className="text-[#6c63ff]" /> {editingFiche !== null ? 'Modifier la Fiche' : 'Créer une Fiche'}
                    </h3>
                    <form onSubmit={handleAddFiche}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                          <label>Titre de la fiche</label>
                          <input type="text" className="input-field" value={ficheTitle} onChange={e => setFicheTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                          <label>Niveau</label>
                          <input type="text" className="input-field" value={ficheNiveau} onChange={e => setFicheNiveau(e.target.value)} required />
                        </div>
                      </div>
                      <div className="input-group mb-6">
                        <label>Contenu Markdown</label>
                        <textarea className="input-field min-h-[150px] font-mono text-sm" value={ficheContent} onChange={e => setFicheContent(e.target.value)} placeholder="# Titre principal&#10;&#10;## Sous-titre&#10;&#10;**Texte en gras** et *italique*." required />
                      </div>
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2">{editingFiche !== null ? 'Sauvegarder les modifications' : 'Ajouter la fiche'}</button>
                        {editingFiche !== null && (
                          <button type="button" onClick={cancelEditFiche} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-4">Fiches existantes ({subjects[selectedSubj].fiches.length})</h3>
                    <div className="flex flex-col gap-2">
                      {subjects[selectedSubj].fiches.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[rgba(15,17,26,0.5)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                          <div>
                            <div className="font-semibold">{f.title}</div>
                            <div className="text-xs text-[#8b92b2]">{f.niveau}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditFiche(i)} className="text-[#4facfe] hover:bg-[rgba(79,172,254,0.1)] p-2 rounded-md">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteFiche(selectedSubj, i)} className="text-[#ff6584] hover:bg-[rgba(255,101,132,0.1)] p-2 rounded-md">
                              <Trash2 size={16} />
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
                  <div className="glass-card p-6 border-[#43e97b] bg-gradient-to-br from-[rgba(30,33,48,0.7)] to-[rgba(67,233,123,0.05)] mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <PlusCircle size={18} className="text-[#43e97b]" /> {editingQCM !== null ? 'Modifier la question QCM' : 'Ajouter une question QCM'}
                    </h3>
                    <form onSubmit={handleAddQCM}>
                      <div className="input-group">
                        <label>Question</label>
                        <input type="text" className="input-field" value={qcmQuestion} onChange={e => setQcmQuestion(e.target.value)} required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
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

                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                          <label>Index de la bonne réponse (0 = Opt 1, 1 = Opt 2...)</label>
                          <input type="number" min="0" max="3" className="input-field" value={qcmAnswer} onChange={e => setQcmAnswer(e.target.value)} required />
                        </div>
                        <div className="input-group">
                          <label>Explication de la réponse</label>
                          <input type="text" className="input-field" value={qcmExpl} onChange={e => setQcmExpl(e.target.value)} required />
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-4">
                        <button type="submit" className="btn-primary flex items-center gap-2 !bg-[#43e97b] !text-[#0b0c10] hover:!filter hover:!brightness-110 shadow-[0_4px_15px_rgba(67,233,123,0.3)]">
                          {editingQCM !== null ? 'Sauvegarder les modifications' : 'Ajouter la question'}
                        </button>
                        {editingQCM !== null && (
                          <button type="button" onClick={cancelEditQCM} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-4">Questions existantes ({subjects[selectedSubj].qcm.length})</h3>
                    <div className="flex flex-col gap-2">
                      {subjects[selectedSubj].qcm.map((q, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-[rgba(15,17,26,0.5)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                          <div className="font-medium">{q.q}</div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditQCM(i)} className="text-[#4facfe] hover:bg-[rgba(79,172,254,0.1)] p-2 rounded-md">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteQCM(selectedSubj, i)} className="text-[#ff6584] hover:bg-[rgba(255,101,132,0.1)] p-2 rounded-md">
                              <Trash2 size={16} />
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
                  <div className="glass-card p-6 border-[#4facfe] bg-gradient-to-br from-[rgba(30,33,48,0.7)] to-[rgba(79,172,254,0.05)] mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <PlusCircle size={18} className="text-[#4facfe]" /> {editingVideo !== null ? 'Modifier la Vidéo' : 'Ajouter une Vidéo YouTube'}
                    </h3>
                    <form onSubmit={handleAddVideo}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                          <label>Titre de la vidéo</label>
                          <input type="text" className="input-field" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required />
                        </div>
                        <div className="input-group">
                          <label>Nom de la chaîne</label>
                          <input type="text" className="input-field" value={videoChannel} onChange={e => setVideoChannel(e.target.value)} required />
                        </div>
                      </div>
                      <div className="input-group mb-6">
                        <label>ID YouTube ou Lien complet</label>
                        <input type="text" className="input-field" value={videoId} onChange={e => setVideoId(e.target.value)} placeholder="Ex: dQw4w9WgXcQ ou https://youtube.com/watch?v=..." required />
                      </div>
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2 bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
                          {editingVideo !== null ? 'Sauvegarder les modifications' : 'Ajouter la vidéo'}
                        </button>
                        {editingVideo !== null && (
                          <button type="button" onClick={cancelEditVideo} className="btn-outline flex items-center gap-2">Annuler</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-lg font-bold mb-4">Vidéos existantes ({subjects[selectedSubj].videos.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subjects[selectedSubj].videos.map((v) => (
                        <div key={v.id} className="flex gap-3 p-3 bg-[rgba(15,17,26,0.5)] rounded-lg border border-[rgba(255,255,255,0.05)]">
                          <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt="" className="w-24 h-auto rounded-md object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{v.title}</div>
                            <div className="text-xs text-[#8b92b2]">{v.channel}</div>
                          </div>
                          <div className="flex items-center gap-2 h-fit">
                            <button onClick={() => handleEditVideo(v.id)} className="text-[#4facfe] hover:bg-[rgba(79,172,254,0.1)] p-2 rounded-md">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => deleteVideo(selectedSubj, v.id)} className="text-[#ff6584] hover:bg-[rgba(255,101,132,0.1)] p-2 rounded-md">
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
