const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific category by ID with associated products
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, { include: Product });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update a category by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.update({ category_name });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a category by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.destroy();
    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
