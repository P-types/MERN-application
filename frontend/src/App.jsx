import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatusBanner from './components/StatusBanner';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { api } from './services/api';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [toast, setToast] = useState(null);

  // Show auto-dismissing toast notifications
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Check health and ping server
  const checkServerStatus = async () => {
    const health = await api.checkHealth();
    setBackendStatus(health.status === 'online' ? 'online' : 'offline');
  };

  // Fetch items from backend
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getItems({
        search,
        category: categoryFilter,
        status: statusFilter
      });
      setItems(data);
      setBackendStatus('online');
    } catch (err) {
      console.error(err);
      setBackendStatus('offline');
      showToast('Could not reach backend server. Make sure it is running on port 5000.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, categoryFilter, statusFilter]);

  // Initial load
  useEffect(() => {
    checkServerStatus();
    fetchItems();
  }, [fetchItems]);

  // Add Item
  const handleAddItem = async (itemData) => {
    const newItem = await api.createItem(itemData);
    setItems((prev) => [newItem, ...prev]);
    showToast(`Task "${newItem.title}" created successfully!`);
  };

  // Toggle Complete
  const handleToggleComplete = async (id, completed) => {
    try {
      const updated = await api.updateItem(id, { completed });
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      showToast(completed ? 'Marked task completed! 🎉' : 'Task marked active');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Update Item details
  const handleUpdateItem = async (id, updates) => {
    try {
      const updated = await api.updateItem(id, updates);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      showToast('Task updated successfully!');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Delete Item
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      showToast('Task removed from in-memory store', 'info');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Calculate statistics
  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Top Header */}
      <Header backendStatus={backendStatus} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Analytics & Health Banner */}
        <StatusBanner
          total={totalCount}
          completed={completedCount}
          active={activeCount}
          backendStatus={backendStatus}
          onRefresh={fetchItems}
        />

        {/* Two-Column Responsive Layout */}
        <div className="content-layout">
          {/* Left Column: Form */}
          <section className="column-left">
            <ItemForm onAddItem={handleAddItem} />

            <div className="card info-box">
              <h3>💡 Architecture Note</h3>
              <p>
                This application follows the <strong>MERN</strong> pattern:
              </p>
              <ul>
                <li><strong>Frontend:</strong> React 19 + Vite with modern component architecture</li>
                <li><strong>Backend:</strong> Node.js + Express.js REST API</li>
                <li><strong>Storage:</strong> Fast In-Memory data store (no database installation or configuration required)</li>
              </ul>
            </div>
          </section>

          {/* Right Column: Item Management & Filterable List */}
          <section className="column-right">
            <ItemList
              items={items}
              loading={loading}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              onToggleComplete={handleToggleComplete}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Simple MERN Web Application • Express + Node API & React Frontend</p>
      </footer>
    </div>
  );
}
