import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Website Design",
    description:
      "Custom-built websites that convert visitors into customers. Clean, fast, and mobile-first.",
  },
  {
    number: "02",
    title: "Booking Systems",
    description:
      "Online appointment and booking solutions. Automate scheduling and reduce no-shows.",
  },
  {
    number: "03",
    title: "UI/UX Design",
    description:
      "Intuitive interfaces designed for clarity. Every pixel serves a purpose.",
  },
  {
    number: "04",
    title: "App Development",
    description:
      "Cross-platform applications built for performance and seamless user experience.",
  },
  {
    number: "05",
    title: "3D & Motion",
    description:
      "Immersive 3D visuals and motion design that bring digital experiences to life.",
  },
  {
    number: "06",
    title: "Creative Development",
    description:
      "Experimental and interactive builds that push the boundaries of the web.",
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

function ServiceCard({ service }) {
  return (
    <motion.div
      id={`service-${service.number}`}
      variants={cardVariant}
      className="service-card"
      data-cursor-hover
    >
      {/* Number */}
      <span className="service-card__number">{service.number}</span>

      {/* Title */}
      <h3 className="service-card__title">{service.title}</h3>

      {/* Description */}
      <p className="service-card__desc">{service.description}</p>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="card-section section-padding"
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
              What I Offer
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headingInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.06, ease: revealEase }}
              className="card-section__heading"
            >
              Services
            </motion.h2>
          </div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
          className="card-section__count"
        >
          <span className="dot dot-red" />
          {String(services.length).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Grid */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="card-grid"
      >
        {services.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </motion.div>
    </section>
  );
}
