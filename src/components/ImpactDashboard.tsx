import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Award,
  Download,
  History,
  Leaf,
  QrCode,
  Share2,
  TreePine,
  TrendingDown,
  Wallet
} from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

type ImpactRecord = {
  id: string;
  created_at: string;
  co2_saved_kg: number;
  waste_diverted_kg: number;
  tree_id: string | null;
};

type ImpactStats = {
  totalCo2: number;
  totalWaste: number;
  treeCount: number;
  credits: number;
  records: ImpactRecord[];
};

const emptyImpactStats: ImpactStats = {
  totalCo2: 0,
  totalWaste: 0,
  treeCount: 0,
  credits: 0,
  records: []
};

function normalizeImpactStats(payload: unknown): ImpactStats {
  if (!payload || typeof payload !== "object") {
    return emptyImpactStats;
  }

  const data = payload as Partial<ImpactStats>;
  const records = Array.isArray(data.records)
    ? data.records.map((record: any, index) => ({
        id: String(record?.id ?? `record-${index}`),
        created_at: typeof record?.created_at === "string" ? record.created_at : new Date().toISOString(),
        co2_saved_kg: Number(record?.co2_saved_kg ?? 0),
        waste_diverted_kg: Number(record?.waste_diverted_kg ?? 0),
        tree_id: record?.tree_id ? String(record.tree_id) : null
      }))
    : [];

  return {
    totalCo2: Number(data.totalCo2 ?? 0),
    totalWaste: Number(data.totalWaste ?? 0),
    treeCount: Number(data.treeCount ?? 0),
    credits: Number(data.credits ?? 0),
    records
  };
}

const StatCard: FC<{
  icon: any;
  label: string;
  value: string | number;
  unit: string;
  delay?: number;
}> = ({
  icon: Icon,
  label,
  value,
  unit,
  delay = 0
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="p-8 bg-card border border-border/50 rounded-3xl shadow-soft group hover:border-accent/40 transition-all"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-primary/5 rounded-xl text-primary group-hover:bg-accent group-hover:text-amber-50 transition-all">
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-mono font-bold text-accent tracking-widest uppercase">Verified</span>
    </div>
    <div className="flex items-baseline gap-1 mb-2">
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-serif font-black text-primary">
        {value}
      </motion.span>
      <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{unit}</span>
    </div>
    <p className="text-xs font-mono text-muted-foreground uppercase tracking-tight">{label}</p>
  </motion.div>
);

const TimelineItem: FC<{
  date: string;
  title: string;
  impact: string;
  icon: any;
  isLast: boolean;
}> = ({
  date,
  title,
  impact,
  icon: Icon,
  isLast
}) => (
  <div className="flex gap-6 relative">
    {!isLast && <div className="absolute left-[24px] top-[48px] bottom-0 w-0.5 bg-border/40" />}
    <div className={`z-10 p-3 rounded-full h-fit shadow-lg ${title.includes("Tree") ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="pb-10">
      <p className="text-[10px] font-mono font-black text-accent uppercase mb-1 tracking-widest">{date}</p>
      <h4 className="text-xl font-serif font-bold text-primary mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground italic">{impact}</p>
    </div>
  </div>
);

export default function ImpactDashboard({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "tree" | "certificate" | "wallet">("overview");
  const [stats, setStats] = useState<ImpactStats>(emptyImpactStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { session, user, displayName, isLoading: authLoading } = useAuth();

  const isDemo = !user;
  const walletSuffix = user?.id.split("-")[0] ?? "DEMO";
  const certificateName = isDemo ? "Artisan Voyager" : displayName;
  const authHref = `/auth?mode=signin&next=impact`;
  const signupHref = `/auth?mode=signup&next=impact`;

  useEffect(() => {
    if (!isOpen) return;
    setActiveTab("overview");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || authLoading) return;

    const controller = new AbortController();

    async function loadImpact() {
      setLoading(true);
      setError("");

      try {
        const query = isDemo ? "?demo=true" : "";
        const response = await fetch(`/api/impact${query}`, {
          signal: controller.signal,
          headers: session?.access_token
            ? { Authorization: `Bearer ${session.access_token}` }
            : undefined
        });

        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(typeof payload?.error === "string" ? payload.error : "Unable to load impact data.");
        }

        setStats(normalizeImpactStats(payload));
      } catch (fetchError: any) {
        if (controller.signal.aborted) return;

        setStats(emptyImpactStats);
        setError(fetchError?.message || "Unable to load impact data right now.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadImpact();

    return () => controller.abort();
  }, [authLoading, isDemo, isOpen, session?.access_token]);

  if (!isOpen) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-background flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-80 bg-primary p-8 flex flex-col text-primary-foreground border-r border-primary-foreground/10">
        <div className="flex items-center gap-4 mb-16">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          <div>
            <h2 className="text-xl font-serif font-bold">Impact Hub</h2>
            <p className="text-[10px] font-mono tracking-widest uppercase text-primary-foreground/60">
              {isDemo ? "Demo Visitor Mode" : "Personal Dashboard"}
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: "overview", icon: TrendingDown, label: "Impact Overview" },
            { id: "tree", icon: TreePine, label: "Tree Tracking" },
            { id: "certificate", icon: Award, label: "Carbon Certificates" },
            { id: "wallet", icon: Wallet, label: "Carbon Wallet" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "overview" | "tree" | "certificate" | "wallet")}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-pointer font-bold uppercase text-[10px] tracking-[0.2em] ${
                activeTab === item.id ? "bg-accent text-accent-foreground shadow-lg translate-x-2" : "hover:bg-primary-foreground/10 opacity-70"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        {isDemo && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/8 p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-black mb-3">Unlock Your Data</p>
            <p className="text-sm text-primary-foreground/75 leading-relaxed mb-4">
              Sign in to replace the preview metrics with your own tracked orders, certificates, trees, and wallet history.
            </p>
            <div className="flex gap-3">
              <Link
                to={authHref}
                className="flex-1 rounded-2xl bg-accent px-4 py-3 text-center text-[10px] font-mono uppercase tracking-widest font-black text-accent-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to={signupHref}
                className="flex-1 rounded-2xl border border-white/20 px-4 py-3 text-center text-[10px] font-mono uppercase tracking-widest font-black hover:bg-white/10 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-8 flex items-center gap-4 px-6 py-4 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all font-mono text-[10px] tracking-widest uppercase font-bold"
        >
          Exit Dashboard
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 md:p-16 bg-muted/20">
        {loading || authLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-5xl mx-auto">
                <header className="mb-16">
                  <p className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase font-black mb-4">ESG Real-Time Status</p>
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-2 px-0">
                    Welcome, <span className="italic text-accent">{certificateName}</span>
                  </h1>
                  <p className="text-muted-foreground text-lg italic">
                    {isDemo ? "Demo impact data is visible until you sign in." : "Your personal carbon-positive dashboard is synced with Supabase."}
                  </p>
                </header>

                {error && (
                  <div className="mb-8 rounded-[2rem] border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-800">
                    {error}
                  </div>
                )}

                {isDemo && (
                  <div className="mb-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
                    <div className="rounded-[2.5rem] bg-card border border-border/50 p-8 shadow-soft">
                      <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-black mb-4">Guest Preview</p>
                      <h3 className="text-3xl font-serif font-bold text-primary mb-4">See how the dashboard feels before you create an account.</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        The preview stays available for visitors, while sign-in switches the dashboard to your own tree history, carbon totals, and certificates.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={authHref}
                          className="rounded-2xl bg-primary px-6 py-3 text-[10px] font-mono uppercase tracking-widest font-black text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          Sign In For My Data
                        </Link>
                        <Link
                          to={signupHref}
                          className="rounded-2xl border border-border px-6 py-3 text-[10px] font-mono uppercase tracking-widest font-black text-primary hover:border-accent hover:text-accent transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>

                    <div className="rounded-[2.5rem] bg-primary text-primary-foreground p-8 shadow-strong overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-accent/20 blur-3xl" />
                      <div className="relative z-10">
                        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-accent font-black mb-4">What Unlocks</p>
                        <ul className="space-y-4">
                          {["Personal impact timeline", "Profile-linked certificates", "Real wallet balance", "Your own reforestation history"].map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm">
                              <Leaf className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-4 gap-6 mb-20">
                  <StatCard icon={TrendingDown} value={stats.totalCo2.toFixed(1)} unit="kg" label="CO2 Diverted" delay={0.1} />
                  <StatCard icon={TreePine} value={stats.treeCount} unit="Trees" label="Lifecycle Support" delay={0.2} />
                  <StatCard icon={History} value={stats.totalWaste.toFixed(1)} unit="kg" label="Waste Reclaimed" delay={0.3} />
                  <StatCard icon={Award} value={stats.credits.toFixed(3)} unit="Credits" label="Carbon Equity" delay={0.4} />
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                  <section>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-10 flex items-center gap-3">
                      <History className="text-accent" /> Contribution Timeline
                    </h3>
                    <div className="bg-card p-10 rounded-[2.5rem] border border-border/50">
                      {stats.records.map((record, idx) => (
                        <TimelineItem
                          key={record.id}
                          date={new Date(record.created_at).toLocaleDateString()}
                          title={`Order Impact: ${record.co2_saved_kg.toFixed(1)}kg Saved`}
                          impact={`Waste Diverted: ${record.waste_diverted_kg.toFixed(1)}kg`}
                          icon={record.tree_id ? TreePine : Award}
                          isLast={idx === stats.records.length - 1}
                        />
                      ))}
                      {stats.records.length === 0 && (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground italic mb-6">
                            {isDemo ? "Preview activity will appear here. Sign in to begin tracking your own footprint." : "No impact records yet. Start your carbon-positive journey today."}
                          </p>
                          {isDemo && (
                            <button
                              type="button"
                              onClick={() => navigate(authHref)}
                              className="rounded-2xl bg-primary px-6 py-3 text-[10px] font-mono uppercase tracking-widest font-black text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              Sign In
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-10 flex items-center gap-3">
                      <Share2 className="text-accent" /> Share Your Footprint
                    </h3>
                    <div className="bg-primary p-12 rounded-[2.5rem] text-primary-foreground relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full -mr-20 -mt-20 blur-3xl" />
                      <div className="relative z-10 flex flex-col h-full">
                        <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6 text-accent">Social Impact Card</p>
                        <h4 className="text-4xl font-serif font-bold mb-6">"I&apos;m building a greener future with EkoKintsugi."</h4>
                        <div className="mt-auto pt-8 border-t border-primary-foreground/20 flex justify-between items-center">
                          <div className="flex gap-2">
                            <button type="button" className="p-3 bg-primary-foreground/10 rounded-xl hover:bg-accent transition-colors">
                              <Share2 className="w-5 h-5" />
                            </button>
                            <button type="button" className="p-3 bg-primary-foreground/10 rounded-xl hover:bg-accent transition-colors">
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                          <img src="/logo.png" className="h-8" alt="EkoKintsugi logo" />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === "tree" && (
              <motion.div key="tree" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-serif font-bold text-primary mb-12">Reforestation Tracker</h2>
                <div className="grid lg:grid-cols-5 gap-12">
                  <div className="lg:col-span-3 space-y-8">
                    <div className="bg-card border border-border p-5 rounded-3xl shadow-strong aspect-video relative overflow-hidden">
                      <img src="/images/sections/reforestation-map.jpg" alt="Reforestation map" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-x-5 bottom-5 bg-background/90 backdrop-blur border border-border rounded-2xl px-5 py-4 font-mono text-[10px] tracking-widest text-primary uppercase">
                        {isDemo ? "Previewing: Agra Demo Zone" : "Currently viewing: Your assigned reforestation zone"}
                      </div>
                    </div>
                    <div className="bg-card p-10 rounded-3xl border border-border">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h4 className="text-2xl font-serif font-bold text-primary">Live Sapling Stats</h4>
                          <p className="text-sm font-mono text-accent font-bold">Allocated Trees: {stats.treeCount}</p>
                        </div>
                        <div className="bg-primary/5 px-4 py-2 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest">Active Growth</div>
                      </div>
                      <div className="flex justify-between items-end gap-2 h-20">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                          <div
                            key={value}
                            className={`flex-1 rounded-t-lg transition-all ${value <= Math.min(stats.treeCount, 10) ? "bg-accent" : "bg-muted/30"}`}
                            style={{ height: `${value * 10}%` }}
                          />
                        ))}
                      </div>
                      <p className="text-center mt-6 text-xs font-mono text-muted-foreground uppercase font-bold tracking-widest">
                        {stats.treeCount > 0 ? "Growth Factor: Healthy" : "Awaiting first tree assignment"}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-[3/4] bg-muted/20 rounded-3xl border border-dashed border-border flex items-center justify-center overflow-hidden">
                      <img src="/images/sections/forest.jpg" className="w-full h-full object-cover grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100" alt="Tree canopy" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "certificate" && (
              <div className="max-w-3xl mx-auto py-12">
                {stats.records.length > 0 ? (
                  <div className="bg-card p-16 rounded-[4rem] shadow-strong border-[16px] border-primary relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-[100px]" />
                    <div className="text-center mb-16">
                      <img src="/logo.png" className="h-16 mx-auto mb-10" alt="Logo" />
                      <h2 className="text-xs font-mono tracking-[0.5em] uppercase font-black text-accent mb-6">Official Carbon Certificate</h2>
                      <h3 className="text-5xl font-serif font-bold text-primary mb-4 italic">{certificateName}</h3>
                      <div className="w-20 h-px bg-accent mx-auto" />
                    </div>

                    <div className="space-y-10 mb-16">
                      <div className="flex justify-between items-center border-b border-border pb-6">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold opacity-50">Total Verified Impact</span>
                        <span className="text-xl font-serif font-bold text-primary">{stats.totalCo2.toFixed(1)} KG CO2 Saved</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border pb-6">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold opacity-50">Cert Status</span>
                        <span className="text-lg font-serif">{stats.totalCo2 > 0 ? "PLATINUM LEVEL" : "PENDING"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center italic opacity-50">
                    {isDemo ? "Demo certificate data appears during preview mode. Sign in to see certificates tied to your account." : "Complete your first purchase to generate an impact certificate."}
                  </p>
                )}
              </div>
            )}

            {activeTab === "wallet" && (
              <motion.div key="wallet" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-4xl mx-auto">
                <header className="mb-12">
                  <p className="text-accent font-mono text-[10px] tracking-[0.4em] uppercase font-black mb-4">Blockchain Synced</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">Digital Carbon Wallet</h2>
                  <p className="text-muted-foreground italic">Manage and review your verified carbon credits.</p>
                </header>

                <div className="grid md:grid-cols-5 gap-8 mb-12">
                  <div className="md:col-span-3 bg-primary text-primary-foreground p-12 rounded-[2.5rem] shadow-strong relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="relative z-10 flex justify-between items-start mb-16">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase opacity-70 mb-2">Available Balance</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-6xl md:text-8xl font-serif font-black tracking-tighter">{stats.credits.toFixed(3)}</span>
                          <span className="text-accent font-bold tracking-widest uppercase">CC</span>
                        </div>
                      </div>
                      <Wallet className="w-10 h-10 opacity-50" />
                    </div>

                    <div className="relative z-10 flex gap-4">
                      <button type="button" className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-mono text-[10px] tracking-widest uppercase font-bold hover:bg-primary-foreground hover:text-primary transition-all">
                        Redeem Credits
                      </button>
                      <button type="button" className="bg-primary-foreground/10 px-8 py-4 rounded-xl font-mono text-[10px] tracking-widest uppercase font-bold hover:bg-primary-foreground/20 transition-all flex items-center gap-2">
                        <QrCode className="w-4 h-4" /> Receive
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-card border border-border rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
                    <div className="p-4 bg-primary/5 rounded-2xl mb-6">
                      <QrCode className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-xs font-mono tracking-widest uppercase font-bold mb-2">Wallet Address</p>
                    <p className="text-sm font-mono text-muted-foreground break-all bg-muted/30 p-3 rounded-lg w-full">0x71C...9A23{walletSuffix}</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-[2.5rem] p-10">
                  <h3 className="text-xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                    <History className="w-5 h-5 text-accent" /> Ledger History
                  </h3>

                  {stats.records.length > 0 ? (
                    <div className="space-y-6">
                      {stats.records.slice(0, 5).map((record) => {
                        const creditsEarned = (record.co2_saved_kg / 1000).toFixed(4);

                        return (
                          <div key={record.id} className="flex items-center justify-between p-4 hover:bg-muted/20 rounded-xl transition-colors border-b border-border last:border-0">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                <ArrowUpRight className="w-5 h-5" />
                              </div>
                              <div>
                                <p className="font-bold text-primary font-serif">Smart Contract Mint</p>
                                <p className="text-xs text-muted-foreground font-mono">{new Date(record.created_at).toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-accent font-mono">+ {creditsEarned} CC</p>
                              <p className="text-[10px] text-muted-foreground uppercase opacity-70">Verified</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center italic opacity-50 py-8">No ledger transactions found.</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
