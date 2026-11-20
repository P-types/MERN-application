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
  const [dbStatus, setDbStatus] = useState('unknown');
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
    if (health.status === 'online') {
      setBackendStatus('online');
      setDbStatus(health.database || 'connected');
    } else {
      setBackendStatus('offline');
      setDbStatus('disconnected');
    }
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
      showToast('Could not reach backend server or MongoDB database.', 'error');
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
    showToast(`Task "${newItem.title}" saved to MongoDB!`);
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
      showToast('Task updated in MongoDB!');
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
      showToast('Task deleted from MongoDB', 'info');
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
      <Header backendStatus={backendStatus} dbStatus={dbStatus} />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Analytics & Health Banner */}
        <StatusBanner
          total={totalCount}
          completed={completedCount}
          active={activeCount}
          backendStatus={backendStatus}
          onRefresh={() => {
            checkServerStatus();
            fetchItems();
          }}
        />

        {/* Two-Column Responsive Layout */}
        <div className="content-layout">
          {/* Left Column: Form */}
          <section className="column-left">
            <ItemForm onAddItem={handleAddItem} />

            <div className="card info-box">
              <h3>🍃 MongoDB MERN Stack</h3>
              <p>
                Full-stack persistence with real database integration:
              </p>
              <ul>
                <li><strong>Database:</strong> MongoDB via Mongoose schemas & indexes</li>
                <li><strong>Backend:</strong> Node.js + Express.js REST API</li>
                <li><strong>Frontend:</strong> React 19 + Vite with reactive state</li>
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
        <p>Full MERN Web Application • MongoDB + Express + React + Node.js</p>
      </footer>
    </div>
  );
}
