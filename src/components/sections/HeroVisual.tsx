import { Icon } from "@/components/ui/Icon";

/**
 * Hero composition.
 *
 * A designed visual rather than photography: no licensed environmental or
 * mobility imagery has been supplied, and stock imagery of an unrelated fleet
 * would imply an operator relationship we do not have. See
 * docs/INFORMATION-REQUIRED.md for the image assets still needed.
 *
 * The composition reads top to bottom: real-world activity produces evidence,
 * evidence supports verification, verified activity connects to economic
 * utility. Every value shown is a label, not a figure — there are no numbers to
 * mistake for results.
 */
export function HeroVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-panel border border-white/10 bg-navy-800 p-5 shadow-[var(--shadow-panel)] sm:p-7"
      role="img"
      aria-label="Diagram: an electric bus route produces telemetry, charging and distance data; the data is assessed against a methodology and reviewed; the result is a structured environmental record that connects to rewards, project funding and reporting."
    >
      {/* Ambient grid and glow. Decorative only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-cyan/20 blur-3xl"
      />

      <div aria-hidden="true" className="relative flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-cyan">
            <Icon name="FlaskConical" className="size-3" />
            Illustrative
          </span>
          <span className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
            Simulated example
          </span>
        </div>

        {/* Layer 1 — activity */}
        <HeroCard>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald/15 text-emerald-400">
              <Icon name="BusFront" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Electric bus — route activity</p>
              <p className="text-xs text-white/50">Real-world environmental activity</p>
            </div>
          </div>
        </HeroCard>

        <Connector label="Activity produces data" />

        {/* Layer 2 — data */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "Antenna", label: "Telemetry" },
            { icon: "PlugZap", label: "Charging" },
            { icon: "ChartNoAxesCombined", label: "Distance" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex flex-col items-center gap-1.5 rounded-card border border-white/10 bg-white/[0.04] px-2 py-3 text-center"
            >
              <Icon name={chip.icon} className="size-4 text-cyan" />
              <span className="text-[0.7rem] text-white/70">{chip.label}</span>
            </div>
          ))}
        </div>

        <Connector label="Data supports verification" />

        {/* Layer 3 — verification */}
        <HeroCard>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
              <Icon name="ShieldCheck" className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Methodology applied, evidence reviewed</p>
              <p className="text-xs text-white/50">Decision recorded with an audit trail</p>
            </div>
          </div>
        </HeroCard>

        <Connector label="Verified activity becomes a record" />

        {/* Layer 4 — record and utility */}
        <HeroCard highlight>
          <div className="flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 text-white">
              <Icon name="Layers" className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">Environmental record</p>
              <p className="text-xs text-white/50">Asset, activity period, evidence, claim status</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
            {[
              { icon: "Gift", label: "Rewards" },
              { icon: "HandCoins", label: "Funding" },
              { icon: "ClipboardCheck", label: "Reporting" },
            ].map((chip) => (
              <div key={chip.label} className="flex items-center gap-1.5">
                <Icon name={chip.icon} className="size-3.5 text-emerald-400" />
                <span className="text-[0.7rem] text-white/70">{chip.label}</span>
              </div>
            ))}
          </div>
        </HeroCard>
      </div>
    </div>
  );
}

function HeroCard({
  children,
  highlight = false,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-card border p-4 ${
        highlight
          ? "border-emerald/30 bg-emerald/[0.08]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      {children}
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-1">
      <span className="h-6 w-px bg-gradient-to-b from-white/10 via-cyan/50 to-white/10" />
      <span className="text-[0.68rem] text-white/40">{label}</span>
    </div>
  );
}
