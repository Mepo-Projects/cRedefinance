import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function FoundingOffer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    linkedin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    role: false,
    company: false,
    linkedin: false,
  });

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/founding-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || 'We could not submit your application right now.');
      }

      setIsSubmitted(true);
      window.open('https://calendar.app.google/YqPuB56T52ZqRgL68', '_blank');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not submit your application right now.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'email') {
      setValidFields(prev => ({
        ...prev,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }));
    } else if (name in validFields) {
      setValidFields(prev => ({
        ...prev,
        [name]: value.trim().length > 0,
      }));
    }
  };

  const benefits = [
    'Direct access to founders. No chatbots, no ticket queues.',
    '80% off our public launch price (€199 now, locked for life)',
    'Your workflow shapes the product. We build what you actually need.',
    'First access to every feature as it goes live',
    'Structured onboarding call to map your current process',
    'Full refund if we don\'t launch. Your €199 is never at risk.',
  ];

  if (isSubmitted) {
    return (
      <section id="founding-offer" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 text-center shadow-lg"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl mb-4 text-gray-900">Application Received</h3>
            <p className="text-gray-600 mb-4">
              Thank you for your interest in becoming a founding client. We will review your application and reach out within a few days.
            </p>
            <p className="text-gray-600 mb-6">
              In the meantime, feel free to book a call directly if you'd like to speak sooner.
            </p>
            <a
              href="https://calendar.app.google/YqPuB56T52ZqRgL68"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              Book a Call
            </a>
            <p className="text-sm text-gray-400">
              We'll also follow up at {formData.email}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="founding-offer" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl mb-4 text-gray-900">
            Become a Founding Client
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are looking for 5 accounting or credit advisory firms who prep SME loan files regularly and want a tool built around how they actually work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Benefits Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <motion.div
                className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Limited to 5 firms
              </motion.div>
              <h3 className="text-2xl mb-2 text-gray-900">What Founding Clients Get</h3>
              <p className="text-gray-600">As a founding client, you receive:</p>
            </div>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-6 border-t border-blue-200">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl text-gray-900">€199</span>
                <span className="text-gray-600">now · 80% off at launch</span>
              </div>
              <p className="text-sm text-gray-600">
                No payment now. We review your application, schedule a call, and if we are both a fit, you confirm your spot with €199. Your 80% founding discount stays yours forever.
              </p>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-xl mb-6 text-gray-900">Apply for Founding Access</h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="relative">
                <Label htmlFor="name">Full Name *</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {validFields.name && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Label htmlFor="email">Email *</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@firm.com"
                    className="pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {validFields.email && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Role */}
              <div className="relative">
                <Label htmlFor="role">Role / Job Title *</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Chartered Accountant, Managing Partner, Credit Broker"
                    className="pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {validFields.role && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="relative">
                <Label htmlFor="company">Firm / Company *</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Meridian Advisory"
                    className="pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {validFields.company && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="relative">
                <Label htmlFor="linkedin">LinkedIn *</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="linkedin"
                    name="linkedin"
                    required
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="linkedin.com/in/your-name"
                    className="pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                  {validFields.linkedin && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 15 }}>
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    </motion.div>
                  )}
                </div>
              </div>

              {submitError ? (
                <p
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {submitError}
                </p>
              ) : null}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                        Submitting...
                      </>
                    ) : (
                      'Apply for a Founding Client Spot →'
                    )}
                  </span>
                </Button>
              </motion.div>

              <p className="text-xs text-gray-500 text-center">
                No payment now. You will book a discovery call first.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
