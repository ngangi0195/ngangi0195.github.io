"use client";

import { useEffect } from "react";
import { Github as GithubIcon, Linkedin, Mail } from "lucide-react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { activities } from "@/data/activities";

function bold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p));
}

export function Hero() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-fade]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="v-root">
      {/* ── HERO ── */}
      <section className="v-hero" id="hero">
        <div className="hero-bg" aria-hidden="true">
          {/* Circuit traces — top right */}
          <svg
            style={{
              position: "absolute",
              top: 60,
              right: 0,
              width: 340,
              height: 280,
              opacity: 0.055,
            }}
            viewBox="0 0 340 280"
            fill="none"
          >
            <path
              d="M340 40 H240 V100 H160 V180 H80 V240"
              stroke="#0c0c0c"
              strokeWidth="1.5"
            />
            <path
              d="M340 100 H280 V160 H200 V220"
              stroke="#0c0c0c"
              strokeWidth="1.5"
            />
            <circle cx="240" cy="40" r="4" fill="#0c0c0c" />
            <circle cx="240" cy="100" r="4" fill="#0c0c0c" />
            <circle cx="160" cy="100" r="4" fill="#0c0c0c" />
            <circle cx="160" cy="180" r="4" fill="#0c0c0c" />
            <circle cx="80" cy="180" r="4" fill="#0c0c0c" />
            <circle cx="280" cy="100" r="4" fill="#0c0c0c" />
            <circle cx="200" cy="160" r="4" fill="#0c0c0c" />
          </svg>
          {/* Robot arm silhouette — bottom left */}
          <svg
            style={{
              position: "absolute",
              bottom: 30,
              left: 20,
              width: 180,
              height: 160,
              opacity: 0.045,
            }}
            viewBox="0 0 180 160"
            fill="none"
          >
            <rect
              x="75"
              y="130"
              width="30"
              height="20"
              rx="2"
              stroke="#0c0c0c"
              strokeWidth="2"
            />
            <rect
              x="80"
              y="100"
              width="20"
              height="35"
              rx="2"
              stroke="#0c0c0c"
              strokeWidth="2"
            />
            <line
              x1="90"
              y1="100"
              x2="60"
              y2="60"
              stroke="#0c0c0c"
              strokeWidth="2.5"
            />
            <circle cx="60" cy="60" r="8" stroke="#0c0c0c" strokeWidth="2" />
            <line
              x1="60"
              y1="52"
              x2="40"
              y2="20"
              stroke="#0c0c0c"
              strokeWidth="2.5"
            />
            <circle cx="40" cy="20" r="6" stroke="#0c0c0c" strokeWidth="2" />
            <line
              x1="90"
              y1="100"
              x2="120"
              y2="70"
              stroke="#0c0c0c"
              strokeWidth="2.5"
            />
            <circle cx="120" cy="70" r="8" stroke="#0c0c0c" strokeWidth="2" />
            <line
              x1="120"
              y1="62"
              x2="145"
              y2="30"
              stroke="#0c0c0c"
              strokeWidth="2.5"
            />
            <circle cx="145" cy="30" r="6" stroke="#0c0c0c" strokeWidth="2" />
          </svg>
          {/* Coordinate axes */}
          <svg
            style={{
              position: "absolute",
              top: "45%",
              left: "28%",
              width: 90,
              height: 90,
              opacity: 0.04,
            }}
            viewBox="0 0 100 100"
            fill="none"
          >
            <line
              x1="50"
              y1="90"
              x2="50"
              y2="10"
              stroke="#0c0c0c"
              strokeWidth="1.5"
            />
            <line
              x1="10"
              y1="50"
              x2="90"
              y2="50"
              stroke="#0c0c0c"
              strokeWidth="1.5"
            />
            <polygon points="50,6 46,14 54,14" fill="#0c0c0c" />
            <polygon points="94,50 86,46 86,54" fill="#0c0c0c" />
          </svg>
          {/* Point cloud scatter */}
          <svg
            style={{
              position: "absolute",
              top: 80,
              left: "36%",
              width: 160,
              height: 120,
              opacity: 0.038,
            }}
            viewBox="0 0 160 120"
            fill="none"
          >
            {(
              [
                [20, 30],
                [45, 18],
                [70, 55],
                [95, 22],
                [120, 70],
                [40, 80],
                [80, 95],
                [130, 45],
                [155, 15],
                [10, 95],
                [60, 40],
                [110, 85],
              ] as [number, number][]
            ).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#0c0c0c" />
            ))}
            <line
              x1="10"
              y1="100"
              x2="155"
              y2="10"
              stroke="#0c0c0c"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          </svg>
          {/* Sine wave */}
          <svg
            style={{
              position: "absolute",
              bottom: 50,
              left: "20%",
              width: 300,
              height: 60,
              opacity: 0.035,
            }}
            viewBox="0 0 300 60"
            fill="none"
          >
            <path
              d="M0,30 C25,5 50,55 75,30 S125,5 150,30 S200,55 225,30 S275,5 300,30"
              stroke="#0c0c0c"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
          {/* Corner brackets */}
          <svg
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              width: 48,
              height: 48,
              opacity: 0.06,
            }}
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M48,0 L48,48 L0,48"
              stroke="#0c0c0c"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <svg
            style={{
              position: "absolute",
              top: 74,
              left: 24,
              width: 48,
              height: 48,
              opacity: 0.06,
            }}
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M0,48 L0,0 L48,0"
              stroke="#0c0c0c"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div
          className="v-hero-left"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="kicker" data-fade style={{ transitionDelay: "0.05s" }}>
            <span className="live-dot" />
            CS Student · Robotics · Software Eng
          </div>

          <h1 className="v-name" data-fade style={{ transitionDelay: "0.15s" }}>
            <span className="v-name-first">Nidhin</span>
            <span className="v-name-last">Gangisetty</span>
          </h1>

          <p className="v-intro" data-fade style={{ transitionDelay: "0.25s" }}>
            Hi! I&apos;m an <strong>Honors College</strong> student studying{" "}
            <strong>Computer Science</strong>,{" "}
            <strong>Robotics and Autonomous Systems</strong>, and{" "}
            <strong>Entrepreneurship</strong> at <strong>UMD</strong>.
          </p>

          <div className="v-vision-block" data-fade style={{ transitionDelay: "0.35s" }}>
            <div className="dash-label">Career Vision</div>
            <p className="v-vision-headline">
              Building the Intelligent Physical World
            </p>
            <p className="v-vision-body">
              I aim to work at the intersection of{" "}
              <strong>hardware and software</strong> and use my passion for{" "}
              <strong>robotics </strong> and <strong>autonomous systems</strong>{" "}
              to work towards the change I want to see in the world. With the
              rapid progress being made in this field, I&apos;ve become
              extremely motivated to become <strong>technically adept</strong>{" "}
              and <strong>intellectually prepared</strong> to pioneer such
              ambitious and innovative efforts!
            </p>
            <div className="vision-domains-label">Some domains that currently interest me:</div>
            <div className="v-chips">
              {[
                "Topsoil Degradation",
                "Med-Tech",
                "Marine Robotics",
                "Space",
                "Defense",
              ].map((f) => (
                <span key={f} className="vision-chip">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div data-fade style={{ transitionDelay: "0.45s" }}>
            <div className="dash-label" style={{ marginBottom: 8 }}>
              Core Stack
            </div>
            <div className="v-stack-row" style={{ display: "flex", flexWrap: "nowrap", gap: 4, overflow: "hidden" }}>
              {[
                "Python",
                "ROS 2",
                "C++",
                "PyTorch",
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "AWS",
              ].map((s, i) => (
                <span key={s} className={`stag${i < 3 ? " stag-on" : ""}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div
          className="v-hero-right"
          data-fade
          style={{ position: "relative", zIndex: 1, transitionDelay: "0.2s" }}
        >
          <img
            src="/headshot.jpg"
            alt="Nidhin Gangisetty"
            className="v-headshot"
          />
          <div className="v-hero-under-headshot">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-brut btn-fill">
              View Resume
            </a>
            <div className="contact-links">
              <a href="https://github.com/nidhingangisetty" target="_blank" rel="noreferrer" className="contact-link" aria-label="GitHub">
                <GithubIcon size={15} />
              </a>
              <a href="https://linkedin.com/in/nidhingangisetty" target="_blank" rel="noreferrer" className="contact-link" aria-label="LinkedIn">
                <Linkedin size={15} />
              </a>
              <a href="mailto:nidhin@umd.edu" className="contact-link" aria-label="Email">
                <Mail size={15} />
              </a>
            </div>
          </div>
          <p className="v-reach-out">Feel free to reach out, happy to chat!</p>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="v-section" id="experience">
        <div className="v-section-head" data-fade>
          <span className="sh-title">Experience</span>
        </div>
        {experience.map((e, i) => (
          <div key={i} className="v-exp-row" data-fade style={{ transitionDelay: `${i * 0.08}s` }}>
            <div className="v-exp-meta">
              <div className="v-exp-org">{e.org}</div>
              <div className="v-exp-role">{e.role}</div>
              <div className="v-exp-date">
                {e.startDate} – {e.endDate}
              </div>
              <div className="v-exp-loc">{e.location}</div>
              <div className="v-exp-etags">
                {e.tags.map((t) => (
                  <span key={t} className="etag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="v-exp-content">
              {e.bullets.map((b, j) => (
                <div key={j} className="v-bullet">
                  {bold(b)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── PROJECTS ── */}
      <section className="v-section" id="projects">
        <div className="v-section-head">
          <span className="sh-title">Projects</span>
        </div>
        <div className="v-roadmap-body">
          <div className="roadmap-wrap">
            <div className="roadmap-track" />
            <div className="roadmap-nodes">
              {projects.map((p, i) => {
                const isFeatured = !!p.featured;
                const typeLabel =
                  p.status === "in-progress"
                    ? "In Progress"
                    : isFeatured
                      ? "Featured"
                      : "Build";
                return (
                  <div
                    key={p.id}
                    className={`roadmap-node${isFeatured ? " rn-featured" : ""}`}
                    data-fade
                    style={{ transitionDelay: `${i * 0.07}s` }}
                  >
                    <div className="node-dot-wrap">
                      <span className="node-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="node-card">
                      <div className="nc-type">{typeLabel}</div>
                      <div className="nc-title">
                        {p.title.split("—")[0].split("·")[0].trim()}
                      </div>
                      <div className="nc-desc">{bold(p.description)}</div>
                      <div className="nc-tags">
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className="nc-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                      {(p.demo || p.github) && (
                        <a
                          href={p.demo ?? p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="nc-link"
                        >
                          {p.demo?.endsWith(".mov")
                            ? "Video ↗"
                            : p.demo
                              ? "Live ↗"
                              : "GitHub →"}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className="v-section v-section-last" id="activities">
        <div className="v-section-head">
          <span className="sh-title">Activities</span>
        </div>
        <div className="v-act-grid">
          {activities
            .filter(
              (a) =>
                a.title !== "RAAS Lab — UMD" &&
                a.title !== "University of Maryland — Honors College",
            )
            .map((a, i) => (
              <div key={i} className="v-act-card" data-fade style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="v-act-inner">
                  <div className="v-act-text">
                    {a.link ? (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        className="da-title da-title-link"
                      >
                        {a.title} <span className="da-link-arrow">↗</span>
                      </a>
                    ) : (
                      <div className="da-title">{a.title}</div>
                    )}
                    {a.description && (
                      <div className="da-tagline">{a.description}</div>
                    )}
                    <div className="da-role">{a.role}</div>
                    <div className="da-date">{a.date}</div>
                    {a.highlights?.[0] && (
                      <div className="da-desc">{bold(a.highlights[0])}</div>
                    )}
                  </div>
                  {a.logo && (
                    <img src={a.logo} alt={a.title} className="v-act-logo" />
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
