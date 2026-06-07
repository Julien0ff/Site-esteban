import { createContext, useState, useEffect, useContext } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { MATIERES as initialMatieres } from './data/db';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [subjects, setSubjects] = useState({});
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'subjects'), (snapshot) => {
      const newSubjects = {};
      snapshot.forEach(doc => {
        newSubjects[doc.id] = doc.data();
      });

      if (Object.keys(newSubjects).length === 0) {
        // Initialize if empty
        Object.entries(initialMatieres).forEach(async ([id, data]) => {
          await setDoc(doc(db, 'subjects', id), data);
        });
      } else {
        setSubjects(newSubjects);
      }
      setLoadingData(false);
    });

    return () => unsubscribe();
  }, []);

  const saveSubject = async (subjectId, subjectData) => {
    await setDoc(doc(db, 'subjects', subjectId), subjectData);
  };

  const addFiche = (subjectId, fiche) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.fiches = [...newSubj.fiches, fiche];
    saveSubject(subjectId, newSubj);
  };

  const updateFiche = (subjectId, ficheIndex, newFiche) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.fiches[ficheIndex] = newFiche;
    saveSubject(subjectId, newSubj);
  };

  const deleteFiche = (subjectId, ficheIndex) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.fiches.splice(ficheIndex, 1);
    saveSubject(subjectId, newSubj);
  };

  const addQCM = (subjectId, qcm) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.qcm = [...newSubj.qcm, qcm];
    saveSubject(subjectId, newSubj);
  };

  const updateQCM = (subjectId, qcmIndex, newQcm) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.qcm[qcmIndex] = newQcm;
    saveSubject(subjectId, newSubj);
  };

  const deleteQCM = (subjectId, qcmIndex) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.qcm.splice(qcmIndex, 1);
    saveSubject(subjectId, newSubj);
  };

  const addVideo = (subjectId, video) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.videos = [...newSubj.videos, video];
    saveSubject(subjectId, newSubj);
  };

  const updateVideo = (subjectId, videoId, newVideo) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.videos = newSubj.videos.map(v => v.id === videoId ? newVideo : v);
    saveSubject(subjectId, newSubj);
  };

  const deleteVideo = (subjectId, videoId) => {
    const newSubj = { ...subjects[subjectId] };
    newSubj.videos = newSubj.videos.filter(v => v.id !== videoId);
    saveSubject(subjectId, newSubj);
  };

  return (
    <DataContext.Provider value={{ 
      subjects, loadingData,
      addFiche, updateFiche, deleteFiche, 
      addQCM, updateQCM, deleteQCM, 
      addVideo, updateVideo, deleteVideo 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
