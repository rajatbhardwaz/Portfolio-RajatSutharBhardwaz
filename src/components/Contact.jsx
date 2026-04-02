import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const smoothEase = [0.25, 0.1, 0.25, 1];
const revealEase = [0.16, 1, 0.3, 1];

const headingContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const wordVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: revealEase },
  },
};

const contactDetails = [
  {
    label: "Email",
    value: "rajatbhardwaj1804@gmail.com",
    href: "mailto:rajatbhardwaj1804@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 8209659071",
    href: "tel:+918209659071",
  },
  {
    label: "WhatsApp",
    value: "Direct Message",
    href: "https://wa.me/918209659071",
  },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/beingrajattastic?igsh=OGNseGhreHpkMTYz" },
  { label: "Pinterest", href: "https://pin.it/2F05mWywy" },
  { label: "GitHub", href: "https://github.com/rajatbhardwaz" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const line1 = "Let's work";
  const line2 = "together";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section section-padding"
    >
      {/* ─── CTA area ─── */}
      <div className="contact-cta-area">
        {/* Label */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="contact-label"
          >
            Get In Touch
          </motion.p>
        </div>

        {/* Big heading */}
        <motion.div
          variants={headingContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="contact-heading-wrap"
        >
          <div className="contact-heading-line">
            {line1.split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span variants={wordVariant} className="contact-heading-word">
                  {word}
                </motion.span>
              </div>
            ))}
          </div>
          <div className="contact-heading-line">
            {line2.split(" ").map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span variants={wordVariant} className="contact-heading-word contact-heading-word--muted">
                  {word}
                </motion.span>
              </div>
            ))}
            <div className="overflow-hidden">
              <motion.span variants={wordVariant} className="contact-heading-word">
                .
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: smoothEase }}
          className="contact-subtext"
        >
          Have a project in mind? I'd love to hear about it.
          Let's build something great.
        </motion.p>

        {/* Email CTA — clean text link, not a button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: smoothEase }}
        >
          <a
            href="mailto:rajatbhardwaj1804@gmail.com"
            id="contact-cta"
            className="contact-email-link"
            data-cursor-hover
          >
            rajatbhardwaj1804@gmail.com
            <svg
              className="contact-email-arrow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ─── Footer ─── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.9, ease: smoothEase }}
        className="contact-footer"
      >
        {/* Top row — contact details + socials */}
        <div className="contact-footer__top">
          {/* Contact info */}
          <div className="contact-footer__info">
            <p className="contact-footer__name">Rajat Suthar Bhardwaj</p>
            <div className="contact-footer__details">
              {contactDetails.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="contact-footer__detail-link"
                  data-cursor-hover
                >
                  <span className="contact-footer__detail-label">{item.label}</span>
                  <span className="contact-footer__detail-value">{item.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="contact-footer__socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="contact-footer__social-link"
                data-cursor-hover
              >
                {s.label}
                <svg
                  className="contact-footer__social-arrow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="contact-footer__divider" />

        {/* Bottom row — copyright + status */}
        <div className="contact-footer__bottom">
          <p className="contact-footer__copy">
            © 2026 Rajat Suthar Bhardwaj — All rights reserved
          </p>
          <p className="contact-footer__status">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="dot dot-green"
            />
            Available for projects
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
