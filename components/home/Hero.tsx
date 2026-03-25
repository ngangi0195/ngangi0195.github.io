"use client";

import { Github as GithubIcon, Linkedin, Mail } from "lucide-react";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { activities } from "@/data/activities";

function bold(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((p, i) => (i % 2 === 1 ? <strong key={i}>{p}</strong> : p));
}

const SHORT_ORGS: Record<string, string> = {
  "Robotics Algorithms & Autonomous Systems Lab (RAAS)": "RAAS Lab",
  "Xprotege Institute of Technology and Management": "Xprotege",
  "Craving Hour Halal": "Craving Hour",
};

export function Hero() {
  return (
    <section className="dash-root" id="hero">
      {/* ── LEFT: full identity + vision + stack ── */}
      <div className="dash-col-l">
        <div className="kicker">
          <span className="live-dot" />
          CS Student · Robotics · Software Eng
        </div>

        <div className="hero-name-row">
          <h1 className="hero-name">
            <span className="first">Nidhin</span>
            <span className="last">Gangisetty</span>
          </h1>
          <div className="hero-photo">
            <img src="/headshot.jpg" alt="Nidhin Gangisetty" />
            <span className="hero-photo-initials">NG</span>
          </div>
        </div>

        <p className="hero-intro">
          Hi! I&apos;m an <strong>Honors College</strong> student studying{" "}
          <strong>Computer Science</strong>,{" "}
          <strong>Robotics and Autonomous Systems</strong>, and{" "}
          <strong>Entrepreneurship</strong> at <strong>UMD</strong>.
        </p>

        <div className="dash-label">Career Vision</div>

        <p className="vision-headline">
          Building the Intelligent Physical World
        </p>

        <p className="vision-body">
          I aim to work at the intersection of{" "}
          <strong>hardware and software</strong> and use my passion for{" "}
          <strong>robotics</strong> to work towards the change I want to see in
          the world. With the rapid progress being made in this field, I&apos;ve
          become extremely motivated to become{" "}
          <strong>technically adept</strong> and{" "}
          <strong>intellectually prepared</strong> to pioneer such ambitious and
          innovative efforts!
          <br />
          <span className="vision-domains-label">
            Some domains that currently interest me:
          </span>
        </p>

        <div className="vision-focus-chips">
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

        <div className="dash-label">Core Stack</div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
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

        <div style={{ flex: 1 }} />

        <div className="hero-cta-row">
          <a href="/resume.pdf" download className="btn-brut btn-fill">
            Download Resume
          </a>
          <div className="contact-links">
            <a
              href="https://github.com/nidhingangisetty"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              aria-label="GitHub"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href="https://linkedin.com/in/nidhingangisetty"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="mailto:nidhin@umd.edu"
              className="contact-link"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <span className="contact-blurb">
              Feel free to reach out, happy to chat!
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Experience, Projects, Activities stacked ── */}
      <div className="dash-col-r">
        {/* Experience */}
        <div className="dash-panel">
          <div className="dash-section-head">
            <div className="sh-left">
              <span className="sh-num">01</span>
              <span className="sh-title">Experience</span>
            </div>
            <span className="sh-right">{experience.length} roles</span>
          </div>
          <div className="dash-panel-body">
            {experience.map((e, i) => (
              <div key={i} className="de-row">
                <div className="de-head">
                  <span className="de-org">{SHORT_ORGS[e.org] ?? e.org}</span>
                  <span className="de-date">
                    {e.startDate} – {e.endDate}
                  </span>
                </div>
                <div className="de-role">{e.role}</div>
                <div className="de-bullet">{bold(e.bullets[0])}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects — roadmap timeline */}
        <div className="dash-panel">
          <div className="dash-section-head">
            <div className="sh-left">
              <span className="sh-num">02</span>
              <span className="sh-title">Projects</span>
            </div>
            <span className="sh-right">{projects.length} builds</span>
          </div>
          <div className="roadmap-body">
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
        </div>

        {/* Activities */}
        <div className="dash-panel dash-panel-last">
          <div className="dash-section-head">
            <div className="sh-left">
              <span className="sh-num">03</span>
              <span className="sh-title">Activities</span>
            </div>
            <span className="sh-right">
              {
                activities.filter(
                  (a) =>
                    a.title !== "RAAS Lab — UMD" &&
                    a.title !== "University of Maryland — Honors College",
                ).length
              }{" "}
              entries
            </span>
          </div>
          <div className="dash-panel-body">
            <div className="da-grid">
              {activities
                .filter(
                  (a) =>
                    a.title !== "RAAS Lab — UMD" &&
                    a.title !== "University of Maryland — Honors College",
                )
                .map((a, i) => (
                  <div key={i} className="da-row">
                    <div className="da-row-inner">
                      <div className="da-row-text">
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
                          <div className="da-desc">{a.highlights[0]}</div>
                        )}
                      </div>
                      {a.logo && (
                        <img src={a.logo} alt={a.title} className="da-logo" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
