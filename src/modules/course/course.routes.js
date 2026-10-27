const express = require('express');
const router = express.Router();
const courseController = require('./course.controller');
const protect = require('../../middlewares/auth.middleware');

router.post('/', protect, courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', protect, courseController.updateCourse);
router.delete('/:id', protect, courseController.deleteCourse);

module.exports = router;
