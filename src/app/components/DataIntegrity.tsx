import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export function DataIntegrity() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50/40 border-y border-blue-100/80">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
              Data Integrity
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-8 text-gray-900 leading-tight">
            A note on data integrity.
          </h2>

          {/* Body */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Every number in your Redefinance draft traces back to its source. No black boxes, no unexplained figures. You'll see where each data point came from before you decide whether to use it. We don't ask you to trust the output blindly. We show you the chain.
          </p>

          {/* Closing statement — left border accent */}
          <div className="border-l-4 border-blue-600 pl-5">
            <p className="text-lg text-gray-900 font-medium leading-relaxed">
              Redefinance is a research starting point, not a final deliverable. The analysis, and the accountability for it, remains entirely yours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
