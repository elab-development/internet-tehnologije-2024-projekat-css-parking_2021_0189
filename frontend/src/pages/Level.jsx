import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import GameDisplay from '../components/Game/GameDisplay';
import CssEditor from '../components/Game/CssEditor';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/UI/Navbar';

export default function Level() {
  const { levelOrder } = useParams();
  const navigate = useNavigate();
  const { user, saveGuestProgress } = useAuth();

  const [level, setLevel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userCss, setUserCss] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const playgroundRef = useRef(null);
  const playerRef = useRef(null);
  const playerSvgRef = useRef(null);
  const targetRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setLevel(null);

    axios.get(`/levels/order/${levelOrder}`)
      .then(res => {
        if (!mounted) return;
        const data = res.data.data ?? res.data ?? res; // tolerate different API shapes
        setLevel(data);
        // reset editor & feedback
        setUserCss(data.initialCss || '');
        setIsCorrect(false);
        setIsIncorrect(false);
        startTimeRef.current = Date.now();
      })
      .catch(err => {
        setError('Nivo nije pronađen.');
      })
      .finally(() => setLoading(false));

    return () => { mounted = false; };
  }, [levelOrder]);


  const isFullyContained = (el1, el2) => {
    if (!el1 || !el2) return false;
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    // require player entirely inside target with small tolerance
    const tol = 1; // px tolerance
    return (r1.left + tol) >= r2.left &&
           (r1.top + tol) >= r2.top &&
           (r1.right - tol) <= r2.right &&
           (r1.bottom - tol) <= r2.bottom;
  };

  const handleCheck = () => {
    if (!level) return;
    const playerEl = playerSvgRef.current;
    // try to find target inside playground if ref not attached
    const targetEl = targetRef.current || playgroundRef.current?.querySelector('[data-target="true"]');
    if (!playerEl || !targetEl) {
      setIsCorrect(false);
      setIsIncorrect(true);
      return;
    }
    const ok = isFullyContained(playerEl, targetEl);
    setIsCorrect(ok);
    setIsIncorrect(!ok);

    if (ok) {
      const durationSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      // save progress for guest or logged user
      if (user) {
        // try to POST progress to backend; ignore errors
        axios.post(`/user-levels`, { level_id: level.id, duration: durationSeconds })
          .catch(() => {});
      } else {
        saveGuestProgress(level.id, durationSeconds);
      }
    }
  };

  const handleNext = () => {
    // naive next: assume API returns next_id or use numeric increment
    if (!level) return navigate('/levels');
    // fallback: try increment numeric id
    const nextId = String(Number(levelOrder) + 1);
    navigate(`/level/${nextId}`);
  };

  if (loading) return <div className="p-6">Učitavanje nivoa…</div>;
  if (error) return <div className="p-6 text-red-600">{error || 'Greška pri učitavanju nivoa'}</div>;
  if (!level) return;

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 text-center font-custom pt-20'>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{level.title}</h1>
            {level.description && <p className="text-sm text-gray-600">{level.description}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* left: editor + action buttons directly below it */}
          <div className="flex flex-col gap-4">
            <CssEditor
              userCss={userCss}
              setUserCss={setUserCss}
            />

            <div className="flex items-center gap-3 justify-start">
              <button
                onClick={() => navigate('/levels')}
                className="flex-none w-32 px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Nazad
              </button>

              <button
                onClick={handleCheck}
                className="flex-none w-32 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Proveri rešenje
              </button>

              {isCorrect && (
                <button
                  onClick={handleNext}
                  className="flex-none w-32 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Sledeći
                </button>
              )}
            </div>

            {/* small feedback text under the buttons */}
            <div className="text-sm text-left text-gray-600">
              {isCorrect && <span className="text-green-600 font-medium">Uspešno parkiranje!</span>}
              {isIncorrect && <span className="text-red-600 font-medium">Pokušaj ponovo!</span>}
            </div>
          </div>

          {/* right: game display */}
          <div>
            <GameDisplay
              level={level}
              userCss={userCss}
              playgroundRef={playgroundRef}
              playerRef={playerRef}
              playerSvgRef={playerSvgRef}
              targetRef={targetRef}
              isCorrect={isCorrect}
            />

          </div>
        </div>
      </div>
    </div>
  );
}