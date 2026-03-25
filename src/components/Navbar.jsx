import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

// Name in different languages/scripts
const nameVariants = [
  { text: "Rajat Suthar Bhardwaj", lang: "EN" },
  { text: "रजत सुथार भारद्वाज", lang: "HI" },
  { text: "Раджат Сутхар Бхардвадж", lang: "RU" },
  { text: "拉贾特·苏塔尔·巴德瓦杰", lang: "ZH" },
  { text: "ラジャット・スタール・バードワジ", lang: "JA" },
  { text: "ரஜத் சுதார் பார்த்வாஜ்", lang: "TA" },
  { text: "રજત સુથાર ભારદ્વાજ", lang: "GU" },
];

// Smooth ease curve — subtle, no bounce
const ease = [0.25, 0.1, 0.25, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Cycle through name variants
  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % nameVariants.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800/50"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex items-center justify-between h-16 md:h-20">
          {/* Logo — animated name cycler */}
          <motion.a
            href="#"
            id="nav-logo"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="nav-logo-link"
          >
            <span className="dot dot-green" />
            <span className="nav-logo-text-wrap">
              <AnimatePresence mode="wait">
                <motion.span
                  key={nameIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="nav-logo-text"
                >
                  {nameVariants[nameIndex].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.a>

          {/* Desktop links — staggered entrance */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
              >
                <a
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className="text-gray-400 text-sm font-medium tracking-wide uppercase hover:text-white transition-colors duration-500 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 3.5 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="block w-6 h-px bg-white"
            />
            <motion.span
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -3.5 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="block w-6 h-px bg-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — smooth slide */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.li
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-white text-4xl font-black tracking-tight hover:text-gray-400 transition-colors duration-500 block"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                </div>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
