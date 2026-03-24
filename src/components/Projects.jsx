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
  { id: 1, title: "Booqup", category: "Web App", flexBasis: 1.1, height: "92%", offsetY: 12 },
  { id: 2, title: "Vaytro", category: "App Design", flexBasis: 0.85, height: "100%", offsetY: -8 },
  { id: 3, title: "AIOS", category: "AI Platform", flexBasis: 1.2, height: "88%", offsetY: 20 },
  { id: 4, title: "Wildo", category: "Creative", flexBasis: 0.9, height: "96%", offsetY: -14 },
  { id: 5, title: "AI Surveillance CCTV", category: "AI / IoT", flexBasis: 1.0, height: "90%", offsetY: 8 },
  { id: 6, title: "Smarth Sathi", category: "Mobile App", flexBasis: 0.95, height: "98%", offsetY: -4 },
];

/* Unique color for each card */
const cardGradients = [
  "linear-gradient(160deg, #1a6fe8 0%, #2b7fff 50%, #4a9aff 100%)",   /* Blue       */
  "linear-gradient(160deg, #e67e22 0%, #f39c12 50%, #f5ab35 100%)",   /* Orange     */
  "linear-gradient(160deg, #e8e0d0 0%, #f5f0e8 50%, #faf7f2 100%)",   /* Ivory White*/
  "linear-gradient(160deg, #d63031 0%, #e74c3c 50%, #ff6b6b 100%)",   /* Red        */
  "linear-gradient(160deg, #6c3ec1 0%, #8e44cf 50%, #a855f7 100%)",   /* Purple     */
  "linear-gradient(160deg, #0d9f6e 0%, #10b981 50%, #34d399 100%)",   /* Green      */
];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  const [hoveredId, setHoveredId] = useState(null);
  const touchRef = useRef(false);

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

      <p className="card-section__hint">Click or hover on these cards</p>

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
                flex: isActive ? 4 : hasHover && !isActive ? project.flexBasis * 0.6 : project.flexBasis,
                height: project.height,
                transform: `translateY(${project.offsetY}px)`,
              }}
              onMouseEnter={() => {
                if (window.matchMedia("(min-width: 769px)").matches) {
                  setHoveredId(project.id);
                }
              }}
              onMouseLeave={() => {
                if (window.matchMedia("(min-width: 769px)").matches) {
                  setHoveredId(null);
                }
              }}
              onClick={() => {
                if (window.matchMedia("(max-width: 768px)").matches) {
                  setHoveredId((prev) => prev === project.id ? null : project.id);
                }
              }}
              data-cursor-hover
            >
              {/* Default state — big vertical label */}
              <div className="accordion-card__collapsed">
                <span className="accordion-card__big-label">
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
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
