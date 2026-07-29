import { useEffect, useMemo, useRef } from "react";
import { animate, inView, stagger, useReducedMotion } from "framer-motion";
import legacyPage from "./content.html?raw";

const revealSelector = [
  ".page-section > .container",
  ".section-title",
  ".timeline-item",
  ".timeline-era",
  ".education-card",
  ".certificate-card",
  ".award-card",
].join(", ");

function extractBodyMarkup(documentSource) {
  const body = documentSource.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  return body.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

function useNavigation(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const header = root?.querySelector(".site-header");
    const nav = root?.querySelector(".nav");
    const menuToggle = root?.querySelector(".menu-toggle");
    const menuLinks = root?.querySelectorAll("#primary-menu a") ?? [];

    if (!header || !nav || !menuToggle) return undefined;

    const setMenuOpen = (isOpen) => {
      nav.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    };
    const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen(!nav.classList.contains("is-open"));
    const handleKey = (event) => event.key === "Escape" && closeMenu();
    const handleResize = () => window.innerWidth > 760 && closeMenu();

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("resize", handleResize);
    menuToggle.addEventListener("click", toggleMenu);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", handleResize);
      menuToggle.removeEventListener("click", toggleMenu);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
    };
  }, [rootRef]);
}

function useDataNetwork(rootRef, reducedMotion) {
  useEffect(() => {
    const canvas = rootRef.current?.querySelector("#data-network");
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const compactViewport = window.matchMedia("(max-width: 760px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const pointer = { active: false, x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let points = [];
    let frameId;
    let lastFrame = 0;
    let resizeTimer;

    const seedPoints = () => {
      const compact = compactViewport.matches;
      const count = Math.max(
        compact ? 22 : 45,
        Math.min(compact ? 42 : 85, Math.floor((width * height) / (compact ? 24000 : 15000))),
      );
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (compact ? 0.58 : 0.9),
        vy: (Math.random() - 0.5) * (compact ? 0.58 : 0.9),
        radius: index % 7 === 0 ? (compact ? 2.65 : 3.2) : compact ? 1.95 : 2.25,
        alt: index % 5 === 0,
      }));
    };

    const drawConnection = (a, b, maxDistance, color) => {
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > maxDistance) return;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.strokeStyle = `${color}${(1 - distance / maxDistance) * 0.58})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const draw = () => {
      const compact = compactViewport.matches;
      context.clearRect(0, 0, width, height);
      for (let first = 0; first < points.length; first += 1) {
        for (let second = first + 1; second < points.length; second += 1) {
          drawConnection(points[first], points[second], compact ? 98 : 128, "rgba(98, 238, 211, ");
        }
      }
      if (pointer.active) {
        points.forEach((point) =>
          drawConnection(point, pointer, compact ? 118 : 160, "rgba(255, 174, 118, "),
        );
      }
      points.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fillStyle = point.alt
          ? "rgba(150, 207, 255, 0.72)"
          : "rgba(98, 238, 211, 0.78)";
        context.fill();
      });
    };

    const resizeCanvas = () => {
      const compact = compactViewport.matches;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 2);
      width = Math.floor(window.visualViewport?.width || window.innerWidth);
      height = Math.floor(window.visualViewport?.height || window.innerHeight);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      seedPoints();
      draw();
    };

    const scheduleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 120);
    };
    const update = () =>
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
        point.x = Math.max(0, Math.min(width, point.x));
        point.y = Math.max(0, Math.min(height, point.y));
      });
    const renderFrame = (timestamp = 0) => {
      if (timestamp - lastFrame >= (compactViewport.matches ? 33 : 16)) {
        lastFrame = timestamp;
        update();
        draw();
      }
      frameId = window.requestAnimationFrame(renderFrame);
    };
    const handlePointerMove = (event) => {
      if (!finePointer) return;
      Object.assign(pointer, { active: true, x: event.clientX, y: event.clientY });
    };
    const handlePointerLeave = () => {
      pointer.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", scheduleResize);
    window.visualViewport?.addEventListener("resize", scheduleResize);
    resizeCanvas();
    if (!reducedMotion) frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", scheduleResize);
      window.visualViewport?.removeEventListener("resize", scheduleResize);
    };
  }, [rootRef, reducedMotion]);
}

function useMotion(rootRef, reducedMotion) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    root.querySelectorAll(".reveal").forEach((element) => element.classList.remove("reveal"));
    if (reducedMotion) return undefined;

    const heroElements = root.querySelectorAll(
      ".splash .profile-picture, .splash .hero-eyebrow, .splash h1, .splash h2, .splash .hero-actions, .splash .socials",
    );
    animate(
      heroElements,
      { opacity: [0, 1], y: [18, 0] },
      { duration: 0.42, delay: stagger(0.07), ease: "easeOut" },
    );

    const stopWatching = inView(
      root.querySelectorAll(revealSelector),
      (element) => {
        animate(element, { y: [14, 0] }, { duration: 0.32, ease: "easeOut" });
      },
      { amount: 0.08, margin: "0px 0px -6% 0px" },
    );

    return stopWatching;
  }, [rootRef, reducedMotion]);
}

export default function App() {
  const rootRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const pageMarkup = useMemo(() => extractBodyMarkup(legacyPage), []);

  useNavigation(rootRef);
  useDataNetwork(rootRef, reducedMotion);
  useMotion(rootRef, reducedMotion);

  useEffect(() => {
    const year = rootRef.current?.querySelector("#copyright-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  return (
    <div
      ref={rootRef}
      className="homepage react-app"
      dangerouslySetInnerHTML={{ __html: pageMarkup }}
    />
  );
}
