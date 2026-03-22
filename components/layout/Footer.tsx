'use client'

import { useState } from 'react'

export function Footer() {
  const [easter, setEaster] = useState(false)

  return (
    <footer className="border-t-rule" style={{ position: 'relative' }}>
      <div className="footer-root">
        <div style={{ display: 'flex', gap: 0 }}>
          <a
            href="https://github.com/ngangi0195"
            target="_blank"
            rel="noreferrer"
            className="foot-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nidhingangisetty"
            target="_blank"
            rel="noreferrer"
            className="foot-link"
          >
            LinkedIn
          </a>
          <a href="mailto:nidhin@umd.edu" className="foot-link">
            Email
          </a>
        </div>

        <span
          className="foot-copy"
          style={{ cursor: 'default' }}
          onClick={() => setEaster((v) => !v)}
          title="psst..."
        >
          © {new Date().getFullYear()} Nidhin Gangisetty — Built with Next.js &amp; Tailwind
        </span>
      </div>

      {easter && (
        <div className="easter-terminal">
          <div className="et-bar">
            <span className="et-dot" style={{ background: '#ff5f56' }} />
            <span className="et-dot" style={{ background: '#ffbd2e' }} />
            <span className="et-dot" style={{ background: '#27c93f' }} />
            <span style={{ marginLeft: 6, fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: '#555' }}>
              terminal — zsh
            </span>
          </div>
          <pre className="et-body">{`  NG // nidhin@umd.edu
  [SYS] Unit online. Ready to build.
  [LOG] ROS 2 · Python · Next.js · PyTorch
  [CMD] git commit -m "ship it"`}</pre>
          <div style={{
            padding: '0 16px 12px',
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 11,
            color: '#22c55e',
            display: 'flex',
            gap: 4,
          }}>
            <span style={{ color: '#4fc3f7' }}>~</span>
            <span style={{ color: '#ce93d8' }}> $ </span>
            <span className="animate-blink">_</span>
          </div>
        </div>
      )}
    </footer>
  )
}
