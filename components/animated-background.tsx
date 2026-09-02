export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="animate-float-slow absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="animate-float-slower absolute -right-16 top-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      <div className="animate-float-slow absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-chart-4/15 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  )
}
