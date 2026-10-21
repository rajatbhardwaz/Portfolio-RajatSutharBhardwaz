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
        : method.type === "whatsapp" ? "WhatsApp: Direct message ↗" : "Threads ↗";
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
  dialog.addEventListener("close", () => opener?.focus());

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
})();
