import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  emailPattern,
  isValidCompanyName,
  isValidFullName,
  isValidLinkedInUrl,
  type WaitlistFormValues,
} from '../../lib/waitlist';

export function Waitlist() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const form = useForm<WaitlistFormValues>({
    defaultValues: {
      name: '',
      companyName: '',
      email: '',
      linkedin: '',
      website: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        if (data?.errors && typeof data.errors === 'object') {
          for (const [fieldName, message] of Object.entries(data.errors)) {
            if (typeof message === 'string') {
              form.setError(fieldName as keyof WaitlistFormValues, {
                type: 'server',
                message,
              });
            }
          }
        }

        throw new Error(data?.message || 'We could not submit your application right now.');
      }

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not submit your application right now.',
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-16">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-sm"
        >
          {isSubmitted ? (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900">You're on the list</h3>
              <p className="text-gray-600">
                We'll notify you when we launch publicly. Check your email for confirmation.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Not ready for a founding spot?
                </p>
                <h2 className="text-2xl sm:text-3xl mb-3 text-gray-900">
                  Join the Waitlist
                </h2>
                <p className="text-gray-600">
                  We will let you know when Redefinance launches publicly. Purpose-built for accounting and credit advisory firms.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0 pointer-events-none"
                    {...form.register('website')}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{
                        required: 'Enter your full name.',
                        minLength: {
                          value: 2,
                          message: 'Your name must be at least 2 characters.',
                        },
                        validate: (value) =>
                          isValidFullName(value) || 'Enter your first and last name.',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="name"
                              placeholder="Jane Smith"
                              className="mt-1.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="companyName"
                      rules={{
                        required: 'Enter your company name.',
                        minLength: {
                          value: 2,
                          message: 'Company name must be at least 2 characters.',
                        },
                        validate: (value) =>
                          isValidCompanyName(value) || 'Enter a valid company name.',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="organization"
                              placeholder="Acme Advisory"
                              className="mt-1.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: 'Enter your work email.',
                        pattern: {
                          value: emailPattern,
                          message: 'Enter a valid email address.',
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              autoComplete="email"
                              inputMode="email"
                              placeholder="you@company.com"
                              className="mt-1.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="linkedin"
                      rules={{
                        required: 'Enter your LinkedIn URL.',
                        validate: (value) =>
                          isValidLinkedInUrl(value.trim()) ||
                          'Enter a valid LinkedIn profile or company URL.',
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoComplete="url"
                              inputMode="url"
                              placeholder="linkedin.com/in/jane-smith"
                              className="mt-1.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        'Join Waitlist'
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-gray-500 text-center">
                    No spam. Just launch updates and product news.
                  </p>
                </form>
              </Form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
