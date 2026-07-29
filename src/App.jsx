import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { portfolio } from "./portfolio-data";
import {
  ArrowIcon,
  CheckIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
  ShieldIcon,
  SparkIcon,
} from "./icons";

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, body, align = "left" }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p className="section-heading__body">{body}</p>}
    </Reveal>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-nav">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>
          <span>AS</span>
          <strong>Amirali D Shiraz</strong>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon open={open} />
        </button>
        <div className={`nav-links ${open ? "is-open" : ""}`} id="nav-links">
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={portfolio.resume} target="_blank" rel="noreferrer">
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}

function PipelineVisual() {
  const reduceMotion = useReducedMotion();
  const nodes = [
    { x: 72, y: 88, label: "API" },
    { x: 72, y: 178, label: "JSON" },
    { x: 72, y: 268, label: "SQL" },
    { x: 270, y: 178, label: "Spark" },
    { x: 468, y: 118, label: "Delta" },
    { x: 468, y: 238, label: "Model" },
    { x: 666, y: 178, label: "Insight" },
  ];
  const paths = [
    "M108 88 C180 88 190 148 234 166",
    "M108 178 H232",
    "M108 268 C180 268 190 208 234 190",
    "M308 166 C358 132 392 120 430 118",
    "M308 190 C358 224 392 238 430 238",
    "M506 118 C574 118 588 160 628 172",
    "M506 238 C574 238 588 196 628 184",
  ];

  return (
    <div className="pipeline-visual" aria-label="Animated data pipeline from raw sources to analytics">
      <div className="pipeline-grid" aria-hidden="true" />
      <svg viewBox="0 0 740 356" role="img">
        <title>Data sources flowing through Spark and governed models into insights</title>
        <defs>
          <linearGradient id="flow-line" x1="0" x2="1">
            <stop offset="0" stopColor="#63e6be" stopOpacity=".25" />
            <stop offset=".55" stopColor="#63e6be" />
            <stop offset="1" stopColor="#75caff" />
          </linearGradient>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            className="pipeline-path"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.35 + index * 0.08, ease }}
          />
        ))}
        {!reduceMotion &&
          [
            [108, 88, 234, 166],
            [108, 268, 234, 190],
            [308, 166, 430, 118],
            [506, 238, 628, 184],
          ].map(([x1, y1, x2, y2], index) => (
            <motion.circle
              key={`${x1}-${y1}`}
              r="4"
              fill={index % 2 ? "#75caff" : "#63e6be"}
              filter="url(#node-glow)"
              animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.4,
                delay: 1 + index * 0.45,
                repeat: Infinity,
                repeatDelay: 1.1,
                ease: "easeInOut",
              }}
            />
          ))}
        {nodes.map((node, index) => (
          <motion.g
            key={node.label}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.5 + index * 0.09, ease }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            <rect
              x={node.x - 36}
              y={node.y - 23}
              width="72"
              height="46"
              rx="12"
              className={index === nodes.length - 1 ? "pipeline-node pipeline-node--final" : "pipeline-node"}
            />
            <text x={node.x} y={node.y + 5} textAnchor="middle">
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <div className="pipeline-status">
        <span><i /> Pipeline healthy</span>
        <code>schema checks passed</code>
      </div>
    </div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-shell">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "show"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          {[
            <div className="hero-identity" key="identity">
              Amirali D Shiraz <span>·</span> Toronto, Canada
            </div>,
            <p className="hero-kicker" key="kicker">Data Engineer</p>,
            <h1 key="title">
              I turn complex data into <span>reliable systems.</span>
            </h1>,
            <p className="hero-intro" key="intro">
              I design production data pipelines, governed models, and ML-ready platforms with
              Python, SQL, PySpark, Databricks, and AWS.
            </p>,
            <div className="hero-actions" key="actions">
              <a className="button button--primary" href="#projects">
                View projects <ArrowIcon />
              </a>
              <a className="button button--secondary" href={portfolio.resume} target="_blank" rel="noreferrer">
                Download résumé
              </a>
            </div>,
          ].map((item) => (
            <motion.div
              key={item.key}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
        >
          <PipelineVisual />
        </motion.div>
      </div>
      <div className="hero-proof" aria-label="Selected professional outcomes">
        {portfolio.metrics.map((metric, index) => (
          <Reveal key={metric.value} className="hero-metric" delay={index * 0.07}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function StoryVisual({ active }) {
  const stages = [
    { label: "Signals", icon: <SparkIcon /> },
    { label: "Pipelines", icon: <CodeIcon /> },
    { label: "Models", icon: <DatabaseIcon /> },
    { label: "Decisions", icon: <CloudIcon /> },
  ];

  return (
    <div className="story-visual" aria-hidden="true">
      <div className="story-orbit story-orbit--one" />
      <div className="story-orbit story-orbit--two" />
      <div className="story-core">
        <span>0{active + 1}</span>
        {stages[active].icon}
        <strong>{stages[active].label}</strong>
      </div>
      {stages.map((stage, index) => (
        <motion.div
          key={stage.label}
          className={`story-node story-node--${index + 1} ${active >= index ? "is-active" : ""}`}
          animate={{ scale: active === index ? 1.08 : 1 }}
          transition={{ duration: 0.35, ease }}
        >
          {stage.label}
        </motion.div>
      ))}
    </div>
  );
}

function ProfessionalStory() {
  const [active, setActive] = useState(0);

  return (
    <section className="story section" id="story">
      <div className="section-shell">
        <SectionHeading
          eyebrow="From signals to systems"
          title="Engineering context became data infrastructure."
        />
        <div className="story-layout">
          <div className="story-sticky">
            <StoryVisual active={active} />
          </div>
          <div className="story-steps">
            {portfolio.story.map((item, index) => (
              <motion.article
                className={`story-step ${active === index ? "is-active" : ""}`}
                key={item.title}
                onViewportEnter={() => setActive(index)}
                viewport={{ amount: 0.65 }}
              >
                <span>0{index + 1}</span>
                <p>{item.period}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram({ project }) {
  return (
    <div className="architecture" aria-label={`${project.title} architecture`}>
      {project.architecture.map((stage, index) => (
        <div className="architecture-stage" key={stage.label}>
          <motion.div
            className="architecture-node"
            initial={{ opacity: 0.45 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: index * 0.12 }}
          >
            <span>{stage.type}</span>
            <strong>{stage.label}</strong>
          </motion.div>
          {index < project.architecture.length - 1 && (
            <div className="architecture-flow" aria-hidden="true">
              <motion.i
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease }}
              />
              <ArrowIcon />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll
    ? portfolio.featuredProjects
    : portfolio.featuredProjects.slice(0, 3);

  return (
    <section className="projects section" id="projects">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured systems"
          title="Built around the flow of real data."
        />
        <div className="featured-projects">
          {visibleProjects.map((project, index) => (
            <article className="project-case" key={project.title}>
              <div className="project-case__copy">
                <div className="project-index">0{index + 1} / 04</div>
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p className="project-summary">{project.summary}</p>
                <dl className="project-result">
                  <div>
                    <dt>Result</dt>
                    <dd>{project.result}</dd>
                  </div>
                </dl>
                <details className="project-details">
                  <summary>Project details</summary>
                  <dl className="project-facts">
                    <div>
                      <dt>Challenge</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>Built with</dt>
                      <dd>{project.focus}</dd>
                    </div>
                  </dl>
                  <div className="tag-list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </details>
                <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
                  View on GitHub <ArrowIcon />
                </a>
              </div>
              <Reveal className="project-case__visual">
                <div className="project-visual__header">
                  <span><i /> Architecture</span>
                  <code>{project.status}</code>
                </div>
                <ArchitectureDiagram project={project} />
                <div className="quality-strip">
                  <ShieldIcon />
                  <div>
                    <strong>{project.quality.title}</strong>
                    <span>{project.quality.body}</span>
                  </div>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
        <button
          className="project-toggle"
          type="button"
          aria-expanded={showAll}
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? "Show fewer projects" : "Show all 4 projects"}
        </button>

        <Reveal className="project-archive">
          <div className="archive-heading">
            <p className="eyebrow">Project archive</p>
            <h3>More experiments, models, and systems</h3>
          </div>
          <div className="archive-list">
            {portfolio.archiveProjects.map((project) =>
              project.href ? (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="archive-row"
                >
                  <span>{project.year}</span>
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                  <ArrowIcon />
                </a>
              ) : (
                <div className="archive-row archive-row--static" key={project.title}>
                  <span>{project.year}</span>
                  <strong>{project.title}</strong>
                  <small>{project.category}</small>
                  <span aria-hidden="true">·</span>
                </div>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SkillEcosystem() {
  const [active, setActive] = useState(0);
  const category = portfolio.skills[active];

  return (
    <section className="skills section" id="skills">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Technical ecosystem"
          title="The tools I use to move data."
        />
        <div className="skills-layout">
          <div className="skill-tabs" role="tablist" aria-label="Technical skill categories">
            {portfolio.skills.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="skill-panel"
                id={`skill-tab-${index}`}
                key={item.title}
                onClick={() => setActive(index)}
              >
                <span>0{index + 1}</span>
                {item.title}
              </button>
            ))}
          </div>
          <motion.div
            className="skill-panel"
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            key={category.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="skill-panel__top">
              <div>
                <p className="eyebrow">{category.kicker}</p>
                <h3>{category.title}</h3>
              </div>
              <DatabaseIcon />
            </div>
            <div className="skill-cloud">
              {category.items.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.035 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
            <div className="skill-flow" aria-hidden="true">
              <span>Source</span><i /><span>Transform</span><i /><span>Serve</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Professional experience"
          title="Work measured by outcomes."
        />
        <div className="experience-list">
          {portfolio.experience.map((role, index) => (
            <Reveal as="article" className="role" key={role.company}>
              <div className="role-identity">
                <img src={role.logo} alt="" loading="lazy" />
                <div>
                  <span>{role.period}</span>
                  <h3>{role.company}</h3>
                  <p>{role.role} · {role.location}</p>
                </div>
              </div>
              <div className="role-detail">
                <ul>
                  {role.highlights.map((highlight) => (
                    <li key={highlight}><CheckIcon /> {highlight}</li>
                  ))}
                </ul>
                <div className="tag-list">
                  {role.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <span className="role-number">0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  return (
    <section className="credentials section" id="credentials">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Foundation & credentials"
          title="Research depth, engineering fundamentals, continuous learning."
        />
        <div className="education-grid">
          {portfolio.education.map((item) => (
            <Reveal as="article" className="education-card" key={item.school}>
              <div className="credential-logo"><img src={item.logo} alt="" loading="lazy" /></div>
              <span>{item.period}</span>
              <h3>{item.school}</h3>
              <p className="degree">{item.degree}</p>
              {item.href && (
                <a className="text-link" href={item.href} target="_blank" rel="noreferrer">
                  Read thesis <ArrowIcon />
                </a>
              )}
            </Reveal>
          ))}
        </div>
        <div className="certification-grid">
          {portfolio.certifications.map((item) => (
            <Reveal as="article" className="certification-card" key={item.title}>
              <img src={item.logo} alt="" loading="lazy" />
              <div>
                <span>{item.issuer} · {item.date}</span>
                <h3>{item.title}</h3>
                <a href={item.href} target="_blank" rel="noreferrer">
                  View credential <ArrowIcon />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="award-strip" aria-label="Awards and recognition">
          {portfolio.awards.map((award, index) => (
            <Reveal className="award" key={award.title} delay={index * 0.07}>
              <span>0{index + 1}</span>
              <div><strong>{award.title}</strong></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="section-shell contact-shell">
        <Reveal>
          <p className="eyebrow">Build what comes next</p>
          <h2>Need reliable data behind an ambitious product?</h2>
          <p>
            Let’s build data systems people can trust.
          </p>
          <div className="contact-actions">
            <a className="button button--primary" href={`mailto:${portfolio.contact.email}`}>
              Start a conversation <MailIcon />
            </a>
            <a className="social-link" href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
            <a className="social-link" href={portfolio.contact.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>
        </Reveal>
        <div className="contact-card">
          <div className="contact-profile">
            <img src="/assets/images/headshot.jpg" alt="Amirali D Shiraz" />
            <div><strong>Amirali D Shiraz</strong><span>Data Engineer · Toronto</span></div>
          </div>
          <a href={`mailto:${portfolio.contact.email}`}>{portfolio.contact.email}</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-shell">
        <a className="wordmark" href="#top"><span>AS</span><strong>Amirali D Shiraz</strong></a>
        <p>Designed around data flow. Built with React and Framer Motion.</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 30, restDelta: 0.001 });

  return (
    <div className="app">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Navigation />
      <main id="main">
        <Hero />
        <ProfessionalStory />
        <Projects />
        <SkillEcosystem />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
