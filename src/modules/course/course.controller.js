let courses = [];

exports.createCourse = (req, res) => {
  const { title, description, price, category } = req.body;
  if (!title || !price || !category) {
    return res.status(400).json({ success: false, message: 'Title, price, and category are required' });
  }
  const newCourse = { id: String(Date.now()), title, description, price, category };
  courses.push(newCourse);
  res.status(201).json({ success: true, message: 'Course created successfully', data: newCourse });
};

exports.getAllCourses = (req, res) => {
  res.status(200).json({ success: true, count: courses.length, data: courses });
};

exports.getCourseById = (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  res.status(200).json({ success: true, data: course });
};

exports.updateCourse = (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  Object.assign(course, req.body);
  res.status(200).json({ success: true, data: course });
};

exports.deleteCourse = (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Course not found' });
  courses.splice(idx, 1);
  res.status(200).json({ success: true, message: 'Course deleted' });
};
