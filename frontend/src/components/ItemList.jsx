import React from 'react';
import ItemCard from './ItemCard';

export default function ItemList({
  items,
  loading,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  onToggleComplete,
  onUpdateItem,
  onDeleteItem
}) {
  const categories = ['all', 'General', 'Development', 'Frontend', 'Backend', 'Design', 'Research'];

  return (
    <div className="card list-card">
      <div className="filter-toolbar">
        {/* Search */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Status Filters */}
        <div className="status-tabs">
          <button
            className={`tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`tab-btn ${statusFilter === 'active' ? 'active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            Active
          </button>
          <button
            className={`tab-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Category dropdown */}
        <div className="category-filter">
          <select
            className="form-select select-compact"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Item List content */}
      <div className="items-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching from backend API...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <span className="empty-emoji">📭</span>
            <h3>No tasks found</h3>
            <p>
              {search || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your filters or search keywords.'
                : 'Create your first task using the form on the left!'}
            </p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggleComplete={onToggleComplete}
                onUpdateItem={onUpdateItem}
                onDeleteItem={onDeleteItem}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
