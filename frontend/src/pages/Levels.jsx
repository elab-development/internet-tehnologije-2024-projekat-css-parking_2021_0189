import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../components/UI/Navbar';

const Levels = () => {
  const { user, guestProgress } = useAuth();
  const [levels, setLevels] = useState([]);
  const [completedLevels, setCompletedLevels] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        // Ako je ulogovan → koristi /user-levels-status
        const res = user 
          ? await axios.get('/user-levels-status')
          : await axios.get('/levels');

        const levelsData = res.data.data || res.data; // API razlike
        setLevels(levelsData);

        if (user) {
          // Za ulogovanog korisnika, mapiraj completed status
          const completed = {};
          levelsData.forEach(lvl => {
            completed[lvl.id] = lvl.completed;
          });
          setCompletedLevels(completed);
        } else {
          // Za gosta → koristi guestProgress iz localStorage
          setCompletedLevels(guestProgress);
        }
      } catch (err) {
        if (err.response) {
            console.error('Greška API-a:', err.response.data);
        } else {
            console.error('Greška pri učitavanju nivoa:', err.message);
        }
    }
    };

    fetchLevels();
  }, [user, guestProgress]);

  const handleLevelClick = (levelId) => {
    navigate(`/level/${levelId}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom pt-20'>
        <Navbar />
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {levels.map((level) => (
                <div 
                key={level.id} 
                className="relative bg-blue-500 text-white rounded-2xl p-6 flex items-center justify-center cursor-pointer hover:scale-105 transform transition"
                onClick={() => handleLevelClick(level.id)}
                >
                    <span className="text-xl font-bold">{level.order}</span>

                    {completedLevels[level.id] && (
                        <FaCheckCircle className="absolute top-2 right-2 text-green-400 text-lg" />
                    )}
                </div>
            ))}
        </div>
    </div>
  );
};

export default Levels;
