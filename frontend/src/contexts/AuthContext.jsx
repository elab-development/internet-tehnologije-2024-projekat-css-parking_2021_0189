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
      const payload = { ...userData };
      // Ako postoji guestProgress, pošalji ga serveru
      if (Object.keys(guestProgress).length > 0) {
        payload.progress = Object.entries(guestProgress).map(([levelId, duration]) => ({
          level_id: levelId,
          duration
        }));
      }
      const response = await axios.post('/register', payload);
      const { user, access_token } = response.data;
      
      setUser(user);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Očisti guest progress nakon registracije
      setGuestProgress({});
      localStorage.removeItem('guestProgress');
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.errors || 'Došlo je do greške' 
      };
    }
  };

  const logout = () => {
    // Pozovi API za logout
    axios.post('/logout').catch(error => {
      console.error('Greška pri odjavljivanju:', error);
    });
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const saveGuestProgress = (levelId, duration) => {
    const id = String(levelId);
    const dur = Number(duration);
    if (Number.isNaN(dur)) return false;

    const prev = guestProgress[id];
    // Ako nema prethodnog rezultata ili je novi bolji (manji), sačuvaj
    if (prev === undefined || dur < Number(prev)) {
      const newProgress = { ...guestProgress, [id]: dur };
      setGuestProgress(newProgress);
      localStorage.setItem('guestProgress', JSON.stringify(newProgress));
      return true;
    }
    return false;
  };

  const deleteAccount = async () => {
    try {
      // prvo pokušaj standardnu (baseURL + /user)
      await axios.delete('/user');
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    } catch (err) {
      throw err;
    }
  };

  // Ažuriranje naloga (koristi se iz Settings)
  const updateAccount = async (payload) => {
    try {
      const res = await axios.put('/user', payload);
      const updatedUser = res.data;
      // Ažuriraj kontekst i localStorage
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      if (err.response?.status === 422) {
        return { success: false, errors: err.response.data.errors || {}, message: 'Došlo je do greške pri validaciji.' };
      }
      return { success: false, message: err.response?.data?.message || 'Neuspešno ažuriranje.' };
    }
  };
 
   const value = {
     user,
     login,
     register,
     logout,
     guestProgress,
     deleteAccount,
     updateAccount,
     saveGuestProgress
   };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};