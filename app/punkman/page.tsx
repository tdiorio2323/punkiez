export default function PunkmanPage() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/punkman_game/index.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="PUNK-MAN Game"
      />
    </div>
  );
}
