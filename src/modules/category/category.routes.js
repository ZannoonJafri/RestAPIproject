const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const protect = require('../../middlewares/auth.middleware');

router.post('/', protect, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', protect, categoryController.updateCategory);
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router;
