import React, { useState } from 'react';

const CATEGORY_COLORS = {
  Development: '#3b82f6',
  Frontend: '#06b6d4',
  Backend: '#8b5cf6',
  Design: '#ec4899',
  Research: '#f59e0b',
  General: '#6b7280'
};

const PRIORITY_BADGES = {
  High: 'badge-high',
  Medium: 'badge-medium',
  Low: 'badge-low'
};

export default function ItemCard({ item, onToggleComplete, onUpdateItem, onDeleteItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);
  const [editDesc, setEditDesc] = useState(item.description || '');
  const [editPriority, setEditPriority] = useState(item.priority || 'Medium');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    try {
      setIsSaving(true);
      await onUpdateItem(item.id, {
        title: editTitle.trim(),
        description: editDesc.trim(),
        priority: editPriority
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(item.title);
    setEditDesc(item.description || '');
    setEditPriority(item.priority || 'Medium');
    setIsEditing(false);
  };

  const formattedDate = new Date(item.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`item-card ${item.completed ? 'item-completed' : ''}`}>
      {isEditing ? (
        <div className="card-edit-mode">
          <input
            type="text"
            className="form-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isSaving}
          />
          <textarea
            className="form-textarea mt-2"
            rows="2"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            disabled={isSaving}
          />
          <div className="edit-controls-row">
            <select
              className="form-select select-compact"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              disabled={isSaving}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="btn-group">
              <button
                className="btn-success-sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                className="btn-ghost-sm"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card-top-row">
            <div className="card-checkbox-group">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggleComplete(item.id, !item.completed)}
                />
                <span className="checkmark"></span>
              </label>
              <h3 className={`item-title ${item.completed ? 'title-done' : ''}`}>
                {item.title}
              </h3>
            </div>

            <div className="card-actions">
              <button
                className="btn-icon"
                title="Edit task"
                onClick={() => setIsEditing(true)}
              >
                ✏️
              </button>
              <button
                className="btn-icon btn-delete"
                title="Delete task"
                onClick={() => onDeleteItem(item.id)}
              >
                🗑️
              </button>
            </div>
          </div>

          {item.description && (
            <p className="item-description">{item.description}</p>
          )}

          <div className="card-meta">
            <span
              className="meta-category"
              style={{ borderColor: CATEGORY_COLORS[item.category] || '#6b7280' }}
            >
              📁 {item.category}
            </span>

            <span className={`meta-priority ${PRIORITY_BADGES[item.priority] || 'badge-medium'}`}>
              ● {item.priority}
            </span>

            <span className="meta-time">🕒 {formattedDate}</span>
          </div>
        </>
      )}
    </div>
  );
}
