import { Layout } from './layouts';
import { Login, Dashboard } from './pages';
import { AuthProvider, useAuth } from './providers';
import { useEffect } from 'react';

function AppContent() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuthFromStorage = () => {
      try {
        const authData = localStorage.getItem('auth-storage');
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.isAuthenticated && parsed.token && parsed.user && 
              (!parsed.expiresAt || Date.now() < parsed.expiresAt)) {
            return;
          }
        }
      } catch (error) {
        console.error('Error checking auth from storage:', error);
        localStorage.removeItem('auth-storage');
      }
    };

    checkAuthFromStorage();
  }, []);

  return <Layout>{isAuthenticated ? <Dashboard /> : <Login />}</Layout>;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
