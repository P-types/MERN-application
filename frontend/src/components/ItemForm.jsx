import React, { useState } from 'react';

const CATEGORIES = ['General', 'Development', 'Frontend', 'Backend', 'Design', 'Research'];
const PRIORITIES = ['Low', 'Medium', 'High'];

export default function ItemForm({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [priority, setPriority] = useState('Medium');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a task title.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onAddItem({
        title: title.trim(),
        description: description.trim(),
        category,
        priority
      });
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('Development');
      setPriority('Medium');
    } catch (err) {
      setError(err.message || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card form-card">
      <div className="card-header">
        <h2 className="card-title">✨ Create New Task</h2>
        <span className="card-subtitle">Saved instantly in backend in-memory store</span>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Title <span className="required-star">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            className="form-input"
            placeholder="e.g. Implement user authentication endpoints"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group flex-1">
            <label htmlFor="task-category" className="form-label">Category</label>
            <select
              id="task-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={submitting}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group flex-1">
            <label htmlFor="task-priority" className="form-label">Priority</label>
            <select
              id="task-priority"
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={submitting}
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="task-desc" className="form-label">Description (Optional)</label>
          <textarea
            id="task-desc"
            rows="3"
            className="form-textarea"
            placeholder="Add relevant notes, requirements, or links..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={submitting}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : '➕ Add Task'}
        </button>
      </form>
    </div>
  );
}
