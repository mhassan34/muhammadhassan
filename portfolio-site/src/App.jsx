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
    href: "#project-archive",
    action: "See full breakdown",
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
    href: "#project-archive",
    action: "See full breakdown",
  },
];

const projectArchive = [
  {
    index: "01",
    title: "Invasion Multiplayer UI",
    category: "UMG / UI Engineering",
    image: `${base}assets/project-umg.png`,
    alt: "Production-ready Unreal Engine multiplayer settings interface",
    summary:
      "Designed and implemented a connected interface system for a multiplayer game, covering the complete path from server discovery to in-game HUD.",
    details: [
      "Server browser, filters, settings, key bindings, statistics, training, loadouts, player options, and HUD flows.",
      "Reusable UMG widgets, customizable controls, and navigation implemented directly in Unreal Engine 5.",
      "UI logic connected to gameplay and backend data instead of remaining a visual-only prototype.",
    ],
    role: "UI Engineering",
    tech: "UMG · C++ · Blueprints",
  },
  {
    index: "02",
    title: "DirectSplat",
    category: "Gaussian Splatting / Plugin",
    image: `${base}assets/project-splat.png`,
    alt: "Unreal Engine restaurant environment transitioning into a Gaussian Splat",
    summary:
      "An Unreal Engine plugin that analyzes a level, plans capture positions, reconstructs Gaussian Splats, produces LODs, and exports practical runtime results.",
    details: [
      "Adaptive grid, ring, boundary, and geometry-aware camera planning with invalid-view rejection.",
      "RDG compute passes, GPU readback, reconstruction, MicroTrainer processing, and resumable long-running jobs.",
      "Voxel and variance-based merging reduced outputs from hundreds of megabytes to tens while preserving useful detail.",
    ],
    role: "Lead Programmer",
    tech: "UE5 · C++ · RDG · PLY",
  },
  {
    index: "03",
    title: "Multiplayer Concert World",
    category: "Online Systems / Real-Time",
    image: `${base}assets/project-multiplayer.png`,
    alt: "Large-scale multiplayer virtual concert world",
    summary:
      "A browser-delivered UE5 concert experience combining synchronized players, high-density crowds, live interaction, and cinematic performance systems.",
    details: [
      "Replicated character widgets, animations, emojis, player interactions, chat, and voice-chat systems.",
      "Epic Online Services and Steam-compatible online flows with Pixel Streaming delivery.",
      "Metahumans, Avaturn characters, motion matching, and Nanite crowd systems built with C++ and Blueprints.",
    ],
    role: "Gameplay & Multiplayer",
    tech: "EOS · Pixel Streaming · Replication",
  },
  {
    index: "04",
    title: "AI NPC Systems",
    category: "Behavior Trees · Crowd Interaction",
    image: `${base}assets/project-ai-npcs.png`,
    alt: "Unreal Engine Behavior Tree for interactive AI NPCs",
    summary:
      "Smart NPCs that replace lightweight static crowd meshes only when interaction is needed, keeping large social spaces responsive.",
    details: [
      "NPC-to-NPC and player interaction, dialogue, dancing, random movement, and concert-event participation.",
      "Custom Behavior Tree tasks find interactable locations and coordinate movement between activity points.",
      "Designed to bridge optimized ambient crowds with higher-fidelity interactive characters during play.",
    ],
    role: "AI Gameplay",
    tech: "Behavior Trees · Blueprints · C++",
  },
  {
    index: "05",
    title: "Anim to Texture Plugin",
    category: "Nanite HISM · Editor Tools",
    image: `${base}assets/project-anim-texture.png`,
    alt: "Unreal Engine material graph for a Nanite animation-to-texture crowd plugin",
    summary:
      "An updated animation-to-texture plugin created specifically for high-quality Nanite HISM crowds and practical artist workflows.",
    details: [
      "Supports different rotations and animations per mesh while moving animation work away from the game thread.",
      "Simple editor UI for baking animated meshes, assigning data, spawning crowds, and controlling instances.",
      "Material controls make animation switching and playback-speed adjustment accessible without code changes.",
    ],
    role: "Plugin Development",
    tech: "Nanite · HISM · Vertex Animation",
  },
  {
    index: "06",
    title: "Dynamic Media Playback",
    category: "Virtual Production · Blueprints",
    image: `${base}assets/project-dynamic-media.png`,
    alt: "Blueprint graph for dynamic Unreal Engine media playback",
    summary:
      "A Blueprint-only runtime media system for changing content on screens, props, LED walls, and backdrops during virtual-production shots.",
    details: [
      "Builds the Media Player, Media Texture, and Dynamic Material Instance entirely at runtime.",
      "Loads video from a file path, binds it to scene materials, and synchronizes playback with camera or scene logic.",
      "Modular enough to duplicate across multiple screens without reimporting assets or editing each shot.",
    ],
    role: "Virtual Production Tools",
    tech: "Blueprints · Media Framework · DMI",
  },
  {
    index: "07",
    title: "Advanced Crowd Manager",
    category: "Optimization · Runtime Systems",
    image: `${base}assets/project-crowd.png`,
    alt: "Dense real-time crowd rendered with Unreal Engine Nanite instances",
    summary:
      "A GPU-oriented crowd system that renders thousands of higher-quality characters while preserving runtime control and player interaction.",
    details: [
      "Nanite HISM meshes and vertex animation reduce CPU cost while maintaining large crowd density.",
      "Runtime density, random animation, clothing, material, speed, and per-instance property controls.",
      "Selected static instances convert to skeletal characters when higher-fidelity player interaction is required.",
    ],
    role: "Crowd Systems",
    tech: "C++ · Nanite · HISM · GPU Animation",
  },
  {
    index: "08",
    title: "Lighting Sequence Tools",
    category: "Concert Systems · Creative Tooling",
    image: `${base}assets/project-lighting.png`,
    alt: "Unreal Engine concert-lighting editor and stage preview",
    summary:
      "An artist-facing system for placing concert lights, authoring repeatable lighting sequences, and previewing complex stage behavior.",
    details: [
      "Beam, point, strobe, laser, focus, rotation, random movement, and spread sequence types.",
      "World/local placement, mouse-selected focus targets, orientation, intensity, distance, and music-response controls.",
      "Save, preview, and stop controls let creators iterate on a concert setup without rebuilding gameplay logic.",
    ],
    role: "Tools & Gameplay",
    tech: "UMG · Blueprints · Sequencer",
  },
  {
    index: "09",
    title: "Motion Matching Setup",
    category: "Animation · IK Retargeting",
    image: `${base}assets/project-motion-matching.png`,
    alt: "Avaturn character rig and animation retargeting setup",
    summary:
      "A complete Avaturn character integration with custom IK retargeting, motion-matched locomotion, combat, traversal, and AI movement.",
    details: [
      "Custom IK Rig and UEFN retargeter with goals, full-body solver, rotation correction, and root adjustment.",
      "Animation states for shooting, dance, idle, walk, run, sprint, dash, super jump, and related transitions.",
      "Chooser Tables drive state selection while trace-based traversal calculates obstacles without tagged helper actors.",
    ],
    role: "Character Systems",
    tech: "Motion Matching · IK Rig · Chooser Tables",
  },
  {
    index: "10",
    title: "Unity JohnLemon",
    category: "Early Game Development Study",
    image: `${base}assets/project-unity-johnlemon.png`,
    alt: "Top-down Unity John Lemon haunted-house game scene",
    summary:
      "An earlier Unity project focused on building a complete playable scene and strengthening core game-development fundamentals.",
    details: [
      "Character-driven exploration inside a composed top-down environment.",
      "Foundational scene logic, triggers, player control, and game-state flow.",
      "Included as a concise record of the development path that preceded production Unreal Engine work.",
    ],
    role: "Gameplay Study",
    tech: "Unity · C# · Scene Logic",
  },
];

const experience = [
  {
    period: "2021 — PRESENT",
    company: "Moshpit Studio",
    role: "Game Developer",
    summary:
      "Production Unreal Engine development for browser-delivered virtual concerts, creator tools, cinematic worlds, and spatial experiences.",
    highlights: [
      "Built gameplay and interaction systems in C++ and Blueprints for large real-time environments.",
      "Delivered multiplayer and Pixel Streaming workflows for browser-accessible concerts and shared worlds.",
      "Created reusable UMG tools, editor utilities, plugins, validation flows, and creator-facing controls.",
      "Optimized Nanite crowds, assets, memory, level streaming, and runtime performance across PC and Android targets.",
      "Developed spatial capture, point-cloud, Gaussian Splat, and AI-assisted cinematic workflows.",
    ],
  },
  {
    period: "2025 — PRESENT",
    company: "Skylla Studio · Greece",
    role: "Multiplayer Developer",
    summary:
      "Multiplayer engineering for Invasion, a modern-warfare team FPS built around tactical combat and dedicated online play.",
    highlights: [
      "Worked from an Unreal Engine source build and designed dedicated-server architecture around Epic Online Services.",
      "Implemented session creation, discovery, joining, leaving, server browsing, and squad flows.",
      "Built replicated gameplay state, RPC-driven interactions, online achievements, and resilient multiplayer UI/UX.",
      "Connected player-facing UMG screens to real session and server state rather than static menu flows.",
    ],
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
  ["Gameplay architecture", "Production systems designed to stay clear across C++ and Blueprints.", ["Reusable components and subsystems", "Blueprint-callable C++ APIs", "Gameplay interaction and state flows"]],
  ["Multiplayer & online", "Authoritative real-time systems from session discovery through moment-to-moment play.", ["Replication and RPC design", "EOS sessions and dedicated servers", "Squads, achievements, chat, and voice"]],
  ["UMG & interface engineering", "Player-facing and creator-facing interfaces connected to real runtime data.", ["Server browsers and filters", "Settings, keybinds, loadouts, and HUD", "Reusable widgets and navigation"]],
  ["Tools & plugins", "Workflows that let artists and designers produce more without engineering bottlenecks.", ["C++ modules and editor utilities", "Blueprint APIs and validation", "Packaging and deployment-ready tooling"]],
  ["Rendering & spatial", "GPU and spatial pipelines for turning complex environments into useful runtime assets.", ["RDG compute and GPU readback", "Gaussian Splat capture and LOD", "Point data, PLY export, and optimization"]],
  ["Performance & delivery", "Profiling and shipping real-time experiences across browsers and constrained devices.", ["Pixel Streaming and web delivery", "Nanite HISM crowds and GPU animation", "Memory, assets, level streaming, PC and Android"]],
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
          <SectionHeading index="02" title="Selected projects" note="Three flagship systems. Ten complete breakdowns." />

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

          <div className="project-archive" id="project-archive">
            <div className="project-archive__heading">
              <span className="eyebrow">Full project breakdown</span>
              <h3>Selected work, explained on-site.</h3>
              <p>Responsibilities, systems, and technical decisions—kept here so recruiters can evaluate the work without leaving the portfolio.</p>
            </div>

            <div className="project-grid">
              {projectArchive.map((item) => (
                <article className="project-card" key={item.index}>
                  <img src={item.image} alt={item.alt} loading="lazy" />
                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span>{item.index}</span>
                      <span>{item.category}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <ul>
                      {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                    <footer>
                      <span>{item.role}</span>
                      <span>{item.tech}</span>
                    </footer>
                  </div>
                </article>
              ))}
            </div>

            <div className="behance-cta">
              <div>
                <span className="eyebrow">Original project posts</span>
                <p>Prefer the source uploads, process images, and videos?</p>
              </div>
              <a
                className="button button--outline"
                href="https://www.behance.net/muhammed-hassan"
                target="_blank"
                rel="noreferrer"
              >
                View Behance portfolio <BehanceLogo size={19} weight="bold" />
              </a>
            </div>
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
                <div className="experience-copy">
                  <p>{item.summary}</p>
                  {item.highlights ? (
                    <ul>
                      {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="expertise section" id="expertise">
          <SectionHeading index="04" title="Core expertise" note="Engine depth with a product mindset." />
          <div className="expertise-grid">
            {expertise.map(([title, description, details], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              </article>
            ))}
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
