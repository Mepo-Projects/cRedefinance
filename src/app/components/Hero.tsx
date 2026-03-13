import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';
import { ArrowRight, Shield, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  const scrollY = useMotionValue(0);
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex flex-col items-center pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-200/50 hover:bg-blue-100 transition-all duration-300 cursor-default"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700">FOR ACCOUNTING & CREDIT ADVISORY FIRMS · 5 FOUNDING SPOTS</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-gray-900 leading-tight">
             Stop rebuilding the same loan package from scratch.
          </h1>

          {/* Subheadline */}
          <div className='max-w-3xl mx-auto'>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Every engagement starts from a blank spreadsheet. Every document has to be chased. Every ratio recalculated. There is still no tool built for firms doing this work, so we are building one with 5 accounting firms who live this problem.
          </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection('founding-offer')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">
                  Apply for Founding Access
                  <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-green-300 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-gray-700">Full refund if no launch</span>
            </motion.div>
          </div>

        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="w-full flex justify-center pb-8 mt-10 pointer-events-none"
        style={{ opacity: chevronOpacity }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-500/70">
            How it works
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-blue-500" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.15 }}
            className="opacity-50"
          >
            <ChevronDown className="h-4 w-4 -mt-3 text-blue-400" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
