import { motion } from "framer-motion";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const headingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headingLine = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: revealEase } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden"
    >
      {/* Status dots — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0, ease: smoothEase }}
        className="absolute top-24 right-8 md:top-28 md:right-16 flex items-center gap-2"
      >
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
      </motion.div>

      {/* Main content */}
      <div className="max-w-5xl">
        {/* Big heading — line-by-line text reveal */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          animate="visible"
        >
          {["I Build", "Digital"].map((line) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                variants={headingLine}
                className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter uppercase text-white"
              >
                {line}
              </motion.h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.h1
              variants={headingLine}
              className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tighter uppercase text-gray-400"
            >
              Experiences<span className="text-white">.</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: smoothEase }}
          className="text-gray-500 text-lg md:text-xl font-light tracking-wide mt-8 md:mt-10 max-w-md"
        >
          that help businesses grow
        </motion.p>

        {/* Buttons — redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: smoothEase }}
          className="flex flex-wrap items-center gap-8 mt-10 md:mt-12"
        >
          {/* Primary — bordered, inverts on hover */}
          <motion.a
            href="#contact"
            id="hero-get-demo"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="group inline-flex items-center gap-2 text-white text-xs font-semibold tracking-[0.15em] uppercase hover:text-gray-300 transition-colors duration-500 relative"
            data-cursor-hover
          >
            <span className="dot dot-green" />
            <span className="relative">
              Get Free Demo
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
            </span>
          </motion.a>

          {/* Secondary — text + arrow, underline on hover */}
          <motion.a
            href="#projects"
            id="hero-view-work"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="group inline-flex items-center gap-2 text-gray-400 text-xs font-semibold tracking-[0.15em] uppercase hover:text-white transition-colors duration-500 relative"
            data-cursor-hover
          >
            <span className="relative">
              View Work
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out" />
            </span>
            <svg
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4, ease: smoothEase }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-600 text-[10px] tracking-[0.2em] uppercase"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="block w-px h-6 bg-gray-700"
        />
      </motion.div>
    </section>
  );
}
