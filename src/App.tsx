/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-purple-500/30 overflow-x-hidden flex flex-col">
      <Navigation appState={appState} setAppState={setAppState} />
      <main className="flex-1 w-full relative">
        {appState === 'landing' ? (
          <Landing onStart={() => {
            window.scrollTo(0, 0);
            setAppState('dashboard');
          }} />
        ) : (
          <Dashboard />
        )}
      </main>
      
      {appState === 'landing' && (
        <footer className="border-t border-white/10 bg-slate-950 py-12 pb-24 mt-20">
          <div className="container mx-auto px-4 lg:px-8 text-center text-slate-500 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} AI Studio APK Builder. All rights reserved.</p>
            <p className="mt-2">Building bridges between Google AI Studio and Google Play.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
