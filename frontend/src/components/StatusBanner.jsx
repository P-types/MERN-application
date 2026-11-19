import React from 'react';

export default function StatusBanner({ total, completed, active, backendStatus, onRefresh }) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="status-banner">
      <div className="stat-card">
        <span className="stat-label">Total Tasks</span>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Active</span>
        <span className="stat-value text-blue">{active}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Completed</span>
        <span className="stat-value text-green">{completed}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Completion Rate</span>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${completionRate}%` }}></div>
        </div>
        <span className="stat-subtext">{completionRate}% finished</span>
      </div>

      <div className="stat-actions">
        <button className="btn-refresh" onClick={onRefresh} title="Sync with backend">
          🔄 Refresh
        </button>
      </div>
    </div>
  );
}
