import { motion } from 'motion/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'Is the product live now?',
    answer:
      "No. Redefinance is in pre-launch. Founding firms work directly with our team during development, receiving hands-on support and early access as features go live. You're joining to help shape the product and secure founding terms.",
  },
  {
    question: 'What happens after I apply?',
    answer:
      "We review your application and reach out within a few days to schedule a call. On that call we learn about your firm, how you currently handle SME credit files, and what you are trying to solve. If it is a good fit for both sides, we confirm your spot and you pay the €99 founding fee. Then we get to work.",
  },
  {
    question: "What if the product doesn't fit my needs?",
    answer:
      "We don't offer a standard money-back guarantee. If we fail to launch, you get a full refund. If you join and the direction doesn't fit your firm, we'll have a direct conversation about it. The €99 is a commitment to building this together, and we take that seriously on our side too.",
  },
  {
    question: 'How is this different from joining the waitlist?',
    answer:
      'Waitlist members receive updates and access when we publicly launch at standard pricing. Founding firms get direct founder access, influence over what gets built, 80% off our public launch price locked for life, and first access as features launch.',
  },
  {
    question: 'Why pay €99 before the product exists?',
    answer:
      'You are not paying for a finished product. You are securing a seat in a cohort of 5 accounting and credit advisory firms who will shape what gets built. If your firm handles SME credit files regularly, you already know the cost of doing this manually — in time, in inconsistency, in capacity. Founding members get 80% off our public launch price locked for life, direct influence over the roadmap, and a working relationship with the founders throughout the build. The €99 also signals that you are serious about solving this. And if we do not launch, you get a full refund.',
  },
  {
    question: 'How many founding firms are you accepting?',
    answer:
      "We're limiting this cohort to 5 founding firms. That's intentional. We need to give each firm real attention during the discovery phase, and we can't do that with a large group. Once all 5 spots are filled, the offer closes.",
  },
  {
    question: 'What problem does Redefinance solve?',
    answer:
      'Accounting firms and credit advisors spend significant time on each SME client that needs bank financing: collecting documents across multiple categories, running financial analysis, calculating ratios, reviewing cash flow, and formatting everything to the bank\'s requirements. They do this repeatedly, for every client, with no standardised tool. We are building one — designed specifically for the firms doing this work, not the banks receiving it.',
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
            Everything you need to know about becoming a founding firm
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
