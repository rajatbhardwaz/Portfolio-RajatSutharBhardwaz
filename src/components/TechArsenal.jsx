import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

/*
 * Volumen × Rico — editorial cards, infinite horizontal marquee.
 * Cards scroll continuously left in a seamless loop.
 */
const techVolumes = [
  { id:1,  abbr:"Re.", name:"React",      edition:"v18+",    details:["Component Architecture","Hooks & State Mgmt","Virtual DOM"],       meta:"Frontend · Library" },
  { id:2,  abbr:"Js.", name:"JavaScript", edition:"ES6+",    details:["Async / Await","Modules & Closures","DOM Manipulation"],            meta:"Language · Core" },
  { id:3,  abbr:"Fg.", name:"Figma",      edition:"2024",    details:["UI/UX Design","Prototyping","Design Systems"],                      meta:"Design · Tool" },
  { id:4,  abbr:"Fl.", name:"Flutter",    edition:"v3+",     details:["Cross-Platform","Widget System","Dart Language"],                   meta:"Mobile · Framework" },
  { id:5,  abbr:"Nd.", name:"Node.js",    edition:"v20+",    details:["Server-Side JS","Express & REST","NPM Ecosystem"],                 meta:"Backend · Runtime" },
  { id:6,  abbr:"Mg.", name:"MongoDB",    edition:"v7+",     details:["NoSQL Database","Aggregation Pipeline","Atlas Cloud"],              meta:"Database · NoSQL" },
  { id:7,  abbr:"Nx.", name:"Next.js",    edition:"v14+",    details:["SSR & ISR","App Router","API Routes"],                              meta:"Framework · Fullstack" },
  { id:8,  abbr:"Tw.", name:"Tailwind",   edition:"v4+",     details:["Utility-First CSS","JIT Compiler","Responsive Design"],             meta:"CSS · Framework" },
  { id:9,  abbr:"Ts.", name:"TypeScript", edition:"v5+",     details:["Static Typing","Generics & Interfaces","Type Safety"],              meta:"Language · Typed" },
  { id:10, abbr:"Py.", name:"Python",     edition:"v3.12+",  details:["AI / ML Scripts","Data Automation","Fast Prototyping"],             meta:"Language · Versatile" },
  { id:11, abbr:"Gt.", name:"Git",        edition:"v2+",     details:["Version Control","Branching Strategy","Collaboration"],             meta:"DevOps · VCS" },
  { id:12, abbr:"Fb.", name:"Firebase",   edition:"v10+",    details:["Auth & Firestore","Cloud Functions","Realtime DB"],                 meta:"BaaS · Google" },
];

const CARD_W = 280;
const GAP = 16;

/* Staggered entrance variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardEntrance = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16, mass: 0.8 },
  },
};

/* Single card component */
function VolCard({ vol, index, isPaused, onPause, onResume }) {
  return (
    <motion.div
      className="vol-card"
      variants={cardEntrance}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      data-cursor-hover
    >
      <div className="vol-card__header">
        <span className="vol-card__brand">digital—arsenal</span>
        <span className="vol-card__edition">Collection {vol.edition}</span>
      </div>

      <div className="vol-card__divider" />

      <div className="vol-card__index">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="vol-card__body">
        <div className="vol-card__left">
          <span className="vol-card__abbr">{vol.abbr}</span>
        </div>
        <div className="vol-card__right">
          <span className="vol-card__meta">{vol.meta}</span>
          <div className="vol-card__details">
            {vol.details.map((d) => (
              <span key={d} className="vol-card__detail">{d}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="vol-card__title-area">
        <h3 className="vol-card__title">{vol.name}</h3>
      </div>
    </motion.div>
  );
}

export default function TechArsenal() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  /* Total width of one full set of cards */
  const setWidth = techVolumes.length * (CARD_W + GAP);

  /* Duration for one full loop (px per second speed) */
  const speed = 40; // px per second — slow, smooth drift
  const duration = setWidth / speed;

  /* Drag handling — let users swipe through rapidly */
  const handleDragEnd = useCallback((_, info) => {
    setIsDragging(false);
    /* After drag release, smoothly snap the track position */
    if (trackRef.current) {
      const style = window.getComputedStyle(trackRef.current);
      const matrix = new DOMMatrix(style.transform);
      /* Clamp the position within one set and let CSS animation resume */
      const currentX = matrix.m41;
      const normalized = ((currentX % setWidth) + setWidth) % setWidth;
      trackRef.current.style.transform = `translateX(-${normalized}px)`;
    }
  }, [setWidth]);

  return (
    <section
      id="tech-arsenal"
      ref={sectionRef}
      className="tech-section section-padding"
    >
      {/* Header */}
      <div ref={headingRef} className="card-section__header">
        <div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={headingInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="card-section__label"
            >
              Tools & Technologies
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headingInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.06, ease: revealEase }}
              className="card-section__heading"
            >
              Digital Arsenal
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Infinite marquee viewport */}
      <div className="slider-viewport">
        <motion.div
          ref={trackRef}
          className="marquee-track"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            animationDuration: `${duration}s`,
            animationPlayState: (isPaused || isDragging) ? "paused" : "running",
          }}
          drag="x"
          dragConstraints={{ left: -setWidth * 2, right: setWidth }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {/* First set of cards */}
          {techVolumes.map((vol, i) => (
            <VolCard
              key={`a-${vol.id}`}
              vol={vol}
              index={i}
              isPaused={isPaused}
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
            />
          ))}
          {/* Duplicate set for seamless loop */}
          {techVolumes.map((vol, i) => (
            <VolCard
              key={`b-${vol.id}`}
              vol={vol}
              index={i}
              isPaused={isPaused}
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
