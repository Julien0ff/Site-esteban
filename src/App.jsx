import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider, useData } from './DataContext';

// Pages
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SubjectList from './pages/SubjectList';
import SubjectDetail from './pages/SubjectDetail';
import Annales from './pages/Annales';
import Admin from './pages/Admin';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

import ForcePasswordChange from './components/ForcePasswordChange';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      
      <Route path="/" element={<ProtectedRoute><ForcePasswordChange><Layout /></ForcePasswordChange></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="matieres" element={<SubjectList />} />
        <Route path="matieres/:id" element={<SubjectDetail />} />
        <Route path="annales" element={<Annales />} />
        <Route path="admin" element={<ProtectedRoute requireAdmin><Admin /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

const AppContent = () => {
  const { loadingAuth } = useAuth();
  const { loadingData } = useData();

  if (loadingAuth || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0c10]">
        <div className="w-12 h-12 border-4 border-[#ff6584] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <AppRoutes />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
