import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function FoundingOffer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    painPoint: '',
    motivation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validFields, setValidFields] = useState({
    name: false,
    email: false,
    role: false,
    company: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
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
    '80% off our public launch price (€99 now, locked for life)',
    'Your workflow shapes the product. We build what you actually need.',
    'First access to every feature as it goes live',
    'Structured onboarding call to map your current process',
    'Full refund if we don\'t launch. Your €99 is never at risk.',
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
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming a founding firm. We will review your application
              and reach out within a few days to schedule a call and discuss next steps.
            </p>
            <p className="text-sm text-gray-500">
              Check your email ({formData.email}) for confirmation.
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
            Join the Founding Cohort
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
              <h3 className="text-2xl mb-2 text-gray-900">What Founding Firms Get</h3>
              <p className="text-gray-600">As a founding cohort member, you receive:</p>
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
                <span className="text-3xl text-gray-900">€99</span>
                <span className="text-gray-600">now · 80% off at launch</span>
              </div>
              <p className="text-sm text-gray-600">
                No payment now. We review your application, schedule a call, and if we are both a fit, you confirm your spot with €99. Your 80% founding discount stays yours forever.
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

              {/* Pain point */}
              <div>
                <Label htmlFor="painPoint">What slows your firm down most when preparing a client's credit file for the bank? *</Label>
                <Textarea
                  id="painPoint"
                  name="painPoint"
                  required
                  value={formData.painPoint}
                  onChange={handleInputChange}
                  placeholder="e.g. collecting documents from clients, recalculating ratios for each case, formatting for different banks..."
                  className="mt-1.5 min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Motivation */}
              <div>
                <Label htmlFor="motivation">How many SME credit files does your firm handle in a typical month? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleInputChange}
                  placeholder="Give us a rough sense of volume and what types of financing you typically help clients with..."
                  className="mt-1.5 min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                        Submitting...
                      </>
                    ) : (
                      'Apply for a Founding Firm Spot →'
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