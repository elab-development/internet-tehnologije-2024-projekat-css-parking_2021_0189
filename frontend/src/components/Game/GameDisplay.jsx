import { useEffect } from 'react';
import Car from './Car.jsx';

/*
 Props:
  - level: { playerCar, fixedCars, parkingSpots, name, description }
  - userCss: string (transform value like "translateX(10px)" or "rotate(30deg)")
  - playgroundRef, playerRef, targetRef, playerSvgRef: refs
  - isCorrect: bool
*/
export default function GameDisplay({ level, userCss = '', playgroundRef, playerRef, playerSvgRef, targetRef, isCorrect = false }) {
  useEffect(() => {
    
  }, [userCss]);

  const spots = Array.isArray(level.parking_spots) ? level.parking_spots : [];
  const player = level.player_car;
  return (
    <div
      ref={playgroundRef}
      className="relative overflow-hidden rounded-xl border-4 border-gray-800 w-full mx-auto aspect-video"
      style={{ backgroundColor: level.base_color }}
    >
      {spots.map((spot) => {
        const isTargetAndCorrect = isCorrect && spot.is_target;

        return (
          <div
            key={spot.id}
            ref={spot.is_target ? targetRef : null}
            data-target={spot.is_target ? "true" : "false"}
            className="absolute transition-all"
            style={{
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              width: `${spot.width}%`,
              height: `${spot.height}%`,
              transform: `rotate(${spot.rotate ?? 0}deg) skew(${spot.skew?.x ?? 0}deg, ${spot.skew?.y ?? 0}deg) scale(${player.scale?.x ?? 1}, ${player.scale?.y ?? 1})`,
              border: `2px solid ${isTargetAndCorrect ? 'green' : 'white'}`,
              boxSizing: 'border-box',
              zIndex: spot.is_target ? 2 : 1
            }}
          >
            {/* Ako nije target, stavimo Car komponentu unutra */}
            {!spot.is_target && (
              <Car
                color={spot.color}
                className="w-full h-full rounded-none"
                style={{ width: '100%', height: '100%', }}
              />
            )}
            {/* Target je prazan, border menja boju kada je isCorrect */}
          </div>
        );
      })}


      <Car
        color={player.color}
        ref={playerRef}
        svgRef={playerSvgRef}
        className="absolute transition-transform player-car"
        style={{

          left: `${player.x}%`,
          top: `${player.y}%`,
          width: `${player.width}%`,
          height: `${player.height}%`,
          transform: `${userCss || ''} rotate(${player.rotate ?? 0}deg) scale(${player.scale?.x ?? 1}, ${player.scale?.y ?? 1})`,
          zIndex: 3,
          border: '2px solid transparent',
        }}
      />
    </div>
  );
}