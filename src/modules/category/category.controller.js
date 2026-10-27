let categories = [
  { id: '1', name: 'Web Development', description: 'Full stack courses' }
];

exports.createCategory = (req, res) => {
  const { name, description } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'Validation Error: Category name is required' });
  }
  const newCat = { id: String(Date.now()), name, description: description || '' };
  categories.push(newCat);
  res.status(201).json({ success: true, message: 'Category created successfully', data: newCat });
};

exports.getAllCategories = (req, res) => {
  res.status(200).json({ success: true, count: categories.length, data: categories });
};

exports.getCategoryById = (req, res) => {
  const cat = categories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
  res.status(200).json({ success: true, data: cat });
};

exports.updateCategory = (req, res) => {
  const cat = categories.find(c => c.id === req.params.id);
  if (!cat) return res.status(404).json({ success: false, message: 'Category not found' });
  cat.name = req.body.name || cat.name;
  cat.description = req.body.description || cat.description;
  res.status(200).json({ success: true, data: cat });
};

exports.deleteCategory = (req, res) => {
  const idx = categories.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Category not found' });
  categories.splice(idx, 1);
  res.status(200).json({ success: true, message: 'Category deleted' });
};
