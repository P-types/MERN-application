import express from 'express';
import Item from '../models/Item.js';
import { isDBConnected } from '../config/db.js';

const router = express.Router();

// Middleware to check database connection
const checkDB = (req, res, next) => {
  if (!isDBConnected()) {
    return res.status(503).json({
      success: false,
      error: 'MongoDB is currently disconnected. Please make sure MongoDB service is running.'
    });
  }
  next();
};

// GET all items (supports ?search=, ?category=, ?status=)
router.get('/', checkDB, async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const query = {};

    // Search query across title or description
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }

    // Category filter
    if (category && category.toLowerCase() !== 'all') {
      query.category = category;
    }

    // Status filter
    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'active') {
      query.completed = false;
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

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
router.get('/:id', checkDB, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create item
router.post('/', checkDB, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const newItem = await Item.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category ? category.trim() : 'General',
      priority: priority || 'Medium',
      completed: false
    });

    res.status(201).json({
      success: true,
      message: 'Item created and saved to MongoDB successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update item
router.put('/:id', checkDB, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.json({
      success: true,
      message: 'Item updated in MongoDB successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE item
router.delete('/:id', checkDB, async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.json({
      success: true,
      message: 'Item deleted from MongoDB successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
