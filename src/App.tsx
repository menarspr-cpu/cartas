import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  CreditCard, 
  Layers, 
  Plus, 
  Search, 
  Settings, 
  Zap, 
  Lock,
  ChevronRight,
  TrendingUp,
  History
} from "lucide-react";

// Mock Data for the Vault
const MOCK_CARDS = [
  { id: 1, name: "Primal Titan", type: "Legendary", power: 95, rarity: "Mythic", color: "primary" },
  { id: 2, name: "Aeon Drifter", type: "Celestial", power: 82, rarity: "Rare", color: "secondary" },
  { id: 3, name: "Void Stalker", type: "Shadow", power: 78, rarity: "Epic", color: "tertiary" },
  { id: 4, name: "Neon Harbinger", type: "Cyber", power: 88, rarity: "Legendary", color: "primary" },
];

const Card = ({ name, type, power, rarity, color }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-panel group relative flex flex-col p-5 rounded-2xl overflow-hidden cursor-pointer"
    >
      <div className={`absolute top-0 left-0 w-1 h-full bg-${color} neon-glow-${color}`} />
      
      <div className="flex justify-between items-start mb-6">
        <div className="p-2 rounded-lg bg-surface-container-highest/50">
          <Layers size={18} className={`text-${color}`} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest text-${color}`}>
          {rarity}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-on-surface-variant">{type}</p>
      </div>

      <div className="mt-auto pt-4 border-t border-outline-variant/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-secondary" />
          <span className="text-sm font-bold tracking-tighter">{power} POW</span>
        </div>
        <ChevronRight size={16} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0" />
      </div>

      <div className="holographic-sheen absolute inset-0 pointer-events-none opacity-20" />
    </motion.div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 glass-panel rounded-full flex items-center gap-8 z-50">
      <NavItem icon={<Layers size={22} />} active />
      <NavItem icon={<History size={22} />} />
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary neon-glow-primary hover:scale-110 transition-transform cursor-pointer">
        <Plus size={28} strokeWidth={3} />
      </div>
      <NavItem icon={<TrendingUp size={22} />} />
      <NavItem icon={<Settings size={22} />} />
    </nav>
  );
};

const NavItem = ({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) => (
  <div className={`p-2 rounded-xl cursor-pointer transition-all ${active ? "text-primary neon-glow-primary scale-110" : "text-on-surface-variant hover:text-on-surface"}`}>
    {icon}
  </div>
);

export default function App() {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 text-on-surface overflow-x-hidden p-6 md:p-12 pb-32">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Header */}
      <header className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 glass-panel rounded-xl flex items-center justify-center text-primary neon-glow-primary">
              <Shield size={20} />
            </div>
            <h1 className="text-3xl font-headline font-bold tracking-tight">THE VAULT</h1>
          </div>
          <p className="text-on-surface-variant flex items-center gap-2">
            Digital Asset Management Protocol <span className="w-1 h-1 rounded-full bg-outline-variant" /> v0.0.1
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="pl-10 pr-4 py-2.5 glass-panel rounded-xl w-full md:w-64 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <button 
            onClick={() => setIsLocked(!isLocked)}
            className={`p-2.5 rounded-xl border transition-all ${isLocked ? "bg-primary text-on-primary border-primary" : "glass-panel text-on-surface-variant"}`}
          >
            {isLocked ? <Lock size={20} /> : <Zap size={20} />}
          </button>
        </div>
      </header>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Total Asset Value", value: "48,209 CRD", trend: "+12.4%", icon: <CreditCard size={18} /> },
          { label: "Collection Size", value: "154 Units", icon: <Layers size={18} /> },
          { label: "Market Index", value: "2.4 PH/s", trend: "+2.1%", icon: <TrendingUp size={18} /> },
          { label: "Security Status", value: "Level 4", icon: <Shield size={18} /> },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-2xl flex flex-col gap-1"
          >
            <div className="flex items-center justify-between text-on-surface-variant mb-1">
              <span className="text-xs uppercase tracking-wider font-bold">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-headline">{stat.value}</span>
              {stat.trend && <span className="text-[10px] text-primary font-bold">{stat.trend}</span>}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Main Grid */}
      <main className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-headline font-bold flex items-center gap-2">
            Active Collection
            <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary uppercase font-bold tracking-widest">Live</span>
          </h2>
          <div className="flex gap-2">
            <div className="px-3 py-1.5 glass-panel rounded-lg text-xs font-bold cursor-pointer hover:bg-surface-container transition-colors">Legendary</div>
            <div className="px-3 py-1.5 glass-panel rounded-lg text-xs font-bold cursor-pointer hover:bg-surface-container transition-colors">Epic</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CARDS.map(card => (
            <Card key={card.id} {...card} />
          ))}
          
          {/* Empty Slot */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center p-8 text-on-surface-variant hover:text-primary hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-current flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <p className="text-sm font-bold">Forge New Asset</p>
          </motion.div>
        </div>

        {/* Scanning Animation */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl opacity-20">
          <div className="absolute w-full h-[2px] bg-primary animate-scan" />
        </div>
      </main>

      {/* Footer Navigation */}
      <Navbar />
    </div>
  );
}
