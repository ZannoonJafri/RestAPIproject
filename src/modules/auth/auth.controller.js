const jwt = require('jsonwebtoken');
const users = [];

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
  }
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  const newUser = { id: String(Date.now()), name, email, password };
  users.push(newUser);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    data: { id: user.id, name: user.name, email: user.email }
  });
};
