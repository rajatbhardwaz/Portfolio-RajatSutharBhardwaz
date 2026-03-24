import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import Projects from "./components/Projects";
import TechArsenal from "./components/TechArsenal";
import Services from "./components/Services";
import Contact from "./components/Contact";
import CursorFollower from "./components/CursorFollower";

export default function App() {
  return (
    <div className="bg-black min-h-screen">
      <CursorFollower />
      <Navbar />

      <main>
        <Hero />

        <div className="section-divider" />

        <WhatIDo />

        <div className="section-divider" />

        <Projects />

        <div className="section-divider" />

        <TechArsenal />

        <div className="section-divider" />

        <Services />

        <div className="section-divider" />

        <Contact />
      </main>
    </div>
  );
}
