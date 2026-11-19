import React from 'react';

export default function Header({ backendStatus }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-group">
          <div className="brand-icon">⚡</div>
          <div>
            <h1 className="brand-title">TaskFlow MERN</h1>
            <p className="brand-subtitle">
              Full-Stack Web Application (Express + Node + React) • No Database Required
            </p>
          </div>
        </div>

        <div className="header-badges">
          <span className="tech-tag react-tag">⚛️ React 19</span>
          <span className="tech-tag node-tag">🟢 Node.js</span>
          <span className="tech-tag express-tag">🚂 Express</span>
          <span className="tech-tag memory-tag">💾 In-Memory</span>
          <span className={`status-pill ${backendStatus === 'online' ? 'status-online' : 'status-offline'}`}>
            <span className="status-dot"></span>
            {backendStatus === 'online' ? 'Backend Connected' : 'Connecting...'}
          </span>
        </div>
      </div>
    </header>
  );
}
