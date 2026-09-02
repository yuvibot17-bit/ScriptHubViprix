export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-background" />
      {/* radial glow top */}
      <div
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.58 0.22 274 / 0.55), transparent 60%)",
        }}
      />
      {/* violet blob */}
      <div
        className="absolute right-[-10rem] top-[10rem] h-[30rem] w-[30rem] rounded-full opacity-40 blur-3xl animate-float-slower"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.62 0.22 300 / 0.5), transparent 60%)",
        }}
      />
      {/* bottom blue blob */}
      <div
        className="absolute bottom-[-14rem] left-[-6rem] h-[32rem] w-[32rem] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.66 0.16 240 / 0.5), transparent 60%)",
        }}
      />
      {/* subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, oklch(0.145 0.015 275 / 0.9) 100%)",
        }}
      />
    </div>
  )
}
