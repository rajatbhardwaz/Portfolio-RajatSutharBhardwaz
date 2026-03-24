import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

/*
 * Each card has unique dimensions to create an organic, staggered layout.
 * flexBasis = resting width proportion,
 * height    = card height (varies ±),
 * offsetY   = vertical shift for stagger
 */
const projects = [
  { id: 1, title: "Booqup",               category: "Web App",     flexBasis: 1.1,  height: "92%",  offsetY: 12  },
  { id: 2, title: "Vaytro",               category: "App Design",  flexBasis: 0.85, height: "100%", offsetY: -8  },
  { id: 3, title: "AIOS",                 category: "AI Platform", flexBasis: 1.2,  height: "88%",  offsetY: 20  },
  { id: 4, title: "Wildo",                category: "Creative",    flexBasis: 0.9,  height: "96%",  offsetY: -14 },
  { id: 5, title: "AI Surveillance CCTV", category: "AI / IoT",    flexBasis: 1.0,  height: "90%",  offsetY: 8   },
  { id: 6, title: "Smarth Sathi",         category: "Mobile App",  flexBasis: 0.95, height: "98%",  offsetY: -4  },
];

/* Unique gradient for each card */
const cardGradients = [
  "linear-gradient(160deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
  "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "linear-gradient(160deg, #0d1117 0%, #161b22 50%, #1f2937 100%)",
  "linear-gradient(160deg, #1b1b2f 0%, #2d1b4e 50%, #462a6f 100%)",
  "linear-gradient(160deg, #0c0c1d 0%, #1a1a3e 50%, #2a2a5e 100%)",
  "linear-gradient(160deg, #1a1c20 0%, #2d3436 50%, #3d4148 100%)",
];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const [hoveredId, setHoveredId] = useState(null);

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
          {String(projects.length).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Accordion cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
        className="accordion-strip"
      >
        {projects.map((project, index) => {
          const isActive = hoveredId === project.id;
          const hasHover = hoveredId !== null;

          return (
            <div
              key={project.id}
              className={`accordion-card ${isActive ? "accordion-card--active" : ""} ${hasHover && !isActive ? "accordion-card--inactive" : ""}`}
              style={{
                background: cardGradients[index],
                flex: isActive ? 4 : hasHover && !isActive ? project.flexBasis * 0.6 : project.flexBasis,
                height: project.height,
                transform: `translateY(${project.offsetY}px)`,
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor-hover
            >
              {/* Collapsed state — vertical title */}
              <div className="accordion-card__collapsed">
                <span className="accordion-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="accordion-card__vertical-title">
                  {project.title}
                </span>
              </div>

              {/* Expanded state — full content */}
              <div className="accordion-card__expanded">
                <div className="accordion-card__top">
                  <span className="accordion-card__category">
                    {project.category}
                  </span>
                  <span className="accordion-card__idx">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="accordion-card__bottom">
                  <h3 className="accordion-card__title">{project.title}</h3>
                  <div className="accordion-card__line" />
                </div>
              </div>

              {/* Subtle overlay gradient */}
              <div className="accordion-card__overlay" />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
