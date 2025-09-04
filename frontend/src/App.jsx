import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import Levels from './pages/Levels';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
