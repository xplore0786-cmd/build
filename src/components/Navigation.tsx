import { Layers, Rocket, User } from 'lucide-react';
import { AppState } from '../types';

interface NavigationProps {
  appState: AppState;
  setAppState: (state: AppState) => void;
}

export default function Navigation({ appState, setAppState }: NavigationProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between pointer-events-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            setAppState('landing');
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            APK Builder
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => setAppState('landing')} className="hover:text-white transition-colors">Home</button>
          <a href="#features" onClick={() => setAppState('landing')} className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" onClick={() => setAppState('landing')} className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          {appState === 'landing' ? (
            <button 
              onClick={() => setAppState('dashboard')}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              Build APK
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-300 hidden sm:block">Developer</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 border-2 border-slate-900 flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
