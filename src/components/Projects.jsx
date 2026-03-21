import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const projects = [
  {
    id: "01",
    title: "Booqup",
    category: "Web App",
    description: "Smart appointment booking system for modern businesses.",
    image: "/images/booqup.png",
  },
  {
    id: "02",
    title: "Salon Demo",
    category: "Website",
    description: "Premium demo website for a luxury salon brand.",
    image: "/images/salon.png",
  },
  {
    id: "03",
    title: "Modern Landing",
    category: "UI Design",
    description: "Bold, typography-focused landing page design.",
    image: "/images/landing.png",
  },
  {
    id: "04",
    title: "E-Commerce Dashboard",
    category: "Web App",
    description: "Full-featured admin panel for online store management.",
    image: "/images/ecommerce.png",
  },
  {
    id: "05",
    title: "Fitness Tracker",
    category: "App Design",
    description: "Health & workout tracking app with progress insights.",
    image: "/images/fitness.png",
  },
  {
    id: "06",
    title: "3D Configurator",
    category: "Creative Dev",
    description: "Interactive product configurator with real-time 3D.",
    image: "/images/configurator.png",
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: smoothEase },
  },
};

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      id={`project-${project.id}`}
      variants={cardVariant}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Image */}
      <div className="project-card__image-wrap">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{
            scale: hovered ? 1.03 : 1,
            filter: hovered ? "brightness(1.1)" : "brightness(1)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="project-card__image"
        />
      </div>

      {/* Info */}
      <div className="project-card__info">
        <span className="project-card__label">
          {project.id} — {project.category}
        </span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
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
          {String(projects.length).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Grid */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="card-grid"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
