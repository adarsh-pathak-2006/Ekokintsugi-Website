import { Link } from "react-router-dom";

const previewTreeCount = 4;

export default function TreePreviewSection() {
  return (
    <section className="py-28 surface-gradient border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-[10px] font-mono font-black uppercase tracking-[0.35em] text-accent">
            Tree Plantation Preview
          </span>
          <h2 className="mt-6 text-5xl md:text-6xl font-serif font-bold text-primary">Reforestation Tracker</h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg text-muted-foreground italic">
            A brief preview of the tree plantation experience inside the Impact Dashboard, showing zone mapping and live sapling progress.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-card border border-border p-5 rounded-3xl shadow-strong aspect-video relative overflow-hidden">
              <img src="/images/sections/reforestation-map.jpg" alt="Reforestation map" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-5 bottom-5 bg-background/90 backdrop-blur border border-border rounded-2xl px-5 py-4 font-mono text-[10px] tracking-widest text-primary uppercase">
                Previewing: Agra Demo Zone
              </div>
            </div>

            <div className="bg-card p-10 rounded-3xl border border-border shadow-soft">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary">Live Sapling Stats</h3>
                  <p className="text-sm font-mono text-accent font-bold">Allocated Trees: {previewTreeCount}</p>
                </div>
                <div className="bg-primary/5 px-4 py-2 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest">
                  Active Growth
                </div>
              </div>

              <div className="flex justify-between items-end gap-2 h-20">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <div
                    key={value}
                    className={`flex-1 rounded-t-lg transition-all ${value <= previewTreeCount ? "bg-accent" : "bg-muted/30"}`}
                    style={{ height: `${value * 10}%` }}
                  />
                ))}
              </div>

              <p className="text-center mt-6 text-xs font-mono text-muted-foreground uppercase font-bold tracking-widest">
                Growth Factor: Healthy
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-[3/4] bg-muted/20 rounded-3xl border border-dashed border-border flex items-center justify-center overflow-hidden">
              <img src="/images/sections/forest.jpg" className="w-full h-full object-cover grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100" alt="Tree canopy" />
            </div>

            <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-strong relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative z-10">
                <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-black mb-4">Dashboard Access</p>
                <h3 className="text-3xl font-serif font-bold mb-4">Track your assigned plantation zone and impact story.</h3>
                <p className="text-primary-foreground/75 leading-relaxed mb-6">
                  Sign in to unlock your personal reforestation data, tree history, and the full live plantation dashboard.
                </p>
                <Link
                  to="/?impact=open"
                  className="inline-flex rounded-2xl bg-accent px-6 py-3 text-[10px] font-mono uppercase tracking-widest font-black text-accent-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Open Impact Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
