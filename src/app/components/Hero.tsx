import { motion } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center pt-28 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto w-full text-center">
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
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Every SME client that needs financing means another folder, another document chase, another set of ratios rebuilt from scratch. Your firm does this work — and there is still no tool built for accounting firms who do it. We are fixing that, with 5 firms who feel this problem every week.
          </p>

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
                  Apply for Founding Access (€99)
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
    </section>
  );
}
