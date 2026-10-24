(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Add verified footer contact details here. Leave any method blank until it is ready to publish.
  const CONTACT_DETAILS = Object.freeze({
    phone: "+91 8209659071",
    email: "rajatsutharbhardwaz@gmail.com",
    instagram: "", // Full profile URL
    whatsapp: "2809659071", // Digits only, including country code
    threads: "https://www.threads.com/@beingrajattastic?igshid=NTc4MTIwNjQ2YQ==",
    x: "", // Full profile URL
    linkedin: "", // Full profile URL
    github: "", // Full profile URL
  });

  $("#year").textContent = new Date().getFullYear();

  const contactList = $("#contact-list");
  const contactMethods = [
    { key: "phone", label: "Phone", type: "phone" },
    { key: "email", label: "Email", type: "email" },
    { key: "instagram", label: "Instagram", type: "external" },
    { key: "whatsapp", label: "WhatsApp", type: "whatsapp" },
    { key: "threads", label: "Threads", type: "external" },
    { key: "x", label: "X (Twitter)", type: "external" },
    { key: "linkedin", label: "LinkedIn", type: "external" },
    { key: "github", label: "GitHub", type: "external" },
  ];

  const externalUrl = (value) => {
    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  };

  const contactHref = (method, value) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (method.type === "phone") {
      const phone = trimmed.replace(/[^+\d]/g, "");
      return phone ? `tel:${phone}` : "";
    }
    if (method.type === "email") return /^\S+@\S+\.\S+$/.test(trimmed) ? `mailto:${trimmed}` : "";
    if (method.type === "whatsapp") {
      const phone = trimmed.replace(/\D/g, "");
      return phone ? `https://wa.me/${phone}` : "";
    }
    return externalUrl(trimmed);
  };

  const renderFooterContacts = () => {
    if (!contactList) return;
    const fragment = document.createDocumentFragment();
    contactMethods.forEach((method) => {
      const value = CONTACT_DETAILS[method.key];
      const href = contactHref(method, value);
      if (!href) return;
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.className = "contact-link";
      link.href = href;
      link.textContent = method.type === "phone" || method.type === "email"
        ? `${method.label}: ${value}`
        : method.type === "whatsapp" ? "WhatsApp: Direct message ↗" : `${method.label} ↗`;
      if (method.type === "external" || method.type === "whatsapp") {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      item.append(link);
      fragment.append(item);
    });
    contactList.replaceChildren(fragment);
  };
  renderFooterContacts();

  const header = $(".site-header");
  const menuToggle = $(".menu-toggle");
  const navigation = $(".site-nav");

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  $$(".site-nav a").forEach((link) => link.addEventListener("click", closeMenu));
  $$("[data-scroll-top]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  });
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || menuToggle.getAttribute("aria-expanded") !== "true") return;
    closeMenu();
    menuToggle.focus();
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 22);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const reveals = $$(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5%" }
    );
    reveals.forEach((element) => revealObserver.observe(element));
  }

  const navLinks = $$(".site-nav a:not(.nav-contact)");
  const navSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${visible.target.id}`;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      },
      { threshold: 0.28, rootMargin: "-28% 0px -55%" }
    );
    navSections.forEach((section) => navObserver.observe(section));
  }

  const thinkingSteps = [
    { name: "Understand", caption: "Find the real question before making a move.", color: "#d8ff36" },
    { name: "Explore", caption: "Open up useful directions before narrowing the route.", color: "#ffbc30" },
    { name: "Design", caption: "Give an idea a structure people can navigate.", color: "#ff4c84" },
    { name: "Build", caption: "Turn intent into a working, resilient experience.", color: "#f3f0e9" },
    { name: "Refine", caption: "Test the edges, then make the details earn their place.", color: "#9cf0ff" },
  ];
  const orbitButton = $(".thinking-orbit");
  const orbitCenter = $(".orbit-center");
  const orbitIndex = $(".orbit-index");
  const heroStep = $("#hero-step");
  const stepCount = $("#hero-step-count");
  const heroCaption = $("#hero-caption");
  let currentStep = 0;

  const renderThinkingStep = () => {
    const step = thinkingSteps[currentStep];
    const number = String(currentStep + 1).padStart(2, "0");
    orbitIndex.textContent = number;
    heroStep.textContent = step.name;
    stepCount.textContent = `${number} / 05`;
    heroCaption.textContent = step.caption;
    orbitCenter.style.backgroundColor = step.color;
    orbitButton.style.setProperty("--step", currentStep);
    orbitButton.setAttribute("aria-label", `${step.name}. Advance to the next thinking stage`);
    $$(".orbit-marker").forEach((marker, index) => {
      marker.style.transform = index === 0
        ? `translateX(-50%) rotate(${currentStep * 72}deg) translateY(-${currentStep * 1.1}px)`
        : `rotate(${currentStep * -72}deg) translateY(${currentStep * 1.8}px)`;
    });
  };
  orbitButton.addEventListener("click", () => {
    currentStep = (currentStep + 1) % thinkingSteps.length;
    renderThinkingStep();
  });

  const playgroundTabs = $$('[data-playground]');
  const playgroundPanels = $$(".play-panel");
  playgroundTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.dataset.playground;
      playgroundTabs.forEach((candidate) => {
        candidate.setAttribute("aria-selected", String(candidate === tab));
        candidate.tabIndex = candidate === tab ? 0 : -1;
      });
      playgroundPanels.forEach((panel) => {
        const active = panel.id === `panel-${selected}`;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    });
    tab.addEventListener("keydown", (event) => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const position = playgroundTabs.indexOf(tab);
      let next = position;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (position + 1) % playgroundTabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (position - 1 + playgroundTabs.length) % playgroundTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = playgroundTabs.length - 1;
      playgroundTabs[next].focus();
      playgroundTabs[next].click();
    });
  });

  const cardContent = {
    product: {
      number: "01 / UI / UX + CODE",
      title: "Digital product systems",
      summary: "A joined-up view of the product: the problem, the people using it, the interface that guides them, and the front-end that makes it real.",
      tags: ["Product thinking", "UI / UX", "Front-end", "Interaction design"],
    },
    spatial: {
      number: "02 / 3D + CAD",
      title: "Spatial thinking",
      summary: "Working in volume helps turn abstract constraints into something that can be inspected from more than one angle.",
      tags: ["3D modelling", "CAD", "SolidWorks", "AutoCAD"],
    },
    visual: {
      number: "03 / GRAPHIC DIRECTION",
      title: "Visual communication",
      summary: "A visual system should create recognition without getting in the way — giving ideas enough contrast, rhythm, and clarity to be remembered.",
      tags: ["Art direction", "Typography", "Graphic design", "Visual systems"],
    },
    lab: {
      number: "04 / EXPERIMENTS",
      title: "Creative experiments",
      summary: "A deliberate space for testing materials, interactions, and combinations that do not fit neatly into one discipline yet.",
      tags: ["Exploration", "Prototyping", "Creative code", "Problem-solving"],
    },
  };
  const dialog = $(".practice-dialog");
  const dialogTitle = $("#dialog-title");
  const dialogNumber = $("#dialog-number");
  const dialogSummary = $("#dialog-summary");
  const dialogList = $("#dialog-list");
  const closeDialog = $(".dialog-close", dialog);
  let opener = null;

  const openCard = (card) => {
    const content = cardContent[card.dataset.card];
    if (!content) return;
    opener = card;
    dialogNumber.textContent = content.number;
    dialogTitle.textContent = content.title;
    dialogSummary.textContent = content.summary;
    dialogList.replaceChildren(...content.tags.map((tag) => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag;
      return tagElement;
    }));
    document.body.style.overflow = "hidden";
    if (typeof dialog.showModal === "function") dialog.showModal();
    else {
      dialog.setAttribute("open", "");
      closeDialog.focus();
    }
  };
  $$("[data-card]").forEach((card) => {
    card.addEventListener("click", () => openCard(card));
  });
  const closePracticeDialog = () => {
    document.body.style.overflow = "";
    if (typeof dialog.close === "function") dialog.close();
    else {
      dialog.removeAttribute("open");
      opener?.focus();
    }
  };
  closeDialog.addEventListener("click", closePracticeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closePracticeDialog();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    opener?.focus();
  });

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    $$('[data-tilt]').forEach((element) => {
      element.addEventListener("pointermove", (event) => {
        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        element.style.transform = `perspective(1000px) rotateX(${y * -1.4}deg) rotateY(${x * 1.4}deg)`;
      });
      element.addEventListener("pointerleave", () => { element.style.transform = ""; });
    });
  }

  // =========================================================================
  // Showcase 3D Curved Scroll & Interactive Gallery Controller
  // =========================================================================
  const SHOWCASE_DOSSIER = Object.freeze({
    novaos: {
      number: "01 / SHOWCASE DOSSIER",
      title: "NovaOS Kinetic Design System & Cloud Studio",
      category: "UI & DESIGN SYSTEM",
      lead: "A multi-tenant token compiler and component ecosystem engineered to maintain brand cohesion and fluid responsiveness across 14 distributed cloud engineering teams.",
      eng: "Designed an AST-based token extraction pipeline that ingests Figma Variable API JSON schemas and transpiles them into strongly-typed TypeScript constants, Tailwind plugins, and CSS custom properties in 12ms. Eliminated manual token drift and achieved tree-shaken sub-10KB gzip core bundle.",
      des: "Built a fluid typography and spacing scale system with dynamic modular constraints. Implemented strict WCAG AAA color contrast ratios across dark and light palettes with high-visibility kinetic focus rings and seamless touch gestures.",
      m1Label: "Propagation",
      m1Val: "12ms",
      m2Label: "Accessibility",
      m2Val: "WCAG AAA",
      tags: ["React", "TypeScript", "Design Tokens", "Figma API", "Tailwind CSS", "Web Components", "Vite"],
    },
    aura: {
      number: "02 / SHOWCASE DOSSIER",
      title: "Aura Spatial Audio Synthesizer",
      category: "CREATIVE AUDIO INTERFACE",
      lead: "A browser-native additive and subtractive polyphonic synthesizer engineered for real-time DSP, frequency visualization, and tactile sound design.",
      eng: "Utilized dedicated AudioWorklet threads for zero-glitch DSP computations, decoupling heavy audio rendering from the main DOM thread. Combined Web Audio API biquad filter cascades with WebGL-accelerated FFT frequency spectrum visualizers.",
      des: "Crafted tactile rotary dials with sub-pixel mouse drag resolution, animated phosphorescent equalizer bars inspired by analog hardware oscilloscopes, and responsive audio wave ripples.",
      m1Label: "Jitter Buffer",
      m1Val: "0.2ms",
      m2Label: "Sample Rate",
      m2Val: "96 kHz",
      tags: ["Web Audio API", "AudioWorklet", "Canvas 2D", "WebGL", "DSP", "Wasm", "TypeScript"],
    },
    hyperform: {
      number: "03 / SHOWCASE DOSSIER",
      title: "HyperForm Parametric 3D CAD Visualizer",
      category: "3D & MECHANICAL CAD",
      lead: "A high-performance geometry pipeline bridging SolidWorks/AutoCAD mechanical assemblies to interactive, web-accessible 3D inspection models.",
      eng: "Engineered automated Python topology decimation routines that preserve critical manufacturing datum surfaces and tolerances while reducing mesh size by 94%. Implemented custom Three.js raycasting for coordinate dimensioning.",
      des: "Created an industrial blueprint aesthetic with vector crosshairs, XYZ gimbal orientation indicators, real-time wireframe vs solid shading toggles, and precision ISO camera perspectives.",
      m1Label: "Mesh Reduction",
      m1Val: "94%",
      m2Label: "Polygon Count",
      m2Val: "48.2k polys",
      tags: ["SolidWorks", "AutoCAD", "Three.js", "WebGL", "Python", "GLTF", "Parametric CAD"],
    },
    typosignal: {
      number: "04 / SHOWCASE DOSSIER",
      title: "TypoSignal Kinetic Brand Identity",
      category: "VISUAL & BRAND DIRECTION",
      lead: "An unapologetic editorial identity merging the rigor of Swiss International Typographic Style with dynamic web variable font technology.",
      eng: "Integrated CSS Font Variation Settings and requestAnimationFrame transforms to enable fluid typographic width, optical sizing, and tracking modulation linked directly to user interaction and scroll momentum.",
      des: "Developed high-contrast stark palettes (vermillion #FF3C14, deep ink #121214, warm newsprint), 12-column asymmetric grids, registration crosshairs, and kinetic diagonal hazard bands.",
      m1Label: "Grid Layout",
      m1Val: "12-Col Swiss",
      m2Label: "Variable Axis",
      m2Val: "Weight & Tracking",
      tags: ["Art Direction", "Variable Fonts", "Brand Identity", "Editorial Grid", "Swiss Style", "Motion Graphics"],
    },
    veloce: {
      number: "05 / SHOWCASE DOSSIER",
      title: "Veloce High-Throughput Event Streaming Pipeline",
      category: "SYSTEMS ARCHITECTURE",
      lead: "A resilient distributed event streaming architecture engineered to ingest, serialize, and route millions of messages per second with microsecond tail latency.",
      eng: "Architected an asynchronous pipeline utilizing Go ingest brokers, Kafka partitioned clusters, Redis memory rings, and Node.js stream transformers with backpressure flow control to protect downstream consumers.",
      des: "Constructed a live systems telemetry dashboard visualizing cluster node heartbeats, packet transmission vectors, real-time throughput sparklines, and automated partition failover alerts.",
      m1Label: "Throughput",
      m1Val: "1.42M ops/s",
      m2Label: "Tail Latency (p99)",
      m2Val: "1.8ms",
      tags: ["Node.js", "Go", "Kafka", "Redis", "Distributed Systems", "WebSockets", "Docker"],
    },
    chronos: {
      number: "06 / SHOWCASE DOSSIER",
      title: "Chronos Kinetic Shader Playground",
      category: "CREATIVE CODE & EXPERIMENTS",
      lead: "A laboratory exploring non-Euclidean fluid motion, raymarched mathematical topologies, and tactile physics micro-interactions.",
      eng: "Implemented GLSL fragment shaders calculating raymarching signed distance functions (SDF) and multi-octave simplex noise for real-time volumetric fluid refraction running smoothly at 60 FPS.",
      des: "Built an intuitive tactile interface allowing visitors to interactively warp viscosity, toggle chromatic dispersion, and explore how digital surfaces can behave with organic physical elasticity.",
      m1Label: "Frame Budget",
      m1Val: "16.6ms (60 FPS)",
      m2Label: "Noise Octaves",
      m2Val: "6-Octave Simplex",
      tags: ["Creative Coding", "GLSL Shaders", "Raymarching", "Canvas API", "Math Topologies", "WebGL"],
    },
  });

  const initShowcase = () => {
    const track = $("#showcase-track");
    if (!track) return;

    const cards = $$(".sc-card", track);
    const scene = $("#showcase-scene");
    const hudIdx = $("#showcase-current-idx");
    const hudCat = $("#showcase-current-cat");
    const hudFill = $("#showcase-progress-fill");
    const prevBtn = $("#showcase-prev");
    const nextBtn = $("#showcase-next");
    const filterPills = $$(".filter-pill");
    const pathActive = $("#showcase-path-active");

    const scDialog = $("#showcase-dialog");
    const scDialogClose = $(".sc-dialog-close", scDialog);
    const scDialogDismiss = $(".sc-dialog-dismiss", scDialog);
    const scNum = $("#sc-dialog-num");
    const scCat = $("#sc-dialog-cat");
    const scTitle = $("#sc-dialog-title");
    const scLead = $("#sc-dialog-lead");
    const scEng = $("#sc-dialog-eng");
    const scDes = $("#sc-dialog-des");
    const scM1Label = $("#sc-dialog-m1-label");
    const scM1Val = $("#sc-dialog-m1-val");
    const scM2Label = $("#sc-dialog-m2-label");
    const scM2Val = $("#sc-dialog-m2-val");
    const scTags = $("#sc-dialog-tags");

    let currentProgress = 0;
    let targetProgress = 0;
    let activeIndex = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartProgress = 0;
    let lastDragTime = 0;
    let dragVelocity = 0;

    const cardCount = cards.length;

    const updateCards = (p) => {
      const continuousIndex = p * (cardCount - 1);

      cards.forEach((card, index) => {
        const offset = index - continuousIndex;
        const absOffset = Math.abs(offset);

        if (reducedMotion) {
          card.style.transform = "";
          card.style.opacity = "";
          card.style.filter = "";
          card.style.zIndex = "";
          card.classList.toggle("is-active", Math.round(continuousIndex) === index);
          return;
        }

        // Parabolic 3D curved trajectory calculations
        const x = offset * (window.innerWidth < 768 ? 320 : 440);
        const z = -absOffset * 220;
        const y = Math.pow(offset, 2) * 22;
        const rotY = Math.max(-55, Math.min(55, offset * -26));
        const rotZ = Math.max(-10, Math.min(10, offset * 3));
        const scale = Math.max(0.68, 1 - absOffset * 0.13);
        const opacity = Math.max(0.04, 1 - absOffset * 0.36);
        const blur = Math.min(5, absOffset * 2.2);
        const zIndex = 30 - Math.min(25, Math.round(absOffset * 5));

        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : "none";
        card.style.zIndex = zIndex;

        const isActive = absOffset < 0.5;
        card.classList.toggle("is-active", isActive);
        card.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      const newActiveIndex = Math.max(0, Math.min(cardCount - 1, Math.round(continuousIndex)));
      if (newActiveIndex !== activeIndex) {
        activeIndex = newActiveIndex;
        const activeCard = cards[activeIndex];
        const category = activeCard?.querySelector(".sc-category")?.textContent || "SHOWCASE";
        if (hudIdx) hudIdx.textContent = `${String(activeIndex + 1).padStart(2, "0")} / 06`;
        if (hudCat) hudCat.textContent = category;
      }

      // Update HUD progress bar fill width (16.6% to 100%)
      if (hudFill) {
        const progressPercent = 16.66 + p * 83.34;
        hudFill.style.width = `${progressPercent.toFixed(1)}%`;
      }

      // Update SVG path dash array / stroke offset
      if (pathActive) {
        const totalLength = 1100;
        const activePortion = (activeIndex / (cardCount - 1)) * totalLength;
        pathActive.style.strokeDasharray = `${Math.max(40, activePortion)} 1100`;
      }
    };

    // Smooth animation loop using lerp
    const loop = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0005) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
      }
      updateCards(currentProgress);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Scroll listener to update progress when within track
    const handleScroll = () => {
      if (reducedMotion || isDragging) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const rawProgress = -rect.top / scrollable;
      targetProgress = Math.max(0, Math.min(1, rawProgress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Scroll to specific card index smoothly
    const scrollToIndex = (index) => {
      const clamped = Math.max(0, Math.min(cardCount - 1, index));
      const rect = track.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        targetProgress = clamped / (cardCount - 1);
        return;
      }
      const targetScrollY = trackTop + (clamped / (cardCount - 1)) * scrollable;
      window.scrollTo({
        top: targetScrollY,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    };

    prevBtn?.addEventListener("click", () => scrollToIndex(activeIndex - 1));
    nextBtn?.addEventListener("click", () => scrollToIndex(activeIndex + 1));

    // Keyboard navigation
    scene?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollToIndex(activeIndex + 1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const activeCard = cards[activeIndex];
        if (activeCard) openShowcaseDialog(activeCard.dataset.project);
      }
    });

    // Pointer Drag / Swipe on Scene
    const onPointerDown = (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartProgress = targetProgress;
      dragVelocity = 0;
      lastDragTime = performance.now();
      scene.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = now - lastDragTime || 16;
      const dx = e.clientX - dragStartX;
      const progressDelta = -dx / (window.innerWidth * 0.85);

      dragVelocity = (progressDelta / dt) * 16;
      lastDragTime = now;
      targetProgress = Math.max(0, Math.min(1, dragStartProgress + progressDelta));
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      scene.releasePointerCapture?.(e.pointerId);

      // Snap to nearest card factoring in release flick velocity
      const projected = targetProgress + dragVelocity * 2.5;
      const nearest = Math.round(projected * (cardCount - 1));
      scrollToIndex(nearest);
    };

    scene?.addEventListener("pointerdown", onPointerDown);
    scene?.addEventListener("pointermove", onPointerMove);
    scene?.addEventListener("pointerup", onPointerUp);
    scene?.addEventListener("pointercancel", onPointerUp);

    // Direct card click
    cards.forEach((card, i) => {
      card.addEventListener("click", (e) => {
        // If clicking inside inspect button or interactive widget, handled separately
        if (e.target.closest(".sc-btn-inspect") || e.target.closest("button") || e.target.closest("input")) {
          return;
        }
        if (Math.abs(i - Math.round(currentProgress * (cardCount - 1))) < 0.5) {
          openShowcaseDialog(card.dataset.project);
        } else {
          scrollToIndex(i);
        }
      });
    });

    // Filter pills
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");

        const filter = pill.dataset.filter;
        if (filter === "all") {
          scrollToIndex(0);
          return;
        }

        const matchIdx = cards.findIndex((c) => c.dataset.category === filter);
        if (matchIdx !== -1) {
          scrollToIndex(matchIdx);
        }
      });
    });

    // Live Micro-Interactions inside cards
    // 1. NovaOS Theme Palette Swatches
    $$(".palette-chips .chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentCard = chip.closest(".sc-card");
        if (!parentCard) return;
        $$(".palette-chips .chip", parentCard).forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");

        const theme = chip.dataset.themeColor;
        if (theme === "acid") {
          parentCard.style.borderColor = "var(--acid)";
          parentCard.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(216, 255, 54, 0.28)";
        } else if (theme === "pink") {
          parentCard.style.borderColor = "var(--hot-pink)";
          parentCard.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(255, 76, 132, 0.28)";
        } else if (theme === "blue") {
          parentCard.style.borderColor = "var(--electric-blue)";
          parentCard.style.boxShadow = "0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(36, 85, 255, 0.28)";
        }
      });
    });

    // 2. Aura Pulse Audio Test
    const pulseTrigger = $("#aura-pulse-trigger");
    pulseTrigger?.addEventListener("click", (e) => {
      e.stopPropagation();
      $$(".spec-bar").forEach((bar, idx) => {
        bar.style.animation = "none";
        void bar.offsetHeight; // force reflow
        bar.style.animation = `spec-pulse ${0.4 + (idx % 4) * 0.2}s ease-in-out infinite alternate`;
      });
      pulseTrigger.textContent = "✓ PULSING FREQ";
      setTimeout(() => {
        pulseTrigger.textContent = "▶ PULSE WAVE";
      }, 1500);
    });

    // 3. HyperForm Wireframe / Solid Mode Toggle
    const cadModeBtn = $("#cad-mode-toggle");
    const cadMesh = $("#cad-mesh-preview");
    cadModeBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      cadMesh?.classList.toggle("is-solid");
      cadModeBtn.textContent = cadMesh?.classList.contains("is-solid") ? "SOLID MODE ON" : "WIREFRAME MODE";
    });

    // 4. TypoSignal Tracking Slider
    const trackingSlider = $("#typo-tracking-slider");
    const posterHeadline = $("#poster-headline");
    trackingSlider?.addEventListener("input", (e) => {
      e.stopPropagation();
      if (posterHeadline) {
        posterHeadline.style.letterSpacing = `${e.target.value * 2}px`;
      }
    });

    // 5. Veloce Burst Simulator
    const burstBtn = $("#veloce-burst-btn");
    const veloceTicker = $("#veloce-ticker");
    burstBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      $$(".packet-dot").forEach((dot) => {
        dot.style.animationDuration = "0.5s";
      });
      if (veloceTicker) {
        veloceTicker.textContent = "4,892,100 evt/s (BURST)";
        veloceTicker.style.color = "var(--acid)";
      }
      burstBtn.textContent = "BURSTING ↗";
      setTimeout(() => {
        $$(".packet-dot").forEach((dot) => {
          dot.style.animationDuration = "1.5s";
        });
        if (veloceTicker) {
          veloceTicker.textContent = "1,420,890 evt/s";
          veloceTicker.style.color = "#00ff9d";
        }
        burstBtn.textContent = "SIMULATE BURST ↗";
      }, 2000);
    });

    // 6. Chronos Fluid Mode Selector
    $$(".orb-mode-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        $$(".orb-mode-btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const orb = $("#fluid-orb");
        const mode = btn.dataset.orbMode;
        if (!orb) return;

        if (mode === "warp") {
          orb.style.filter = "blur(8px)";
          orb.style.animation = "orb-undulate 8s ease-in-out infinite alternate";
        } else if (mode === "prism") {
          orb.style.filter = "blur(3px) contrast(180%)";
          orb.style.animation = "orb-undulate 4s ease-in-out infinite alternate";
        } else if (mode === "vortex") {
          orb.style.filter = "blur(12px) hue-rotate(90deg)";
          orb.style.animation = "orb-undulate 3s cubic-bezier(.2,.8,.2,1) infinite alternate";
        }
      });
    });

    // Showcase Project Dossier Dialog
    const openShowcaseDialog = (projectId) => {
      const data = SHOWCASE_DOSSIER[projectId];
      if (!data || !scDialog) return;

      if (scNum) scNum.textContent = data.number;
      if (scCat) scCat.textContent = data.category;
      if (scTitle) scTitle.textContent = data.title;
      if (scLead) scLead.textContent = data.lead;
      if (scEng) scEng.textContent = data.eng;
      if (scDes) scDes.textContent = data.des;
      if (scM1Label) scM1Label.textContent = data.m1Label;
      if (scM1Val) scM1Val.textContent = data.m1Val;
      if (scM2Label) scM2Label.textContent = data.m2Label;
      if (scM2Val) scM2Val.textContent = data.m2Val;

      if (scTags) {
        scTags.replaceChildren(
          ...data.tags.map((t) => {
            const s = document.createElement("span");
            s.textContent = t;
            return s;
          })
        );
      }

      document.body.style.overflow = "hidden";
      if (typeof scDialog.showModal === "function") {
        scDialog.showModal();
      } else {
        scDialog.setAttribute("open", "");
      }
      scDialogClose?.focus();
    };

    const closeShowcaseDialog = () => {
      document.body.style.overflow = "";
      if (typeof scDialog.close === "function") {
        scDialog.close();
      } else {
        scDialog.removeAttribute("open");
      }
      cards[activeIndex]?.focus();
    };

    $$("[data-inspect]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        openShowcaseDialog(btn.dataset.inspect);
      });
    });

    scDialogClose?.addEventListener("click", closeShowcaseDialog);
    scDialogDismiss?.addEventListener("click", closeShowcaseDialog);
    scDialog?.addEventListener("click", (e) => {
      if (e.target === scDialog) closeShowcaseDialog();
    });
    scDialog?.addEventListener("close", () => {
      document.body.style.overflow = "";
    });
  };

  initShowcase();

  // =========================================================================
  // Full-Screen Animated Splash Screen (Clean 3.0s Experience)
  // =========================================================================
  const initSplash = () => {
    const splash = $("#splash-screen");
    if (!splash) return;

    const brandLink = $(".brand-name");

    // Lock page scroll while splash screen is displaying
    document.body.style.overflow = "hidden";

    // Runs for exactly 3.0 seconds as requested
    const DURATION_MS = 3000;
    let isFinished = false;

    const finishSplash = () => {
      if (isFinished) return;
      isFinished = true;

      splash.classList.add("is-leaving");
      document.body.style.overflow = "";

      setTimeout(() => {
        splash.style.display = "none";
        splash.setAttribute("aria-hidden", "true");
        splash.setAttribute("inert", "");
        brandLink?.focus();
      }, 680);
    };

    // Auto-advance after 3.0 seconds
    const timerId = setTimeout(finishSplash, DURATION_MS);

    // Click anywhere on splash screen or press Escape to skip immediately
    splash.addEventListener("click", () => {
      clearTimeout(timerId);
      finishSplash();
    });

    window.addEventListener("keydown", (e) => {
      if ((e.key === "Escape" || e.key === " ") && !isFinished) {
        clearTimeout(timerId);
        finishSplash();
      }
    });
  };

  initSplash();
})();
