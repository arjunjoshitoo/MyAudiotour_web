export default function TrustBar() {
  const stats = [
    { value: "70+", label: "Indian Cities" },
    { value: "1,000+", label: "Landmarks" },
    { value: "GPS-triggered", label: "Auto Audio" },
    { value: "100% Free", label: "Always" },
  ];

  return (
    <div className="bg-brand-muted border-y border-brand-muted-2">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-5">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-center md:text-left">
                <span className="font-sans text-sm font-bold tracking-wide text-brand-ink">
                  {stat.value}
                </span>
                <span className="font-sans text-xs text-brand-ink/50 ml-1.5">
                  {stat.label}
                </span>
              </div>
              {i < stats.length - 1 && (
                <span className="hidden md:block text-brand-saffron text-lg font-bold ml-3 select-none">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
