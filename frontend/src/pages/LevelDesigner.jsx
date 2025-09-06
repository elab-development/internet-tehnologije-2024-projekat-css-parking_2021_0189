import { useState } from "react";
import GameDisplay from "../components/Game/GameDisplay";
import Navbar from "../components/UI/Navbar";
import axios from "axios";

export default function LevelDesigner() {
  const [level, setLevel] = useState({
    title: "Novi nivo",
    description: "",
    order: 0,
    base_color: "#525252ff",
    player_car: {
      x: 0, y: 0, width: 10, height: 20, color: "#ff0000", rotate: 0, scale: { x: 1, y: 1 }
    },
    parking_spots: []
  });

  const [expandedId, setExpandedId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const addSpot = () => {
    const newSpot = {
      id: Date.now(),
      x: 10, y: 10, width: 10, height: 20,
      rotate: 0, skew: { x: 0, y: 0 },
      scale: { x: 1, y: 1 },
      color: "#ffffff",
      is_target: false
    };
    setLevel(prev => ({
      ...prev,
      parking_spots: [...prev.parking_spots, newSpot]
    }));
  };

  const updateSpot = (id, field, value) => {
    setLevel(prev => ({
      ...prev,
      parking_spots: prev.parking_spots.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const updateSpotNested = (id, field, subfield, value) => {
    setLevel(prev => ({
      ...prev,
      parking_spots: prev.parking_spots.map(s => 
        s.id === id ? { ...s, [field]: { ...s[field], [subfield]: value } } : s
      )
    }));
  };

  const removeSpot = (id) => {
    setLevel(prev => ({
      ...prev,
      parking_spots: prev.parking_spots.filter(s => s.id !== id)
    }));
  };

  const updatePlayer = (field, value) => {
    setLevel(prev => ({
      ...prev,
      player_car: { ...prev.player_car, [field]: value }
    }));
  };

  const updatePlayerNested = (field, subfield, value) => {
    setLevel(prev => ({
      ...prev,
      player_car: { ...prev.player_car, [field]: { ...prev.player_car[field], [subfield]: value } }
    }));
  };

  const applyPalette = async () => {
    try {
      const response = await axios.post("/color-palette");
      if (response.data.success) {
        const palette = response.data.palette; // Colormind vraća niz boja [[r,g,b], ...]
        
        // Pretvaranje rgb u hex
        const rgbToHex = (rgb) => {
          const [r, g, b] = rgb;
          return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        };

        const hexPalette = palette.map(rgbToHex);

        // Primer raspodele boja: 1. baza, 2. player, ostalo parking spots
        setLevel(prev => ({
          ...prev,
          base_color: hexPalette[0] || "#dbeafe",
          player_car: { ...prev.player_car, color: hexPalette[1] || "#ff0000" },
          parking_spots: prev.parking_spots.map((s, idx) => ({ 
            ...s, 
            color: hexPalette[(idx + 2) % hexPalette.length] || "#00ff00" 
          }))
        }));
      } else {
        showMessage("Neuspešno generisanje palete", "error");
      }
    } catch (err) {
      console.error("Error generating palette:", err);
      showMessage("Greška prilikom generisanja palete: " + (err.response?.data?.message || err.message), "error");
    }
  };

  const saveLevel = async () => {
    try {
      const response = await axios.post("/levels", level);
      showMessage("Nivo uspešno sačuvan!", "success");
      console.log("Level saved:", response.data);
    } catch (err) {
      console.error("Error saving level:", err);
      showMessage("Greška pri čuvanju nivoa: " + (err.response?.data?.message || err.message), "error");
    }
  };

  // Helper function to handle number input changes
  const handleNumberChange = (e, callback) => {
    const value = e.target.value;
    // Allow empty string for deletion, otherwise convert to number
    if (value === "" || value === "-") {
      callback(value);
    } else {
      callback(Number(value));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 font-custom pt-20">
      <Navbar />
      
      {/* Message Box */}
      {message.text && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-2 rounded-md shadow-md ${
          message.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
        }`}>
          {message.text}
        </div>
      )}
      
      {/* Level Info */}
      <div className="mb-4 flex justify-center">
        <div className="mb-4 bg-white rounded-lg shadow p-4">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Level info</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-medium text-gray-600 block mb-1">Naziv nivoa</label>
              <input
                type="text"
                value={level.title}
                onChange={(e) => setLevel(prev => ({ ...prev, title: e.target.value }))}
                className="border rounded-md px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 block mb-1">Redosled</label>
              <input
                type="number"
                value={level.order}
                onChange={(e) => setLevel(prev => ({ ...prev, order: Number(e.target.value) }))}
                className="border rounded-md px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-gray-600 block mb-1">Opis</label>
            <textarea
              rows={2}
              value={level.description}
              onChange={(e) => setLevel(prev => ({ ...prev, description: e.target.value }))}
              className="border rounded-md px-2 py-1 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>
      </div>



      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Preview */}
        <div className="w-full md:w-2/3">
          <GameDisplay level={level} userCss="" />
          {/* Dugmad ispod preview-a */}
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <button
              onClick={applyPalette}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Nasumična paleta boja
            </button>
            <button
              onClick={saveLevel}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Sačuvaj nivo
            </button>
          </div>
        </div>

        {/* Panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-2 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
          {/* Glavni auto */}
          <div className="border rounded-lg p-3 bg-gray-100 shadow-sm flex-shrink-0">
            <h3 className="font-bold mb-2">Glavni auto</h3>
            <div className="grid grid-cols-2 gap-2">
              {["x", "y", "width", "height", "rotate"].map(field => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm text-gray-600">{field.toUpperCase()}</label>
                  <input
                    type="number"
                    value={level.player_car[field]}
                    onChange={e => handleNumberChange(e, (val) => updatePlayer(field, val))}
                    className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">ScaleX</label>
                <input
                  type="number"
                  step="0.1"
                  value={level.player_car.scale.x}
                  onChange={e => handleNumberChange(e, (val) => updatePlayerNested("scale", "x", val))}
                  className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">ScaleY</label>
                <input
                  type="number"
                  step="0.1"
                  value={level.player_car.scale.y}
                  onChange={e => handleNumberChange(e, (val) => updatePlayerNested("scale", "y", val))}
                  className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Color</label>
                <input
                  type="color"
                  value={level.player_car.color}
                  onChange={e => updatePlayer("color", e.target.value)}
                  className="w-full h-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 p-0"
                />
              </div>
            </div>
          </div>

          {/* Parking spots */}
          {level.parking_spots.map((spot, idx) => {
            const isExpanded = expandedId === spot.id;
            return (
              <div
                key={spot.id}
                className={`border rounded-lg overflow-hidden shadow-sm flex-shrink-0 ${isExpanded ? 'bg-blue-50' : 'bg-gray-100'}`}
              >
                <div
                  className="flex justify-between items-center p-3 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : spot.id)}
                >
                  <span className="font-medium text-gray-800">Parking mesto {idx + 1}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSpot(spot.id); }}
                    className="text-red-600 hover:bg-red-100 rounded-full w-6 h-6 flex items-center justify-center font-bold transition-colors"
                  >
                    ×
                  </button>
                </div>
                {isExpanded && (
                  <div className="p-3 grid grid-cols-2 gap-2">
                    {["x", "y", "width", "height"].map(field => (
                      <div key={field} className="flex flex-col">
                        <label className="text-sm text-gray-600">{field.toUpperCase()}</label>
                        <input
                          type="number"
                          value={spot[field]}
                          onChange={e => handleNumberChange(e, (val) => updateSpot(spot.id, field, val))}
                          className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    ))}

                    {/* Skew */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">SkewX</label>
                      <input
                        type="number"
                        value={spot.skew.x}
                        onChange={e => handleNumberChange(e, (val) => updateSpotNested(spot.id, 'skew', 'x', val))}
                        className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">SkewY</label>
                      <input
                        type="number"
                        value={spot.skew.y}
                        onChange={e => handleNumberChange(e, (val) => updateSpotNested(spot.id, 'skew', 'y', val))}
                        className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>

                    {/* Scale */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">ScaleX</label>
                      <input
                        type="number"
                        step="0.1"
                        value={spot.scale.x}
                        onChange={e => handleNumberChange(e, (val) => updateSpotNested(spot.id, 'scale', 'x', val))}
                        className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">ScaleY</label>
                      <input
                        type="number"
                        step="0.1"
                        value={spot.scale.y}
                        onChange={e => handleNumberChange(e, (val) => updateSpotNested(spot.id, 'scale', 'y', val))}
                        className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>

                    {/* Rotate */}
                    <div className="flex flex-col col-span-2">
                      <label className="text-sm text-gray-600">Rotate</label>
                      <input
                        type="number"
                        value={spot.rotate}
                        onChange={e => handleNumberChange(e, (val) => updateSpot(spot.id, 'rotate', val))}
                        className="border rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    {/* Color */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-600">Color</label>
                      <input
                        type="color"
                        value={spot.color}
                        onChange={e => updateSpot(spot.id, 'color', e.target.value)}
                        className="w-full h-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300 p-0"
                      />
                    </div>

                    {/* Target */}
                    <div className="flex flex-col items-center justify-center">
                      <label className="text-sm text-gray-600 mb-1">Target</label>
                      <input
                        type="checkbox"
                        checked={spot.is_target}
                        onChange={e => updateSpot(spot.id, 'is_target', e.target.checked)}
                        className="w-5 h-5"
                      />
                    </div>

                  </div>
                )}
              </div>
            );
          })}

          <button onClick={addSpot} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Dodaj parking mesto
          </button>
        </div>
      </div>
    </div>
  );
}