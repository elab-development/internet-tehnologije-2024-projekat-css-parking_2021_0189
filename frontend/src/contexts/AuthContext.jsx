// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guestProgress, setGuestProgress] = useState({});

  // Podešavanje osnovnog URL-a za Axios
  axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedGuestProgress = localStorage.getItem('guestProgress');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Postavi defaultno Authorization header za sve Axios zahteve
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Proveri validnost tokena
      axios.get('/user')
        .then(response => {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Greška pri proveri tokena:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    
    if (savedGuestProgress) {
      setGuestProgress(JSON.parse(savedGuestProgress));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login', { email, password });
      const { user, access_token } = response.data;
      
      setUser(user);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      // Postavi token za buduće zahteve
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Neispravna prijava' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/register', userData);
      const { user, access_token } = response.data;
      
      setUser(user);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.errors || 'Došlo je do greške' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    
    // Pozovi API za logout
    axios.post('/logout').catch(error => {
      console.error('Greška pri odjavljivanju:', error);
    });
  };

  const saveGuestProgress = (levelId, duration) => {
    const newProgress = { ...guestProgress, [levelId]: duration };
    setGuestProgress(newProgress);
    localStorage.setItem('guestProgress', JSON.stringify(newProgress));
  };

  const value = {
    user,
    login,
    register,
    logout,
    guestProgress,
    saveGuestProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};