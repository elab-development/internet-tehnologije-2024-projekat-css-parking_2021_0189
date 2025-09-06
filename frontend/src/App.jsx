import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import Levels from './pages/Levels';
import Level from './pages/Level';
import Settings from './pages/Settings';
import Leaderboards from './pages/Leaderboards';
import LeaderboardLevel from './pages/LeaderboardLevel';
import LevelDesigner from './pages/LevelDesigner';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <LandingPage/> 
              </PublicRoute>
              }/>
            <Route path="/login" element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
              }/>
            <Route path="/register" element={
              <PublicRoute>
                <Register/>
              </PublicRoute>
              }/>
            <Route path="/levels" element={
                <Levels/>
              }/>
            <Route path="/level/:levelOrder" element={
                <Level/>
              }/>
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings/> 
              </ProtectedRoute>
            }/>
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/leaderboards/:levelOrder" element={<LeaderboardLevel />} />

            <Route path="/admin/level-designer" element={
              <ProtectedRoute requiredRole="admin">
                <LevelDesigner />
              </ProtectedRoute>
            }/>
            <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                    <Dashboard />
                </ProtectedRoute>
            } />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
