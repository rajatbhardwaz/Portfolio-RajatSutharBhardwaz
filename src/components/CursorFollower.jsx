import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring — smooth trail
  const ringSpring = { damping: 30, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, ringSpring);
  const ringY = useSpring(cursorY, ringSpring);

  // Inner dot — snappier follow
  const dotSpring = { damping: 40, stiffness: 400, mass: 0.2 };
  const dotX = useSpring(cursorX, dotSpring);
  const dotY = useSpring(cursorY, dotSpring);

  useEffect(() => {
    // Only show on non-touch devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e) => {
      const el = e.target.closest("a, button, [data-cursor-hover]");
      if (el) setHoveringInteractive(true);
    };

    const handleOut = (e) => {
      const el = e.target.closest("a, button, [data-cursor-hover]");
      if (el) setHoveringInteractive(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  // Don't render anything — but hooks are still called above (no conditional return before hooks)
  if (!visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hoveringInteractive ? 48 : 28,
          height: hoveringInteractive ? 48 : 28,
          opacity: hoveringInteractive ? 0.4 : 0.15,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Inner dot */}
      <motion.div
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: hoveringInteractive ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </>
  );
}
