import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Terminal, CheckCircle2, Download, RefreshCw, Loader2, QrCode } from 'lucide-react';

interface TerminalLogsProps {
  isBuilding: boolean;
  onComplete: () => void;
}

const BUILD_STEPS = [
  "Initializing Build Environment...",
  "Cloning Capacitor Base Template...",
  "Extracting AI Studio Project Archive...",
  "Syncing node_modules...",
  "Running npm run build for production...",
  "Copying web assets to Android /src/main/assets...",
  "Updating AndroidManifest.xml (Permissions & Package Name)...",
  "Injecting google-services.json for Firebase...",
  "Patching MainActivity.java for AdMob and Plugins...",
  "Resolving Gradle dependencies (Downloading SDKs)...",
  "Executing gradle assembleRelease...",
  "D8 dexing class files...",
  "Signing APK with default Keystore...",
  "Executing gradle bundleRelease...",
  "Signing AAB...",
  "Uploading artifacts to secure download bucket...",
  "Build complete! Artifacts Ready."
];

export default function TerminalLogs({ isBuilding, onComplete }: TerminalLogsProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isBuilding) {
      setLogs([]);
      setProgress(0);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BUILD_STEPS.length) {
        setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].slice(0,-1)}] - ${BUILD_STEPS[currentIndex]}`]);
        setProgress(Math.round(((currentIndex + 1) / BUILD_STEPS.length) * 100));
        currentIndex++;
        
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isBuilding, onComplete]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-400" />
          Cloud Build Container Process
        </h3>
        {isBuilding && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mb-4">
        <span>{isBuilding ? 'Building in progress...' : progress === 100 ? 'Build finished' : 'Waiting to start...'}</span>
        <span>{progress}%</span>
      </div>

      <div 
        ref={scrollRef}
        className="w-full h-64 bg-[#0A0A0A] border border-white/10 rounded-xl font-mono text-sm p-4 overflow-y-auto scroll-smooth flex flex-col"
      >
        {!isBuilding && progress === 0 && (
          <span className="text-slate-500">Waiting for job dispatch...</span>
        )}
        {logs.map((log, i) => (
          <span key={i} className={`${log.includes('complete') ? 'text-green-400' : 'text-slate-300'} mb-1 break-all`}>
            {log}
          </span>
        ))}
      </div>
    </div>
  );
}
