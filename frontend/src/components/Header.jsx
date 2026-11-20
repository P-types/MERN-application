import React from 'react';

export default function Header({ backendStatus, dbStatus }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-group">
          <div className="brand-icon">⚡</div>
          <div>
            <h1 className="brand-title">TaskFlow MERN</h1>
            <p className="brand-subtitle">
              Full-Stack MERN Web Application • MongoDB + Express + React + Node.js
            </p>
          </div>
        </div>

        <div className="header-badges">
          <span className="tech-tag react-tag">⚛️ React 19</span>
          <span className="tech-tag node-tag">🟢 Node.js</span>
          <span className="tech-tag express-tag">🚂 Express</span>
          <span className="tech-tag mongo-tag">🍃 MongoDB</span>
          <span className={`status-pill ${backendStatus === 'online' ? 'status-online' : 'status-offline'}`}>
            <span className="status-dot"></span>
            {backendStatus === 'online' ? 'API Online' : 'API Offline'}
          </span>
          {backendStatus === 'online' && (
            <span className={`status-pill ${dbStatus === 'connected' ? 'status-online' : 'status-offline'}`}>
              <span className="status-dot"></span>
              {dbStatus === 'connected' ? 'MongoDB Connected' : 'MongoDB Disconnected'}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
