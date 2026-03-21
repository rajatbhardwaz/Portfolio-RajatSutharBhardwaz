import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const capabilities = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Crafting intuitive interfaces where every pixel has purpose.",
    dotColor: "dot-red",
  },
  {
    id: "02",
    title: "Web Development",
    description: "Performance-first websites built for speed and scale.",
    dotColor: "dot-green",
  },
  {
    id: "03",
    title: "App Development",
    description: "Native-feel applications across every platform.",
    dotColor: "dot-yellow",
  },
  {
    id: "04",
    title: "Booking Systems",
    description: "Automated scheduling that eliminates friction.",
    dotColor: "dot-red",
  },
  {
    id: "05",
    title: "3D Modeling",
    description: "Immersive 3D assets that bring ideas to life.",
    dotColor: "dot-green",
  },
  {
    id: "06",
    title: "Creative Development",
    description: "Experimental builds that push digital boundaries.",
    dotColor: "dot-yellow",
  },
];

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: smoothEase,
    },
  }),
};

function CapabilityItem({ item, index }) {
  return (
    <motion.div
      id={`capability-${item.id}`}
      custom={index}
      variants={itemVariant}
      className="capability-item group"
      data-cursor-hover
    >
      {/* Top divider */}
      <div className="capability-divider" />

      {/* Content row */}
      <div className="capability-content">
        {/* Number */}
        <span className="capability-number">{item.id}</span>

        {/* Title + Description */}
        <div className="capability-text">
          <h3 className="capability-title">
            {/* Hover dot — appears on hover */}
            <span className={`capability-dot dot ${item.dotColor}`} />
            {item.title}
          </h3>
          <p className="capability-desc">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="what-i-do"
      ref={sectionRef}
      className="what-i-do-section section-padding"
    >
      {/* Header */}
      <div ref={headingRef} className="what-i-do-header">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={headingInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="what-i-do-label"
          >
            Capabilities
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={headingInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06, ease: revealEase }}
            className="what-i-do-heading"
          >
            WHAT I DO
          </motion.h2>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="capabilities-grid"
      >
        {capabilities.map((item, index) => (
          <CapabilityItem key={item.id} item={item} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
