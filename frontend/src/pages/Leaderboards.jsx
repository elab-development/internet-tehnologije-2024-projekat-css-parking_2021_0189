import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';

export default function Leaderboards() {
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    axios.get('/leaderboards')
      .then(res => {
        if (!mounted) return;
        setLevels(res.data);
      })
      .catch(() => {})
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-20">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Leaderboards</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {levels.map(l => (
              <button
                key={l.order}
                onClick={() => navigate(`/leaderboards/${l.order}`)}
                className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md transition"
              >
                <div className="font-semibold">{l.title}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {l.best
                    ? `Best: ${l.best.duration}s — ${l.best.user?.name ?? 'anon'}`
                    : 'Nema rezultata'}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}