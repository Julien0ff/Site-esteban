import { createContext, useState, useEffect, useContext } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { initialUsers } from './data/db';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('brevet_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [usersDb, setUsersDb] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const users = [];
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      
      if (users.length === 0) {
        initialUsers.forEach(async (u) => {
          await setDoc(doc(collection(db, 'users'), u.login), u);
        });
      } else {
        setUsersDb(users);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (loginId, pw) => {
    const found = usersDb.find(u => u.login === loginId && u.pw === pw);
    if (found) {
      setUser(found);
      localStorage.setItem('brevet_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brevet_user');
  };

  const addUser = async (newUser) => {
    if (usersDb.find(u => u.login === newUser.login)) {
      return false; // Already exists
    }
    await setDoc(doc(db, 'users', newUser.login), newUser);
    return true;
  };

  const updateUser = async (oldLogin, updatedUser) => {
    if (oldLogin !== updatedUser.login) {
      if (usersDb.find(u => u.login === updatedUser.login)) {
        return false;
      }
      await setDoc(doc(db, 'users', updatedUser.login), updatedUser);
      await deleteDoc(doc(db, 'users', oldLogin));
    } else {
      await updateDoc(doc(db, 'users', oldLogin), updatedUser);
    }
    
    if (user && user.login === oldLogin) {
      setUser(updatedUser);
      localStorage.setItem('brevet_user', JSON.stringify(updatedUser));
    }
    return true;
  };

  const deleteUser = async (loginId) => {
    await deleteDoc(doc(db, 'users', loginId));
    if (user && user.login === loginId) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, usersDb, login, logout, addUser, updateUser, deleteUser, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
