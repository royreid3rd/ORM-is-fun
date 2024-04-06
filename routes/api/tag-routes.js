const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with associated product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific tag by ID with associated product data
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id, { include: Product });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  const { tag_name } = req.body;
  try {
    const newTag = await Tag.create({ tag_name });
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update a tag's name by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tag_name } = req.body;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.update({ tag_name });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a tag by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    await tag.destroy();
    res.sendStatus(204); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
