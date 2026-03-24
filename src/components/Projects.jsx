import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ─── Vaytro — featured single-image project ─── */
function VaytroCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      id="project-vaytro"
      variants={cardVariant}
      className="project-card project-card--featured"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <div className="project-card__image-wrap project-card__image-wrap--featured">
        <motion.img
          src="https://i.pinimg.com/736x/e8/14/50/e814504c5b73be7dfa6e5be8f5d72643.jpg"
          alt="Vaytro — App Design"
          animate={{
            scale: hovered ? 1.03 : 1,
            filter: hovered ? "brightness(1.1)" : "brightness(1)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="project-card__image"
        />
      </div>

      <div className="project-card__info">
        <span className="project-card__label">01 — App Design</span>
        <h3 className="project-card__title">Vaytro</h3>
        <p className="project-card__desc">
          A beautifully crafted travel app concept with immersive visuals and
          modern UI patterns.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Portfolio & More — vertical multi-image showcase ─── */
function PortfolioCard() {
  const [hovered, setHovered] = useState(false);

  const images = [
    {
      src: "https://i.pinimg.com/736x/c6/da/45/c6da451a188e9fbc2e77fd822b8e5f56.jpg",
      alt: "Portfolio — Bazil Awwwards Design",
    },
    {
      src: "https://i.pinimg.com/736x/cb/fd/55/cbfd55ffbd0e2b086c3f77e4559852c5.jpg",
      alt: "Portfolio — Web Design Concept",
    },
    {
      src: "https://i.pinimg.com/736x/c1/f7/98/c1f79813c7da4f6371459f78e87f07b1.jpg",
      alt: "Portfolio — Graphic Design Portfolio 2024",
    },
  ];

  return (
    <motion.div
      id="project-portfolio"
      variants={cardVariant}
      className="project-card project-card--multi"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      <div className="project-card__info">
        <span className="project-card__label">02 — Portfolio & More</span>
        <h3 className="project-card__title">Portfolio & Many Others</h3>
        <p className="project-card__desc">
          A curated collection of portfolio designs, web concepts, and creative
          explorations.
        </p>
      </div>

      <div className="project-card__gallery">
        {images.map((img, i) => (
          <div key={i} className="project-card__gallery-item">
            <motion.img
              src={img.src}
              alt={img.alt}
              animate={{
                scale: hovered ? 1.02 : 1,
                filter: hovered ? "brightness(1.08)" : "brightness(1)",
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
              className="project-card__image"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
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
              Selected Work
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              animate={headingInView ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.06, ease: revealEase }}
              className="card-section__heading"
            >
              Projects
            </motion.h2>
          </div>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: smoothEase }}
          className="card-section__count"
        >
          <span className="dot dot-green" />
          02
        </motion.span>
      </div>

      {/* Projects layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="projects-showcase"
      >
        <VaytroCard />
        <PortfolioCard />
      </motion.div>
    </section>
  );
}
