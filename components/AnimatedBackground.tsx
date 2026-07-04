export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      {/* Soft gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Floating particles */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-emerald-400/40 rounded-full animate-float" />
      <div className="absolute top-32 left-[75%] w-2.5 h-2.5 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[70%] left-[15%] w-1.5 h-1.5 bg-emerald-400/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] left-[90%] w-2 h-2 bg-cyan-400/30 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-cyan-400/30 rounded-full animate-float-slow" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[45%] left-[50%] w-1 h-1 bg-emerald-400/50 rounded-full animate-float-slow" style={{ animationDelay: '0.8s' }} />

      {/* Radar sweep */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-20">
        <div className="absolute inset-0 rounded-full border border-emerald-500/30" />
        <div className="absolute inset-12 rounded-full border border-emerald-500/25" />
        <div className="absolute inset-24 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-36 rounded-full border border-emerald-500/15" />
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left animate-radar-sweep"
          style={{
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.6), transparent)'
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-16 origin-left animate-radar-sweep opacity-30"
          style={{
            background: 'conic-gradient(from -10deg, transparent, rgba(16, 185, 129, 0.3), transparent)',
            animationDelay: '-0.1s'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />
    </div>
  );
}
