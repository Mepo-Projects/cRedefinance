import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'What does Redefinance actually do?',
    answer:
      'Redefinance is a credit file preparation platform for accounting and credit advisory firms. It structures the entire workflow from client document intake to a completed credit analysis draft: guiding document collection, running financial analysis automatically, and compiling everything into a reviewable file. Your firm reviews and signs off on the output. Redefinance handles the preparation work.',
  },
  {
    question: 'What documents does it process?',
    answer:
      'Redefinance processes the full set of documents required in a standard SME credit analysis: the annual financial statement, balance sheet, income statement, gross balance (trial balance), closing statement (final ledger), analytical ledger cards, audit reports, business plan, cash flow statement, and projected cash flow. The intake is guided, your client is walked through exactly what to provide for each category, and you can see at a glance what has arrived, what is pending, and what is still missing.',
  },
  {
    question: 'What does the analysis output include?',
    answer:
      'The credit analysis draft includes the full set of indicators your firm is expected to produce: Net Working Capital, Current Ratio, Debt to Assets, EBITDA, ROA, ROE, and cash flow coverage metrics. Every figure is linked to the source document and the period it was calculated from. Nothing unexplained, nothing you cannot verify.',
  },
  {
    question: 'Can I verify every number in the output?',
    answer:
      'Yes, and that is a core design principle. Every figure in a Redefinance draft traces back to the document it came from. You see the source statement, the period it covers, and the formula applied. Redefinance is a research starting point, not a final deliverable. The professional judgment and accountability for the file stays entirely with you.',
  },
  {
    question: 'What types of SME financing cases does it cover?',
    answer:
      'The initial focus is on standard bank credit applications for SMEs: working capital loans, investment financing, and similar cases that require a full credit file with financial analysis. We are building the scope together with founding clients, so coverage will reflect real cases from each founding client we work with.',
  },
  {
    question: 'What stage is the product at right now?',
    answer:
      'Redefinance is in pre-development. We are currently onboarding 5 founding clients, each one worked with individually, not as a group. Your workflow, your cases, and your feedback directly shape what gets built. There is no live product yet. Each founding client gets direct access to the founders during the build and first access to every feature as it goes live.',
  },
  {
    question: 'What if Redefinance does not launch?',
    answer:
      'If we do not launch, you get a full refund of your €99 founding fee. No questions asked. The fee is a commitment signal on both sides. It is not a purchase of a finished product.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            How the product works, what it produces, and where it stands
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border border-gray-200 rounded-lg px-6 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
