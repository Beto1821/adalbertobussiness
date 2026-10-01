export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-near-black">
      <div className="ambient-blob ambient-blob--purple" />
      <div className="ambient-blob ambient-blob--cobalt" />
      <div className="ambient-blob ambient-blob--lilac" />
      <div className="ambient-blob ambient-blob--navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-near-black)_100%)]" />
    </div>
  );
}
