import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as WouterLink, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'home', type: 'scroll' },
    { name: 'About', to: 'about', type: 'scroll' },
    { name: 'Services', to: 'services', type: 'scroll' },
    { name: 'Internship', to: 'internship', type: 'scroll' },
    { name: 'Order Website', to: '/web-development', type: 'link' },
  ];

  const isHome = location === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <WouterLink href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              VY
            </div>
            <span className={`text-xl font-bold tracking-tight text-slate-900`}>
              NextGen Tech
            </span>
          </div>
        </WouterLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.type === 'scroll' && isHome ? (
              <ScrollLink
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-sm font-medium text-slate-600 hover:text-primary cursor-pointer transition-colors"
              >
                {link.name}
              </ScrollLink>
            ) : (
              <WouterLink
                key={link.name}
                href={link.type === 'scroll' ? `/#${link.to}` : link.to}
                className="text-sm font-medium text-slate-600 hover:text-primary cursor-pointer transition-colors"
              >
                {link.name}
              </WouterLink>
            )
          ))}
          {isHome ? (
            <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Contact Us
              </Button>
            </ScrollLink>
          ) : (
            <WouterLink href="/#contact">
              <Button className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Contact Us
              </Button>
            </WouterLink>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                link.type === 'scroll' && isHome ? (
                  <ScrollLink
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-600 py-2 border-b border-slate-50 cursor-pointer"
                  >
                    {link.name}
                  </ScrollLink>
                ) : (
                  <WouterLink
                    key={link.name}
                    href={link.type === 'scroll' ? `/#${link.to}` : link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-slate-600 py-2 border-b border-slate-50 cursor-pointer"
                  >
                    {link.name}
                  </WouterLink>
                )
              ))}
              {isHome ? (
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full mt-4">Contact Us</Button>
                </ScrollLink>
              ) : (
                <WouterLink href="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full mt-4">Contact Us</Button>
                </WouterLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
