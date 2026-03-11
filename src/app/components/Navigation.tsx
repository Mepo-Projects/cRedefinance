import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-semibold text-xl text-gray-900 cursor-pointer">Redefinance</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              onClick={() => scrollToSection('founding-offer')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ y: -2 }}
            >
              Founding Offer
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('faq')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ y: -2 }}
            >
              FAQ
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('founding-offer')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Now
              </Button>
            </motion.div>
          </div>

          <div className="md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => scrollToSection('founding-offer')}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}