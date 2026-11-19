import { lazy, Suspense, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const HeroScene = lazy(() => import("./HeroScene"));
import { experience, interests, projects, sideProjects, skills } from "./data";
import profile from "./assets/jasper-profile.jpg";

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useScrollStory(reducedMotion: boolean) {
  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: element, start: "top 89%", once: true } });
      });
    });
    return () => context.revert();
  }, [reducedMotion]);
}

function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }

export default function App() {
  const reducedMotion = useReducedMotion();
  const [smallScreen, setSmallScreen] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 680px)").matches);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const query = window.matchMedia("(max-width: 680px)"); const update = () => setSmallScreen(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  useScrollStory(reducedMotion);
  const closeMenu = () => setMenuOpen(false);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="nav-wrap">
      <a className="brand" href="#top" aria-label="Jasper Ng, home">© Jasper Ng</a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">
        <a href="#work" onClick={closeMenu}>Work</a><a href="#services" onClick={closeMenu}>Skills</a><a className="nav-contact" href="#contact" onClick={closeMenu}>Get in touch</a>
      </nav>
    </div></header>

    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-scene-wrap" aria-hidden="true">{reducedMotion || smallScreen ? <div className="star-fallback" /> : <Suspense fallback={<div className="star-fallback" />}><HeroScene reducedMotion={false} /></Suspense>}</div>
        <div className="hero-name-wrap"><p className="hero-index">JASPER NG JING HENG <span>·</span> AI ENGINEER</p><h1 id="hero-title">Jasper Ng</h1></div>
        <div className="hero-about"><p className="hero-about-label">[ About ]</p><p>I build practical software across applied AI, computer vision and automation. A mechanical engineering foundation keeps my work grounded in the people and systems it serves.</p></div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i /></div>
      </section>

      <section className="what-section" aria-labelledby="what-title"><div className="section-wrap what-grid" data-reveal>
        <p className="section-kicker">What I do</p><div><h2 id="what-title" className="sr-only">What I do</h2><ul className="what-list"><li>Applied AI</li><li>Computer vision</li><li>Workflow automation</li><li>Python & C++</li><li>Robotics & IoT</li><li>Engineering software</li></ul></div>
      </div></section>

      <section className="work-section section-pad" id="work" aria-labelledby="work-title"><div className="section-wrap">
        <div className="section-heading" data-reveal><div><p className="section-kicker">Selected work</p><h2 id="work-title">Software with a practical edge.</h2></div><p className="section-intro">A few examples across computer vision, workflow automation, and applied AI integration.</p></div>
        <div className="project-list">{projects.map((project) => <article className="project-card" key={project.number} data-reveal>
          <div className={`project-art art-${project.visual}`} aria-hidden="true">
            <span className="art-index">{project.number} / JN</span><span className="art-label">{project.category}</span>
            {project.visual === "vision" && <div className="vision-demo"><div className="vision-frame"><i /><i /><i /><b>OBJECT / DETECTED</b></div><span className="scan-line" /></div>}
            {project.visual === "ai" && <div className="ai-demo"><span>INPUT</span><i>→</i><b>LLM</b><i>→</i><span>USEFUL OUTPUT</span><small>DATA · CONTEXT · RESPONSE</small></div>}
            {project.visual === "imu" && <div className="imu-demo"><span>X</span><span>Y</span><span>Z</span><div className="signal">{Array.from({length: 28}, (_, i) => <i key={i} />)}</div><small>IMU / LIVE SIGNAL</small></div>}
            <span className="art-coordinate">SINGAPORE · {project.number}</span>
          </div>
          <div className="project-caption"><div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-summary">{project.details}</p><div className="tag-list">{project.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></div>{project.link && <a className="text-link" href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.label} <Arrow /></a>}</div>
        </article>)}</div>
      </div></section>

      <section className="desk-section section-pad" id="desk" aria-labelledby="desk-title"><div className="section-wrap">
        <div className="section-heading" data-reveal><div><p className="section-kicker">On the desk</p><h2 id="desk-title">How I got here.</h2></div><p className="section-intro">From mechanical engineering into software, AI and real-world systems.</p></div>
        <ol className="desk-list">{experience.slice(0, 4).map((item, index) => <li key={`${item.organization}-${item.period}`} data-reveal><span className="desk-number">0{index + 1}</span><span className="desk-period">{item.period}</span><div><h3>{item.organization}</h3><p>{item.role} <span>·</span> {item.detail}</p></div><span className={item.current ? "desk-state current" : "desk-state"}>{item.current ? "NOW" : ""}</span></li>)}</ol>
      </div></section>

      <section className="path-section section-pad" id="path" aria-labelledby="path-title"><div className="section-wrap path-layout">
        <div className="path-heading" data-reveal><p className="section-kicker">The path so far</p><h2 id="path-title">Engineering<br />meets <em>software.</em></h2><p>The practical questions behind the work: how does it feel, and does it hold up outside the demo?</p></div>
        <div className="path-content" data-reveal><div className="profile-card"><img src={profile} alt="Jasper Ng Jing Heng at his NTU graduation" /><div><strong>Jasper Ng Jing Heng</strong><span>AI Engineer · Mechanical Engineer</span></div></div><p>I’m a Mechanical Engineering graduate from Nanyang Technological University, specialising in Intelligent Manufacturing. My experience spans software development, robotics, automation, computer vision and IoT systems.</p><p>I enjoy building practical tools and working across software and physical systems—from early prototypes through deployment and support.</p><div className="education-note"><span>2023 — 2026</span><strong>Nanyang Technological University</strong><small>B.Eng. Mechanical Engineering · Intelligent Manufacturing · GPA 4.0</small></div></div>
      </div></section>

      <section className="hobby-section section-pad" aria-labelledby="hobby-title"><div className="section-wrap">
        <div className="section-heading" data-reveal><div><p className="section-kicker">Beyond work</p><h2 id="hobby-title">Things I do for fun.</h2></div><p className="section-intro">A little room for the other interests and small ventures that keep me curious.</p></div>
        <div className="hobby-grid">{interests.map((item, i) => <div className="hobby-item" data-reveal key={item}><span>0{i + 1}</span>{item}</div>)}</div>
        <div className="side-projects">{sideProjects.map(item => <a className="side-project" href={item.href} target="_blank" rel="noopener noreferrer" key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p></div><span>{item.label} <Arrow /></span></a>)}</div>
      </div></section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title"><div className="section-wrap">
        <div className="section-heading" data-reveal><div><p className="section-kicker">Skills</p><h2 id="services-title">Tools I work with.</h2></div><p className="section-intro">An engineering base, with a practical software and AI toolkit.</p></div>
        <div className="skills-grid">{skills.map((group, i) => <article className="skill-group" data-reveal key={group.title}><span>0{i + 1}</span><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
      </div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="section-wrap contact-wrap" data-reveal>
        <p className="section-kicker">Get in touch</p><h2 id="contact-title">Let’s build something useful.</h2><p className="contact-copy">For AI software, computer vision, automation and engineering opportunities, get in touch.</p>
        <a className="contact-email" href="mailto:jinghengng.sg@gmail.com">jinghengng.sg@gmail.com <Arrow /></a>
        <div className="contact-links"><a href="https://www.linkedin.com/in/ng-jing-heng-541989167" target="_blank" rel="noopener noreferrer">LinkedIn <Arrow /></a><a href="https://github.com/Meowwwww111" target="_blank" rel="noopener noreferrer">GitHub <Arrow /></a><a href="mailto:jinghengng.sg@gmail.com">Email <Arrow /></a></div>
      </div><footer className="site-footer"><div className="section-wrap"><span>© {new Date().getFullYear()} Jasper Ng Jing Heng</span><span>AI SOFTWARE · COMPUTER VISION · AUTOMATION</span><a href="#top">BACK TO TOP ↑</a></div></footer></section>
    </main>
  </>;
}
