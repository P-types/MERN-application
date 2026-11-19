const API_BASE = '/api';

export const api = {
  // Check backend health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend health check failed:', err.message);
      return { status: 'offline', error: err.message };
    }
  },

  // Get all items with optional search & filters
  async getItems({ search = '', category = 'all', status = 'all' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category && category !== 'all') params.append('category', category);
    if (status && status !== 'all') params.append('status', status);

    const res = await fetch(`${API_BASE}/items?${params.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch items');
    return data.data;
  },

  // Create new item
  async createItem(itemData) {
    const res = await fetch(`${API_BASE}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create item');
    return data.data;
  },

  // Update an existing item
  async updateItem(id, updates) {
    const res = await fetch(`${API_BASE}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update item');
    return data.data;
  },

  // Delete an item
  async deleteItem(id) {
    const res = await fetch(`${API_BASE}/items/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete item');
    return true;
  },
};
