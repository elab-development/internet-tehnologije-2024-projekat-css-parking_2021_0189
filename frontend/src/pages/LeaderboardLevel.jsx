import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';

export default function LeaderboardLevel() {
  const { levelOrder } = useParams();
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    let mounted = true;
    axios.get(`/leaderboards/${levelOrder}?limit=${limit}`)
      .then(res => {
        if (!mounted) return;
        setData(res.data);
      })
      .catch(() => {})
    return () => { mounted = false; };
  }, [levelOrder, limit]);

  if (!data) return (
    <>
      <Navbar />
      <div className="p-6">Učitavanje...</div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Leaderboard — {data.levelTitle}</h2>
            <Link
            to="/leaderboards"
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 text-sm font-medium transition"
            >
            Nazad
            </Link>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600 mr-2">Prikaži top</label>
            <select value={limit} onChange={e => setLimit(Number(e.target.value))}
              className="border rounded px-2 py-1">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

          <ol className="space-y-2">
            {data.top.length === 0 && <div className="text-gray-500">Nema rezultata za ovaj nivo.</div>}
            {data.top.map((row, idx) => (
              <li key={row.id ?? idx} className="flex justify-between items-center bg-white p-3 rounded shadow">
                <div className="font-medium">{idx + 1}. {row.user?.name ?? 'Anon'}</div>
                <div className="font-mono text-blue-700">{row.duration}s</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}