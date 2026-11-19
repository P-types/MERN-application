import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../data/store.js';

const router = express.Router();

// GET all items (supports ?search=, ?category=, ?status=)
router.get('/', (req, res) => {
  try {
    const { search, category, status } = req.query;
    const items = getItems(search, category, status);
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single item by ID
router.get('/:id', (req, res) => {
  try {
    const item = getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create item
router.post('/', (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const newItem = createItem({ title, description, category, priority });
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update item
router.put('/:id', (req, res) => {
  try {
    const updated = updateItem(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE item
router.delete('/:id', (req, res) => {
  try {
    const deleted = deleteItem(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
