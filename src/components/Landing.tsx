import { motion } from 'motion/react';
import { ArrowRight, Box, Smartphone, Play, Code2, Zap, ShieldCheck } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="w-full flex-1 flex flex-col pt-16 pb-24 space-y-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center relative pointer-events-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>V1.0 is now live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight max-w-4xl text-white drop-shadow-sm leading-tight md:leading-tight"
        >
          Convert AI Studio Projects into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Android/Play</span> Apps
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-xl text-slate-400 max-w-2xl font-medium"
        >
          Transform your HTML, React, and Next.js projects from Google AI Studio directly into
          production-ready APKs and AABs. Cloud-built in minutes.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex items-center justify-center"
        >
          <button 
            onClick={onStart}
            className="group px-8 py-4 bg-white text-slate-950 font-bold rounded-full text-lg flex items-center gap-3 hover:bg-slate-200 transition-all active:scale-95 shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] cursor-pointer"
          >
            Build App Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 lg:px-8 relative pointer-events-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Everything you need to ship</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Our cloud infrastructure handles the complex Android build chain so you can focus on building your app with AI.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Smartphone,
              title: 'Auto Conversion',
              desc: 'Automatically wraps your web projects with optimized Capacitor/WebViews and native bridging.'
            },
            {
              icon: Play,
              title: 'Play Store Ready (AAB)',
              desc: 'Generates signed Android App Bundles that are compliant with the Google Play Store.'
            },
            {
              icon: ShieldCheck,
              title: 'Keystore Management',
              desc: 'Securely manage your signing keys for releases. Easily update and publish new versions.'
            },
            {
              icon: Box,
              title: 'Firebase Analytics',
              desc: 'Connect your google-services.json to automatically inject Crashlytics and Analytics.'
            },
            {
              icon: Zap,
              title: 'AdMob Integration',
              desc: 'Monetize out of the box with auto-injected native banner and interstitial ad blocks.'
            },
            {
              icon: Code2,
              title: 'Real-time Logs',
              desc: 'Watch the Gradle build process through a live streaming terminal in the dashboard.'
            }
          ].map((feat, i) => (
            <motion.div 
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 lg:px-8 relative pointer-events-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Simple, transparent pricing</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Start building for free, upgrade when you need to publish.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              name: 'Free',
              price: '$0',
              period: 'forever',
              features: ['Unsigned APK Builds', 'Watermarked Splash Screen', 'Community Support', '1 Build Concurrent'],
              cta: 'Start Free'
            },
            {
              name: 'Pro',
              price: '$12',
              period: 'per month',
              popular: true,
              features: ['Signed AABs (Play Store)', 'Custom App Icon & Splash', 'Firebase Integration', 'AdMob Setup', 'Priority Builds'],
              cta: 'Get Pro'
            },
            {
              name: 'Enterprise',
              price: '$99',
              period: 'per year',
              features: ['White Label Builds', 'API Access', 'Custom Domain', 'Team Collaboration', '24/7 Priority Support'],
              cta: 'Contact Sales'
            }
          ].map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl border flex flex-col ${plan.popular ? 'bg-purple-900/20 border-purple-500/50 relative shadow-2xl shadow-purple-900/20' : 'bg-slate-900/50 border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold font-display">{plan.name}</h3>
              <div className="my-6">
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400">/{plan.period}</span>
              </div>
              <ul className="my-8 space-y-4 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${plan.popular ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
