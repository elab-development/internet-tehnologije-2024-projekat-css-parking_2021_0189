export default function CssEditor({ userCss, setUserCss}) {
  return (
    <div className="bg-gray-800 text-white p-3 rounded mb-4 font-mono text-sm">
      <div className="mb-2">.player-car {'{'} transform: <span className="text-green-300">{userCss}</span>; {'}'}</div>
      <textarea
      value={userCss}
      onChange={(e) => setUserCss(e.target.value)}
      placeholder="npr. translateX(50px)"
      className="w-full h-44 p-3 bg-gray-900 text-green-300 rounded border border-gray-700 resize-none"
      />
    </div>
  );
}