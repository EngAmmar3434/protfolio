export default function AnimatedBackground() {
  return (
    <div className="lab-animated-background" aria-hidden="true">
      <div className="lab-bg-glow lab-bg-glow-primary" />
      <div className="lab-bg-glow lab-bg-glow-secondary" />
      <div className="lab-bg-beam lab-bg-beam-left" />
      <div className="lab-bg-beam lab-bg-beam-right" />
      <div className="lab-bg-scan" />
    </div>
  );
}
