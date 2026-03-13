import { motion } from 'motion/react';
import { ClipboardList, BarChart2, FileText } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    label: 'Guided Document Intake',
    subtitle: (
      <>
        We guide your client through providing everything needed: <strong>income statement</strong>, <strong>balance sheet</strong>, <strong>cash flow statement</strong>, <strong>audit reports</strong>, and everything else. Tracked in one place so you always know what has arrived and what is still missing.
      </>
    ),
    foundingNote: 'Founding clients define which documents the intake requests.',
  },
  {
    icon: BarChart2,
    label: 'We Process It For You',
    subtitle: (
      <>
        We run the numbers on everything collected and surface what matters: <strong>Net Working Capital</strong>, <strong>Current Ratio</strong>, <strong>EBITDA</strong>, <strong>ROA</strong>, <strong>ROE</strong>, and the full set of indicators your analysis requires. No rebuilt formulas. No manual inputs.
      </>
    ),
    foundingNote: 'Founding clients shape which indicators get calculated.',
  },
  {
    icon: FileText,
    label: 'Your Draft. Ready to be reviewed.',
    subtitle: (
      <>
        You receive a complete <strong>credit analysis draft</strong>: every figure linked to its source document, every ratio traceable to the period and statement it was calculated from. Review it, adjust it, and submit with confidence.
      </>
    ),
    foundingNote: 'Founding clients influence the output structure and format.',
  },
];

export function CredibilityStrip() {
  return (
    <section id="how-it-works" className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl mb-12 text-gray-900 text-center"
        >
          How Redefinance Works
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
                <p className="text-sm text-gray-600 leading-snug text-center mb-4">{step.subtitle}</p>
                <div className="border-t border-blue-100 pt-3 mt-auto">
                  <p className="text-xs text-blue-600 text-center font-medium">✦ {step.foundingNote}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
