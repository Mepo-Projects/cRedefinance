import { motion } from 'motion/react';
import { FileText, UserCheck, Star } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    label: 'Map Your Workflow',
    subtitle: 'A few working sessions where you walk us through how your firm handles client credit files — what documents you collect, what analysis you run, what you submit to banks.',
  },
  {
    icon: UserCheck,
    label: 'Shape What Gets Built',
    subtitle: 'Everything you show us goes directly into what we build. Your workflow becomes the product spec.',
  },
  {
    icon: Star,
    label: 'First Access. Founding Rate. Forever.',
    subtitle: 'As features go live, you are first to use them. At €99 — 80% off our public launch price, locked for life.',
  },
];

export function CredibilityStrip() {
  return (
    <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl mb-12 text-gray-900 text-center"
        >
          How We Work Together
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div className={`bg-white border rounded-2xl p-6 transition-all duration-300 relative overflow-hidden h-full ${
                index === 1
                  ? 'border-blue-300 shadow-md'
                  : 'border-gray-200 hover:border-blue-200 hover:shadow-lg'
              }`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  index === 0 ? 'bg-blue-50 group-hover:bg-blue-100'
                  : index === 1 ? 'bg-blue-100 group-hover:bg-blue-200'
                  : 'bg-green-50 group-hover:bg-green-100'
                }`}>
                  <step.icon className={`h-7 w-7 ${
                    index === 0 ? 'text-blue-500'
                    : index === 1 ? 'text-blue-600'
                    : 'text-green-600'
                  }`} />
                </div>

                <h3 className="text-base font-medium mb-2 text-gray-900 text-center">{step.label}</h3>
                <p className="text-sm text-gray-600 leading-snug text-center">{step.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
