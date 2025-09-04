import { useEffect } from 'react';
import Car from './Car.jsx';

/*
 Props:
  - level: { playerCar, fixedCars, parkingSpots, name, description }
  - userCss: string (transform value like "translateX(10px)" or "rotate(30deg)")
  - playgroundRef, playerRef, targetRef: refs
  - palette: array
  - isCorrect: bool
*/
export default function GameDisplay({ level, userCss = '', playgroundRef, playerRef, targetRef, isCorrect = false }) {
  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(player)), player.color)
    // CSS transform is applied inline on player element
  }, [userCss]);

  const spots = Array.isArray(level.parking_spots) ? level.parking_spots : [];
  const player = level.player_car;
  return (
    <div
      ref={playgroundRef}
      className="relative overflow-hidden rounded-xl border-4 border-gray-800 w-full mx-auto aspect-video"
      style={{ backgroundColor: level.base_color }}
    >
      {spots.map((spot) => (
        <div
          key={spot.id}
          ref={spot.is_target ? targetRef : null}
          data-target={spot.is_target ? "true" : "false"}
          className="absolute w-[10%] h-[15%] rounded-md transition-all parking-spot"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: `rotate(${spot.rotate ?? 0}deg) skew(${spot.skew ?? 0}deg)`,
            border: `2px solid ${isCorrect && spot.is_target ? 'green' : ('white' || 'black')}`,
            zIndex: 1
          }}
        >
          <div
            className="w-[80%] h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-dashed"
            style={{
              borderColor: isCorrect && spot.is_target ? 'green' : ('white' || 'blue'),
              backgroundColor: isCorrect && spot.is_target ? 'rgba(0,255,0,0.2)' : 'transparent',
            }}
          />
        </div>
      ))}

      <Car
        color = {player.color || '#d9ff00ff'}
        ref={playerRef}
        className="absolute w-[8%] h-[12%] rounded-md transition-transform player-car"
        style={{
          left: `${player.x}%`,
          top: `${player.y}%`,
          transform: userCss || 'none',
          zIndex: 3
        }}
      />
    </div>
  );
}