import React, { useEffect } from 'react';

/*
 Props:
  - level: { playerCar, fixedCars, parkingSpots, name, description }
  - userCss: string (transform value like "translateX(10px)" or "rotate(30deg)")
  - playgroundRef, playerRef, targetRef: refs
  - palette: array
  - isCorrect: bool
*/
export default function GameDisplay({ level, userCss = '', playgroundRef, playerRef, targetRef, palette = [], isCorrect = false }) {
  useEffect(() => {
    // CSS transform is applied inline on player element
  }, [userCss]);

  const spots = Array.isArray(level.parkingSpots) ? level.parkingSpots : [];
  const fixedCars = Array.isArray(level.fixedCars) ? level.fixedCars : [];
  const player = level.playerCar || { x: 5, y: 80, color: '#FF6347' };

  return (
    <div
      ref={playgroundRef}
      className="relative overflow-hidden rounded-xl border-4 border-gray-800 w-full mx-auto aspect-video"
      style={{ backgroundColor: palette[0] || '#E5E7EB' }}
    >
      {spots.map((spot) => (
        <div
          key={spot.id}
          ref={spot.isTarget ? targetRef : null}
          data-target={spot.isTarget ? "true" : "false"}
          className="absolute w-[10%] h-[15%] rounded-md transition-all parking-spot"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: `rotate(${spot.rotate ?? 0}deg)`,
            border: `2px solid ${isCorrect && spot.isTarget ? 'green' : (palette[3] || 'black')}`,
            zIndex: 1
          }}
        >
          <div
            className="w-[80%] h-[80%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 border-dashed"
            style={{
              borderColor: isCorrect && spot.isTarget ? 'green' : (palette[2] || 'blue'),
              backgroundColor: isCorrect && spot.isTarget ? 'rgba(0,255,0,0.2)' : 'transparent',
            }}
          />
        </div>
      ))}

      {fixedCars.map((car) => (
        <div
          key={car.id}
          className="absolute w-[8%] h-[12%] rounded-md shadow-lg"
          style={{
            left: `${car.x}%`,
            top: `${car.y}%`,
            transform: `rotate(${car.rotate ?? 0}deg)`,
            backgroundColor: car.color || '#333',
            zIndex: 2
          }}
        />
      ))}

      <div
        ref={playerRef}
        className="absolute w-[8%] h-[12%] rounded-md shadow-lg transition-transform player-car"
        style={{
          left: `${player.x}%`,
          top: `${player.y}%`,
          transform: userCss || 'none',
          backgroundColor: player.color || '#FF6347',
          zIndex: 3
        }}
      />
    </div>
  );
}