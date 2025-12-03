export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 left-[20%] w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-32 left-[75%] w-2.5 h-2.5 bg-emerald-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 left-[85%] w-1 h-1 bg-white/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-80 left-[5%] w-2 h-2 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[70%] left-[15%] w-1.5 h-1.5 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] left-[90%] w-2 h-2 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />

      {/* Radar sweep effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
        <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-8 rounded-full border border-emerald-500/15" />
        <div className="absolute inset-16 rounded-full border border-emerald-500/10" />
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left animate-radar-sweep"
          style={{
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.5), transparent)'
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
