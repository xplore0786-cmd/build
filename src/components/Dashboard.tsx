import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderUp, Settings, FileJson, Package, ChevronRight, CheckCircle2, Download, Smartphone } from 'lucide-react';
import { AppConfig } from '../types';
import TerminalLogs from './TerminalLogs';

const TABS = [
  { id: 'upload', label: '1. Project Upload', icon: FolderUp },
  { id: 'config', label: '2. Android Settings', icon: Settings },
  { id: 'integrations', label: '3. Integrations', icon: FileJson },
  { id: 'build', label: '4. Build & Export', icon: Package },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [fileSelected, setFileSelected] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);

  const [config, setConfig] = useState<AppConfig>({
    appName: 'My AI App',
    packageName: 'com.aistudio.myapp',
    versionCode: '1',
    versionName: '1.0.0',
    themeColor: '#8b5cf6',
    admobAppId: '',
    enableAnalytics: true,
    enableCrashlytics: true,
    enablePushNotifications: false,
  });

  const handleStartBuild = () => {
    setIsBuilding(true);
    setBuildComplete(false);
  };

  const handleNext = () => {
    const currentIndex = TABS.findIndex(t => t.id === activeTab);
    if (currentIndex < TABS.length - 1) setActiveTab(TABS[currentIndex + 1].id);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 pointer-events-auto">
      
      {/* Sidebar Navigation */}
      <div className="md:col-span-3 space-y-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all font-medium text-left ${isActive ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-9">
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-10 min-h-[500px] flex flex-col relative w-full">
          
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold">Upload AI Studio Project</h2>
                  <p className="text-slate-400 mt-2">Export your project from Google AI Studio as a ZIP and upload it here.</p>
                </div>

                <div 
                  className={`flex-1 min-h-[300px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${fileSelected ? 'border-purple-500 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/50 hover:bg-white/5'}`}
                >
                  <FolderUp className={`w-16 h-16 mb-4 ${fileSelected ? 'text-purple-400' : 'text-slate-600'}`} />
                  {fileSelected ? (
                    <>
                      <h4 className="text-xl font-bold text-slate-200">project_export.zip selected</h4>
                      <p className="text-slate-400 mt-2">Ready to configure</p>
                      <button onClick={() => setFileSelected(false)} className="mt-6 text-sm text-purple-400 hover:underline">Change File</button>
                    </>
                  ) : (
                    <>
                      <h4 className="text-xl font-bold text-slate-200 mb-2">Drag and drop your ZIP file</h4>
                      <p className="text-sm text-slate-500 mb-6">or click to browse from your computer</p>
                      <button onClick={() => setFileSelected(true)} className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors">
                        Select File
                      </button>
                    </>
                  )}
                </div>

                <div className="mt-8 flex justify-end">
                  <button 
                    disabled={!fileSelected}
                    onClick={handleNext}
                    className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${fileSelected ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                  >
                    Next Step <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'config' && (
              <motion.div
                key="config"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold">Android App Settings</h2>
                  <p className="text-slate-400 mt-2">Define how your app will appear on Android devices.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1.5">App Name</label>
                      <input 
                        type="text" 
                        value={config.appName}
                        onChange={e => setConfig({...config, appName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1.5">Package Name</label>
                      <input 
                        type="text" 
                        value={config.packageName}
                        onChange={e => setConfig({...config, packageName: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-slate-300 font-mono text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Version Code</label>
                        <input 
                          type="number" 
                          value={config.versionCode}
                          onChange={e => setConfig({...config, versionCode: e.target.value})}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1.5">Version Name</label>
                        <input 
                          type="text" 
                          value={config.versionName}
                          onChange={e => setConfig({...config, versionName: e.target.value})}
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-slate-800 rounded-2xl mb-4 border-2 border-dashed border-slate-600 flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-slate-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-300 mb-2">App Icon (512x512)</p>
                      <button className="text-xs text-purple-400 hover:text-purple-300 px-4 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-colors">Upload Custom</button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1.5">Theme Color</label>
                      <div className="flex items-center gap-4">
                        <input 
                          type="color" 
                          value={config.themeColor}
                          onChange={e => setConfig({...config, themeColor: e.target.value})}
                          className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                        />
                        <span className="font-mono text-sm text-slate-400 uppercase">{config.themeColor}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Sets the status bar and navbar styling</p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex justify-end">
                  <button onClick={handleNext} className="px-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 font-bold transition-all text-white flex items-center gap-2">
                    Next Step <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold">Firebase & AdMob</h2>
                  <p className="text-slate-400 mt-2">Configure monetization and analytics (Pro features demo).</p>
                </div>

                <div className="space-y-6">
                  {/* Firebase Panel */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Firebase Configuration</h3>
                      <button className="text-xs text-blue-400 hover:text-blue-300 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10">Upload google-services.json</button>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { key: 'enableAnalytics', label: 'Firebase Analytics', desc: 'Track user behavior automatically' },
                        { key: 'enableCrashlytics', label: 'Firebase Crashlytics', desc: 'Real-time crash reporting' },
                        { key: 'enablePushNotifications', label: 'Push Notifications', desc: 'FCM integration' },
                      ].map(item => (
                        <label key={item.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer">
                          <div>
                            <div className="font-medium text-slate-200">{item.label}</div>
                            <div className="text-xs text-slate-500">{item.desc}</div>
                          </div>
                          <div className={`w-12 h-6 rounded-full transition-colors relative ${config[item.key as keyof AppConfig] ? 'bg-purple-500' : 'bg-slate-700'}`}>
                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${config[item.key as keyof AppConfig] ? 'translate-x-6' : 'translate-x-0'}`} />
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={Boolean(config[item.key as keyof AppConfig])}
                            onChange={(e) => setConfig({...config, [item.key]: e.target.checked})}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AdMob Panel */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-lg font-bold mb-4">AdMob Monetization</h3>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1.5">App ID (e.g. ca-app-pub-xxx~yyy)</label>
                      <input 
                        type="text" 
                        placeholder="Leave blank to disable"
                        value={config.admobAppId}
                        onChange={e => setConfig({...config, admobAppId: e.target.value})}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex justify-end">
                  <button onClick={handleNext} className="px-8 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 font-bold transition-all text-white flex items-center gap-2">
                    Review & Build <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'build' && (
              <motion.div
                key="build"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold">Generate APK & AAB</h2>
                  <p className="text-slate-400 mt-2">Deploying build container for {config.packageName}</p>
                </div>

                {!isBuilding && !buildComplete ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 bg-purple-500/5 rounded-3xl border border-purple-500/20">
                    <Package className="w-16 h-16 text-purple-400 mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Ready to Build</h3>
                    <p className="text-slate-400 text-center max-w-md mb-8">
                      Your configuration is valid. Clicking build will provision a dedicated container, install Capacitor dependencies, and compile your Android artifacts.
                    </p>
                    <button 
                      onClick={handleStartBuild}
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30 transition-all active:scale-95 w-full md:w-auto"
                    >
                      Start Cloud Build
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col gap-8">
                    <TerminalLogs 
                      isBuilding={isBuilding} 
                      onComplete={() => {
                        setIsBuilding(false);
                        setBuildComplete(true);
                      }} 
                    />

                    {buildComplete && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid md:grid-cols-2 gap-4"
                      >
                        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex flex-col items-center text-center">
                          <CheckCircle2 className="w-10 h-10 text-green-400 mb-4" />
                          <h4 className="font-bold text-lg mb-1">Signed APK</h4>
                          <p className="text-xs text-slate-400 mb-6">Ideal for direct distribution & testing.</p>
                          <button className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold flex items-center justify-center gap-2 transition-colors">
                            <Download className="w-4 h-4" /> Download APK
                          </button>
                        </div>
                        <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 px-3 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded-bl-lg uppercase tracking-wider">Play Store</div>
                          <CheckCircle2 className="w-10 h-10 text-blue-400 mb-4" />
                          <h4 className="font-bold text-lg mb-1">Android App Bundle (AAB)</h4>
                          <p className="text-xs text-slate-400 mb-6">Required format for Google Play Console.</p>
                          <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-colors">
                            <Download className="w-4 h-4" /> Download AAB
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
