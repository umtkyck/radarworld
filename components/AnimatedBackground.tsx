export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]" />

      {/* Animated gradient orbs - moving */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Floating particles - more of them */}
      <div className="absolute top-20 left-[10%] w-2 h-2 bg-emerald-400/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 left-[20%] w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-32 left-[75%] w-2.5 h-2.5 bg-emerald-400/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-60 left-[85%] w-1 h-1 bg-white/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-80 left-[5%] w-2 h-2 bg-cyan-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[70%] left-[15%] w-1.5 h-1.5 bg-emerald-400/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] left-[90%] w-2 h-2 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
      <div className="absolute top-[45%] left-[50%] w-1 h-1 bg-emerald-400/50 rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
      <div className="absolute top-[25%] left-[60%] w-2 h-2 bg-cyan-400/30 rounded-full animate-float" style={{ animationDelay: '1.2s' }} />
      <div className="absolute top-[85%] left-[40%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-[15%] left-[45%] w-1 h-1 bg-emerald-400/40 rounded-full animate-float-slow" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[55%] left-[25%] w-2 h-2 bg-cyan-400/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />

      {/* Shooting lines */}
      <div className="absolute top-[20%] left-0 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-shooting-line" />
      <div className="absolute top-[40%] left-0 w-[150px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-shooting-line" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[70%] left-0 w-[180px] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent animate-shooting-line" style={{ animationDelay: '4s' }} />

      {/* Vertical scan line */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-scan-vertical" />

      {/* Radar sweep effect - larger and more visible */}
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
        {/* Radar glow trail */}
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-16 origin-left animate-radar-sweep opacity-30"
          style={{
            background: 'conic-gradient(from -10deg, transparent, rgba(16, 185, 129, 0.3), transparent)',
            animationDelay: '-0.1s'
          }}
        />
      </div>

      {/* Pulsing rings */}
      <div className="absolute top-[30%] right-[20%] w-4 h-4">
        <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-emerald-400/50" style={{ width: '8px', height: '8px', margin: '4px' }} />
      </div>
      <div className="absolute top-[60%] left-[30%] w-3 h-3">
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 rounded-full bg-cyan-400/50" style={{ width: '6px', height: '6px', margin: '3px' }} />
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

      {/* Moving gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-50" />
    </div>
  );
}
