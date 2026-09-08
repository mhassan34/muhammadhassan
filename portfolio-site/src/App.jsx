import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BehanceLogo,
  DownloadSimple,
  EnvelopeSimple,
  LinkedinLogo,
  List,
  X,
} from "@phosphor-icons/react";

const base = import.meta.env.BASE_URL;

const projects = [
  {
    id: "umg",
    index: "01",
    short: "UMG",
    eyebrow: "UI / TOOLS",
    title: "Shipping-ready interfaces",
    description:
      "A complete Unreal Engine interface system spanning server browsing, settings, controls, statistics, loadouts, player actions, training flows, and the in-game HUD.",
    image: `${base}assets/project-umg.png`,
    alt: "Polished Unreal Engine graphics settings interface in a virtual festival environment",
    role: "UI Engineering",
    tech: "UMG · C++ · Blueprints",
    href: "https://www.behance.net/gallery/230966563/User-Interface-for-Multiplayer-Game",
    action: "View on Behance",
  },
  {
    id: "splat",
    index: "02",
    short: "SPLAT",
    eyebrow: "FLAGSHIP / SPATIAL",
    title: "Real spaces, rebuilt for the web",
    description:
      "DirectSplat automates environment analysis, smart camera planning, GPU capture, reconstruction, optimization, and web-ready Gaussian Splat export inside Unreal Engine.",
    image: `${base}assets/project-splat.png`,
    alt: "Industrial restaurant transitioning from a photoreal Unreal render into a Gaussian Splat reconstruction",
    role: "Lead Programmer",
    tech: "UE5 · RDG · GPU Readback",
    href: "#directsplat",
    action: "Read case study",
  },
  {
    id: "multiplayer",
    index: "03",
    short: "MULTIPLAYER",
    eyebrow: "NETWORKED / REAL-TIME",
    title: "Synchronized worlds at scale",
    description:
      "EOS sessions, dedicated-server flows, replication, RPCs, squads, achievements, and synchronized interaction built for browser-delivered Unreal experiences.",
    image: `${base}assets/project-multiplayer.png`,
    alt: "Third-person player overlooking a large multiplayer virtual festival",
    role: "Multiplayer Developer",
    tech: "EOS · Replication · RPCs",
    href: "https://www.behance.net/gallery/230962253/Multiplayer-Game",
    action: "View on Behance",
  },
];

const moreWork = [
  {
    title: "AI NPC Systems",
    category: "Behavior Trees · Crowd Interaction",
    href: "https://www.behance.net/gallery/231308897/AI-NPCs-UE5",
  },
  {
    title: "Anim to Texture Plugin",
    category: "Nanite HISM · Editor Tools",
    href: "https://www.behance.net/gallery/231408179/Plugin-Development-(Anim-To-texture)",
  },
  {
    title: "Dynamic Media Playback",
    category: "Virtual Production · Blueprints",
    href: "https://www.behance.net/gallery/231311237/Dynamic-Media-Playback-in-Camera-Shots",
  },
  {
    title: "Advanced Crowd Manager",
    category: "Optimization · Runtime Systems",
    href: "https://www.behance.net/gallery/221947345/Advanced-Crowd-Manager-System",
  },
  {
    title: "Lighting Sequence Tools",
    category: "Concert Systems · Creative Tooling",
    href: "https://www.behance.net/gallery/221783063/Advanced-Lighting-Sequences-System",
  },
  {
    title: "Motion Matching Setup",
    category: "Animation · IK Retargeting",
    href: "https://www.behance.net/gallery/231303935/Avaturn-and-Animation-setup-(Motion-matching)",
  },
];

const experience = [
  {
    period: "2021 — PRESENT",
    company: "Moshpit Studio",
    role: "Game Developer",
    summary:
      "Gameplay systems, Pixel Streaming, creator tools, AI cinematics, spatial capture, optimization, and PC/Android delivery for large Unreal experiences.",
  },
  {
    period: "2025 — PRESENT",
    company: "Skylla Studio · Greece",
    role: "Multiplayer Developer",
    summary:
      "Source-build Unreal development with EOS, dedicated servers, replicated gameplay, session flows, and multiplayer UI/UX.",
  },
  {
    period: "2019 — 2023",
    company: "Fiverr",
    role: "Level 2 Graphics & Animation Designer",
    summary:
      "Delivered 500+ creator-branding and motion-design projects for gaming and streaming communities.",
  },
];

const expertise = [
  ["Gameplay & multiplayer", "Replication, RPCs, EOS, dedicated servers, session flows, and player-facing systems."],
  ["Tools & plugins", "C++ modules, Blueprint APIs, editor tooling, UMG systems, validation, and packaging."],
  ["Rendering & spatial", "RDG compute passes, GPU readback, point data, Gaussian Splatting, and PLY export."],
  ["Real-time delivery", "Pixel Streaming, profiling, level streaming, memory, assets, and release optimization."],
];

function Mark() {
  return (
    <a className="mark" href="#intro" aria-label="Muhammad Hassan — home">
      <strong>MH</strong>
      <span>
        Muhammad Hassan
        <small>Unreal Engine Developer</small>
      </span>
    </a>
  );
}

function SectionHeading({ index, title, note }) {
  return (
    <div className="section-heading">
      <div className="section-heading__title">
        <span className="section-index">[ {index} ]</span>
        <h2>{title}</h2>
      </div>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function MainPortfolio() {
  const [activeProject, setActiveProject] = useState(1);
  const [activeSection, setActiveSection] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);
  const project = projects[activeProject];

  useEffect(() => {
    const sections = ["intro", "work", "experience", "expertise", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -64%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  const moveProject = (direction) => {
    setActiveProject((current) => (current + direction + projects.length) % projects.length);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#intro">Skip to content</a>
      <header className="site-header">
        <Mark />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <List size={22} />}
        </button>
        <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          {[
            ["intro", "Intro"],
            ["work", "Projects"],
            ["experience", "Experience"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "is-active" : ""}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="button button--accent header-cv" href={`${base}Muhammad-Hassan-CV.pdf`} download>
          Download CV <DownloadSimple size={19} weight="bold" />
        </a>
      </header>

      <main>
        <section className="hero section" id="intro">
          <div className="hero__identity">
            <span className="section-index">[ 01 ]</span>
            <h1>
              Muhammad
              <br />
              Hassan
            </h1>
            <p className="hero__role">Unreal Engine Developer</p>
            <p className="hero__summary">
              Production gameplay systems, UMG tools, multiplayer, and Gaussian Splat workflows.
            </p>
            <div className="hero__actions">
              <a className="button button--accent" href="mailto:tech34hassan@gmail.com">
                <EnvelopeSimple size={20} weight="bold" /> Email
              </a>
              <a
                className="button button--outline"
                href="https://www.linkedin.com/in/muhammed-hassan34"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinLogo size={20} weight="fill" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="hero__proof" aria-label="Recruiter proof">
            <span className="eyebrow">Recruiter proof</span>
            <strong>4+ years</strong>
            <b>C++ / Blueprints</b>
            <p>Moshpit Studio / Skylla Studio</p>
          </div>

          <div className="hero__statement" aria-hidden="true">
            <span>Real projects</span>
            <span>Real worlds</span>
            <span>Built in Unreal</span>
          </div>
        </section>

        <section className="work section" id="work">
          <SectionHeading index="02" title="Selected projects" note="Three areas. Real experience." />

          <div className="project-showcase">
            <div className="project-tabs" role="tablist" aria-label="Featured projects">
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  className={activeProject === index ? "project-tab is-active" : "project-tab"}
                  role="tab"
                  aria-selected={activeProject === index}
                  aria-controls="project-panel"
                  onClick={() => setActiveProject(index)}
                >
                  <span>{item.index}</span>
                  <strong>{item.short}</strong>
                </button>
              ))}
            </div>

            <article className="project-panel" id="project-panel" role="tabpanel" key={project.id}>
              <img src={project.image} alt={project.alt} />
              <div className="project-panel__copy">
                <span className="eyebrow">{project.eyebrow}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  className="text-link text-link--light"
                  href={project.href}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {project.action} <ArrowUpRight size={18} weight="bold" />
                </a>
              </div>
              <div className="project-panel__meta">
                <span>{project.role}</span>
                <span>{project.tech}</span>
              </div>
              <div className="project-controls">
                <span>{project.index} / 03</span>
                <button type="button" onClick={() => moveProject(-1)} aria-label="Previous project">
                  <ArrowLeft size={20} />
                </button>
                <button type="button" onClick={() => moveProject(1)} aria-label="Next project">
                  <ArrowRight size={20} />
                </button>
              </div>
            </article>
          </div>

        </section>

        <section className="experience section" id="experience">
          <SectionHeading index="03" title="Experience" note="Building for teams, creators, and players." />
          <div className="experience-list">
            {experience.map((item) => (
              <article key={item.company}>
                <span className="eyebrow">{item.period}</span>
                <div>
                  <h3>{item.company}</h3>
                  <p className="experience-role">{item.role}</p>
                </div>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="expertise section" id="expertise">
          <SectionHeading index="04" title="Core expertise" note="Engine depth with a product mindset." />
          <div className="expertise-grid">
            {expertise.map(([title, description], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="education-line">
            <span className="eyebrow">Education</span>
            <strong>BS Information Technology</strong>
            <span>PUCIT · 2018 — 2022</span>
          </div>
        </section>

        <section className="archive section" aria-labelledby="archive-title">
          <div className="more-work">
            <div className="more-work__intro">
              <span className="eyebrow">More work</span>
              <p id="archive-title">Focused technical studies, tools, and real-time systems.</p>
              <a
                className="text-link"
                href="https://www.behance.net/muhammed-hassan"
                target="_blank"
                rel="noreferrer"
              >
                Full Behance portfolio <BehanceLogo size={19} weight="bold" />
              </a>
            </div>
            <div className="more-work__list">
              {moreWork.map((item, index) => (
                <a key={item.title} href={item.href} target="_blank" rel="noreferrer">
                  <span>{String(index + 4).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div>
            <span className="section-index">[ 05 ]</span>
            <p className="eyebrow">Available for Unreal Engine roles</p>
            <h2>Let’s build a world<br />that works.</h2>
          </div>
          <div className="contact__actions">
            <a className="contact-link" href="mailto:tech34hassan@gmail.com">
              <span>Email</span>
              <strong>tech34hassan@gmail.com</strong>
              <ArrowUpRight size={24} />
            </a>
            <a
              className="contact-link"
              href="https://www.linkedin.com/in/muhammed-hassan34"
              target="_blank"
              rel="noreferrer"
            >
              <span>LinkedIn</span>
              <strong>muhammed-hassan34</strong>
              <ArrowUpRight size={24} />
            </a>
            <a
              className="contact-link"
              href="https://www.behance.net/muhammed-hassan"
              target="_blank"
              rel="noreferrer"
            >
              <span>Behance</span>
              <strong>muhammed-hassan</strong>
              <ArrowUpRight size={24} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Mark />
        <p>Unreal Engine systems, built to ship.</p>
        <a href="#intro">Back to top <ArrowUpRight size={16} /></a>
      </footer>
    </>
  );
}

function DirectSplatCaseStudy() {
  const pipeline = [
    ["01", "Analyze", "Read selected level geometry and define the spatial capture volume."],
    ["02", "Plan", "Generate layered, ring, boundary, and geometry-aware camera candidates."],
    ["03", "Capture", "Run GPU capture and readback with stable world-space reconstruction."],
    ["04", "Optimize", "Merge redundant splats while preserving edges and structural detail."],
    ["05", "Deliver", "Export Nerfstudio-compatible PLY data for web and runtime use."],
  ];

  return (
    <div className="case-study">
      <header className="case-header">
        <a className="mark" href="#work">
          <strong>MH</strong>
          <span>
            DirectSplat
            <small>Flagship case study</small>
          </span>
        </a>
        <a className="button button--outline" href="#work">
          <ArrowLeft size={18} /> Back to portfolio
        </a>
      </header>

      <main>
        <section className="case-hero">
          <div className="case-hero__copy">
            <span className="eyebrow">Unreal Engine → Web</span>
            <h1>Direct<br />Splat</h1>
            <p>An automated Gaussian Splatting pipeline built entirely around Unreal Engine production workflows.</p>
            <div className="case-meta">
              <span><small>Role</small>Lead Programmer</span>
              <span><small>Scope</small>End-to-end system</span>
              <span><small>Focus</small>Capture · Optimize · Export</span>
            </div>
          </div>
          <img src={`${base}assets/project-splat.png`} alt="DirectSplat render-to-point-cloud transition" />
        </section>

        <section className="case-section case-overview">
          <span className="section-index">[ 01 / Overview ]</span>
          <h2>One action replaces a fragmented spatial-capture workflow.</h2>
          <div>
            <p>DirectSplat understands an Unreal level, creates useful viewpoints, rejects invalid captures, processes dense spatial data, and produces an optimized result without a manually authored camera path.</p>
            <p>The system was designed for interiors, exteriors, layered scenes, and long-running captures that need to resume reliably after interruption.</p>
          </div>
        </section>

        <section className="case-section">
          <SectionHeading index="02 / System" title="From level to splat" note="A complete spatial pipeline." />
          <div className="pipeline-list">
            {pipeline.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section case-contribution">
          <SectionHeading index="03 / Contribution" title="Built across the Unreal stack" />
          <div className="contribution-grid">
            <article>
              <span>ENGINE</span>
              <h3>C++ plugin architecture</h3>
              <p>Blueprint-callable systems, editor integration, packaging, logging, profiling, and validation.</p>
            </article>
            <article>
              <span>RENDERING</span>
              <h3>GPU capture pipeline</h3>
              <p>RDG compute passes, GPU readback, and correct camera/world reconstruction.</p>
            </article>
            <article>
              <span>SPATIAL</span>
              <h3>Adaptive camera planning</h3>
              <p>Visibility-aware grid, ring, and geometry-informed sampling with invalid-view rejection.</p>
            </article>
            <article>
              <span>OUTPUT</span>
              <h3>Practical export</h3>
              <p>Nerfstudio-compatible PLY output with voxel and variance-based merging.</p>
            </article>
          </div>
        </section>

        <section className="case-result">
          <span className="section-index">[ 04 / Result ]</span>
          <h2>Hundreds of megabytes reduced to tens—while preserving useful detail.</h2>
          <p>A production-minded capture system built for scale, interruption, and repeatable delivery.</p>
          <a
            className="button button--accent"
            href="https://www.behance.net/gallery/254441691/Gaussian-Splat-Plugin"
            target="_blank"
            rel="noreferrer"
          >
            View project on Behance <ArrowUpRight size={19} weight="bold" />
          </a>
        </section>
      </main>
    </div>
  );
}

export function App() {
  const [isCaseStudy, setIsCaseStudy] = useState(window.location.hash === "#directsplat");

  useEffect(() => {
    const handleHash = () => {
      setIsCaseStudy(window.location.hash === "#directsplat");
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const page = useMemo(() => (isCaseStudy ? <DirectSplatCaseStudy /> : <MainPortfolio />), [isCaseStudy]);
  return page;
}
