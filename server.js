require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const { notFoundHandler, errorHandler } = require('./src/middlewares/error.middleware');

const authRoutes = require('./src/modules/auth/auth.routes');
const categoryRoutes = require('./src/modules/category/category.routes');
const courseRoutes = require('./src/modules/course/course.routes');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
